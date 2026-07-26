import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from . import models
from .auth import hash_password
from .database import SessionLocal, ensure_database_schema, engine
from .routes import router

load_dotenv()

logger = logging.getLogger("wardom")

ensure_database_schema()


def ensure_first_admin():
    db = SessionLocal()
    try:
        if db.query(models.AdminUser).count() > 0:
            return

        admin_email = os.getenv("ADMIN_EMAIL")
        admin_password = os.getenv("ADMIN_PASSWORD")
        if not admin_email or not admin_password:
            logger.warning("Skipping first-admin initialization because ADMIN_EMAIL and ADMIN_PASSWORD were not provided.")
            return

        admin = models.AdminUser(
            email=admin_email,
            hashed_password=hash_password(admin_password),
            is_active=True,
        )
        db.add(admin)
        db.commit()
    finally:
        db.close()


ensure_first_admin()

app = FastAPI(title="WARDOM Studio API", version="1.0.0")

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/")
def root():
    return {"status": "ok", "service": "wardom-api"}


@app.get("/health")
def health():
    return {"status": "healthy"}
