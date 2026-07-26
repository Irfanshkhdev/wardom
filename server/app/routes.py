import logging
import os
from typing import Optional

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from . import models, schemas
from .auth import create_access_token, decode_access_token, hash_password, verify_password
from .database import get_db

router = APIRouter()
logger = logging.getLogger("wardom")
security = HTTPBearer(auto_error=False)

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
CONTACT_TO_EMAIL = os.getenv("CONTACT_TO_EMAIL", "hello@wardom.studio")


def get_current_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db),
):
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing credentials")

    try:
        payload = decode_access_token(credentials.credentials)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token") from exc

    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    admin = db.query(models.AdminUser).filter_by(email=email, is_active=True).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin not found")

    return admin


def send_contact_email(submission: models.ContactSubmission):
    """Send a notification email via Resend. Fails silently (logged) so the
    contact submission is never lost even if email delivery has an issue."""
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — skipping email send.")
        return

    try:
        import resend

        resend.api_key = RESEND_API_KEY
        resend.Emails.send(
            {
                "from": "WARDOM Studio <notifications@wardom.studio>",
                "to": [CONTACT_TO_EMAIL],
                "subject": f"New inquiry from {submission.name}",
                "html": (
                    f"<p><strong>Name:</strong> {submission.name}</p>"
                    f"<p><strong>Email:</strong> {submission.email}</p>"
                    f"<p><strong>Budget:</strong> {submission.budget or 'Not specified'}</p>"
                    f"<p><strong>Message:</strong> {submission.message}</p>"
                ),
            }
        )
    except Exception as exc:  # noqa: BLE001
        logger.error("Failed to send contact email: %s", exc)


