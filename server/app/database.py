import os
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./wardom.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def ensure_database_schema():
    Base.metadata.create_all(bind=engine)

    if not DATABASE_URL.startswith("sqlite"):
        return

    inspector = inspect(engine)
    if "contact_submissions" in inspector.get_table_names():
        columns = {column["name"] for column in inspector.get_columns("contact_submissions")}
        with engine.begin() as connection:
            if "is_read" not in columns:
                connection.execute(text("ALTER TABLE contact_submissions ADD COLUMN is_read BOOLEAN DEFAULT 0"))
            if "read_at" not in columns:
                connection.execute(text("ALTER TABLE contact_submissions ADD COLUMN read_at DATETIME"))

    if "projects" in inspector.get_table_names():
        columns = {column["name"] for column in inspector.get_columns("projects")}
        with engine.begin() as connection:
            if "featured" not in columns:
                connection.execute(text("ALTER TABLE projects ADD COLUMN featured BOOLEAN DEFAULT 0"))


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
