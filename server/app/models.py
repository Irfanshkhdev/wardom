from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text

from .database import Base


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(160), nullable=False)
    budget = Column(String(60), nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    read_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    category = Column(String(120), nullable=False)
    year = Column(String(10), nullable=False)
    image_url = Column(String(500), nullable=True)
    live_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)
    featured = Column(Boolean, default=False)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    quote = Column(Text, nullable=False)
    name = Column(String(120), nullable=False)
    role = Column(String(160), nullable=False)
    rating = Column(Integer, default=5)
    video_url = Column(String(500), nullable=True)


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(160), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(160), nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(80), nullable=True)
    order = Column(Integer, default=0)


class SiteSettings(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(160), default="WARDOM Studio")
    company_email = Column(String(200), default="hello@wardom.studio")
    phone = Column(String(80), nullable=True)
    location = Column(String(200), nullable=True)
    instagram_url = Column(String(500), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    x_url = Column(String(500), nullable=True)
    seo_title = Column(String(220), default="WARDOM Studio")
    seo_description = Column(Text, default="Premium digital experiences for brands that refuse to look ordinary.")
    og_title = Column(String(220), nullable=True)
    og_description = Column(Text, nullable=True)


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(160), unique=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    is_active = Column(Boolean, default=True)