@router.post("/contact", response_model=schemas.ContactOut, status_code=status.HTTP_201_CREATED)
def create_contact(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    submission = models.ContactSubmission(
        name=payload.name,
        email=str(payload.email),
        budget=payload.budget,
        message=payload.message,
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)

    send_contact_email(submission)

    return submission


@router.get("/contact", response_model=list[schemas.ContactOut])
def list_contacts(db: Session = Depends(get_db)):
    return db.query(models.ContactSubmission).order_by(models.ContactSubmission.created_at.desc()).all()


@router.get("/admin/me", response_model=schemas.AdminUserOut)
def admin_me(current_admin: models.AdminUser = Depends(get_current_admin)):
    return current_admin


@router.get("/admin/contacts", response_model=list[schemas.ContactOut])
def list_admin_contacts(
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    return db.query(models.ContactSubmission).order_by(models.ContactSubmission.created_at.desc()).all()


@router.get("/admin/contact-submissions", response_model=list[schemas.ContactOut], include_in_schema=False)
def list_admin_contact_submissions(
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    return db.query(models.ContactSubmission).order_by(models.ContactSubmission.created_at.desc()).all()


@router.get("/admin/projects", response_model=list[schemas.ProjectOut])
def list_admin_projects(
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    return db.query(models.Project).order_by(models.Project.order).all()


@router.get("/admin/testimonials", response_model=list[schemas.TestimonialOut])
def list_admin_testimonials(
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    return db.query(models.Testimonial).all()


@router.get("/admin/newsletter", response_model=list[schemas.NewsletterOut])
def list_admin_newsletter(
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    return db.query(models.NewsletterSubscriber).order_by(models.NewsletterSubscriber.created_at.desc()).all()


@router.post("/admin/projects", response_model=schemas.ProjectOut)
def create_admin_project(
    payload: schemas.ProjectCreate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    project = models.Project(
        name=payload.name,
        category=payload.category,
        year=payload.year,
        image_url=payload.image_url,
        live_url=payload.live_url,
        order=payload.order,
        featured=payload.featured,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.put("/admin/projects/{project_id}", response_model=schemas.ProjectOut)
def update_admin_project(
    project_id: int,
    payload: schemas.ProjectCreate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.name = payload.name
    project.category = payload.category
    project.year = payload.year
    project.image_url = payload.image_url
    project.live_url = payload.live_url
    project.order = payload.order
    project.featured = payload.featured

    db.commit()
    db.refresh(project)
    return project


@router.delete("/admin/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
    return None


@router.post("/admin/testimonials", response_model=schemas.TestimonialOut)
def create_admin_testimonial(
    payload: schemas.TestimonialCreate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    testimonial = models.Testimonial(
        quote=payload.quote,
        name=payload.name,
        role=payload.role,
        rating=payload.rating,
        video_url=payload.video_url,
    )
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.put("/admin/testimonials/{testimonial_id}", response_model=schemas.TestimonialOut)
def update_admin_testimonial(
    testimonial_id: int,
    payload: schemas.TestimonialCreate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    testimonial.quote = payload.quote
    testimonial.name = payload.name
    testimonial.role = payload.role
    testimonial.rating = payload.rating
    testimonial.video_url = payload.video_url

    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.delete("/admin/testimonials/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    db.delete(testimonial)
    db.commit()
    return None


@router.post("/admin/password")
def update_admin_password(
    payload: schemas.AdminPasswordUpdate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    if not verify_password(payload.current_password, current_admin.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    current_admin.hashed_password = hash_password(payload.new_password)
    db.commit()
    return {"message": "Password updated"}


@router.get("/admin/services", response_model=list[schemas.ServiceOut])
def list_admin_services(
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    return db.query(models.Service).order_by(models.Service.order).all()


@router.post("/admin/services", response_model=schemas.ServiceOut)
def create_admin_service(
    payload: schemas.ServiceCreate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    service = models.Service(
        title=payload.title,
        description=payload.description,
        icon=payload.icon,
        order=payload.order,
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@router.put("/admin/services/{service_id}", response_model=schemas.ServiceOut)
def update_admin_service(
    service_id: int,
    payload: schemas.ServiceCreate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    service.title = payload.title
    service.description = payload.description
    service.icon = payload.icon
    service.order = payload.order

    db.commit()
    db.refresh(service)
    return service


@router.delete("/admin/services/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    db.delete(service)
    db.commit()
    return None


@router.get("/admin/settings", response_model=schemas.SiteSettingsOut)
def get_admin_settings(
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    settings = db.query(models.SiteSettings).first()
    if not settings:
        settings = models.SiteSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@router.put("/admin/settings", response_model=schemas.SiteSettingsOut)
def update_admin_settings(
    payload: schemas.SiteSettingsUpdate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    settings = db.query(models.SiteSettings).first()
    if not settings:
        settings = models.SiteSettings()
        db.add(settings)

    settings.company_name = payload.company_name
    settings.company_email = payload.company_email
    settings.phone = payload.phone
    settings.location = payload.location
    settings.instagram_url = payload.instagram_url
    settings.linkedin_url = payload.linkedin_url
    settings.x_url = payload.x_url
    settings.seo_title = payload.seo_title
    settings.seo_description = payload.seo_description
    settings.og_title = payload.og_title
    settings.og_description = payload.og_description

    db.commit()
    db.refresh(settings)
    return settings


@router.post("/admin/messages/{message_id}/read")
def mark_message_read(
    message_id: int,
    payload: schemas.MessageReadUpdate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    message = db.query(models.ContactSubmission).filter(models.ContactSubmission.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    message.is_read = payload.is_read
    message.read_at = datetime.utcnow() if payload.is_read else None
    db.commit()
    return {"message": "Message updated"}


@router.delete("/admin/messages/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    message = db.query(models.ContactSubmission).filter(models.ContactSubmission.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    db.delete(message)
    db.commit()
    return None


@router.delete("/admin/newsletter/{subscriber_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_subscriber(
    subscriber_id: int,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    subscriber = db.query(models.NewsletterSubscriber).filter(models.NewsletterSubscriber.id == subscriber_id).first()
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")

    db.delete(subscriber)
    db.commit()
    return None


@router.get("/projects", response_model=list[schemas.ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).order_by(models.Project.order).all()


@router.get("/services", response_model=list[schemas.ServiceOut])
def list_services(db: Session = Depends(get_db)):
    return db.query(models.Service).order_by(models.Service.order).all()


@router.get("/testimonials", response_model=list[schemas.TestimonialOut])
def list_testimonials(db: Session = Depends(get_db)):
    return db.query(models.Testimonial).all()


@router.get("/settings", response_model=schemas.SiteSettingsOut)
def get_public_settings(db: Session = Depends(get_db)):
    settings = db.query(models.SiteSettings).first()
    if not settings:
        settings = models.SiteSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@router.post("/newsletter", status_code=status.HTTP_201_CREATED)
def subscribe_newsletter(payload: schemas.NewsletterCreate, db: Session = Depends(get_db)):
    existing = db.query(models.NewsletterSubscriber).filter_by(email=payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already subscribed")

    subscriber = models.NewsletterSubscriber(email=payload.email)
    db.add(subscriber)
    db.commit()
    return {"message": "Subscribed"}


@router.post("/admin/login", response_model=schemas.Token)
def admin_login(payload: schemas.AdminLogin, db: Session = Depends(get_db)):
    user = db.query(models.AdminUser).filter_by(email=payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    return {"access_token": token}
