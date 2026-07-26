from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    budget: Optional[str] = None
    message: str = Field(..., min_length=1, max_length=5000)


class ContactOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    budget: Optional[str]
    message: str
    is_read: bool
    read_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True


class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    category: str = Field(..., min_length=1, max_length=120)
    year: str = Field(..., min_length=1, max_length=10)
    image_url: Optional[str] = None
    live_url: Optional[str] = None
    order: int = Field(default=0, ge=0)
    featured: bool = False


class ProjectOut(BaseModel):
    id: int
    name: str
    category: str
    year: str
    image_url: Optional[str]
    live_url: Optional[str]
    order: int
    featured: bool

    class Config:
        from_attributes = True


class TestimonialCreate(BaseModel):
    quote: str = Field(..., min_length=1, max_length=5000)
    name: str = Field(..., min_length=1, max_length=120)
    role: str = Field(..., min_length=1, max_length=160)
    rating: int = Field(default=5, ge=1, le=5)
    video_url: Optional[str] = None


class TestimonialOut(BaseModel):
    id: int
    quote: str
    name: str
    role: str
    rating: int
    video_url: Optional[str]

    class Config:
        from_attributes = True


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True


class ServiceCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=160)
    description: str = Field(..., min_length=1, max_length=2000)
    icon: Optional[str] = None
    order: int = Field(default=0, ge=0)


class ServiceOut(BaseModel):
    id: int
    title: str
    description: str
    icon: Optional[str]
    order: int

    class Config:
        from_attributes = True


class SiteSettingsOut(BaseModel):
    id: int
    company_name: str
    company_email: str
    phone: Optional[str]
    location: Optional[str]
    instagram_url: Optional[str]
    linkedin_url: Optional[str]
    x_url: Optional[str]
    seo_title: str
    seo_description: str
    og_title: Optional[str]
    og_description: Optional[str]

    class Config:
        from_attributes = True


class SiteSettingsUpdate(BaseModel):
    company_name: str = Field(default="WARDOM Studio", max_length=160)
    company_email: str = Field(default="hello@wardom.studio", max_length=200)
    phone: Optional[str] = None
    location: Optional[str] = None
    instagram_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    x_url: Optional[str] = None
    seo_title: str = Field(default="WARDOM Studio", max_length=220)
    seo_description: str = Field(default="Premium digital experiences for brands that refuse to look ordinary.")
    og_title: Optional[str] = None
    og_description: Optional[str] = None


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminUserOut(BaseModel):
    id: int
    email: str
    is_active: bool

    class Config:
        from_attributes = True


class AdminPasswordUpdate(BaseModel):
    current_password: str = Field(..., min_length=1)
    new_password: str = Field(..., min_length=8)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class MessageReadUpdate(BaseModel):
    is_read: bool
