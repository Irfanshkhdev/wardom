"""Run with: python seed.py
Populates the database with sample projects and testimonials so the
frontend has real data to display out of the box."""

from app.database import SessionLocal, engine, Base
from app import models

Base.metadata.create_all(bind=engine)

db = SessionLocal()

if db.query(models.Project).count() == 0:
    db.add_all(
        [
            models.Project(name="Nocturne Audio", category="E-commerce · Web app", year="2026", order=1),
            models.Project(name="Alto Capital", category="Fintech · Brand + Web", year="2025", order=2),
            models.Project(name="Verdant Skincare", category="DTC · Shopify", year="2025", order=3),
            models.Project(name="Halcyon Studio", category="Portfolio · Motion", year="2024", order=4),
        ]
    )

if db.query(models.Testimonial).count() == 0:
    db.add_all(
        [
            models.Testimonial(
                quote="WARDOM rebuilt our entire product from the ground up and it finally feels like the brand we always wanted to be.",
                name="Meera Kapoor",
                role="Founder, Nocturne Audio",
                rating=5,
            ),
            models.Testimonial(
                quote="They shipped faster than any agency we had worked with before, without cutting corners on design quality.",
                name="Aditya Rao",
                role="Head of Growth, Alto Capital",
                rating=5,
            ),
            models.Testimonial(
                quote="The attention to motion and detail on our site has directly increased how long people stay on the page.",
                name="Priya Sen",
                role="CEO, Verdant Skincare",
                rating=5,
            ),
        ]
    )

db.commit()
db.close()
print("Seed complete.")
