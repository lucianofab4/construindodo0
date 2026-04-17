from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


# ── Posts ──────────────────────────────────────────────────────────────────

class PostOut(BaseModel):
    id:         int
    title:      str
    slug:       str
    excerpt:    Optional[str]
    category:   Optional[str]
    featured:   bool
    read_time:  int
    created_at: datetime

    model_config = {"from_attributes": True}


class PostDetailOut(PostOut):
    content: str


# ── Projects ───────────────────────────────────────────────────────────────

class ProjectOut(BaseModel):
    id:          int
    name:        str
    slug:        str
    description: Optional[str]
    long_desc:   Optional[str]
    status:      str
    url:         Optional[str]
    created_at:  datetime

    model_config = {"from_attributes": True}


# ── Subscribers ────────────────────────────────────────────────────────────

class SubscriberCreate(BaseModel):
    email: EmailStr


class SubscriberOut(BaseModel):
    id:    int
    email: str

    model_config = {"from_attributes": True}


# ── Contact ────────────────────────────────────────────────────────────────

class ContactCreate(BaseModel):
    name:    str
    email:   EmailStr
    subject: Optional[str] = None
    message: str


class ContactOut(BaseModel):
    id:      int
    name:    str
    subject: Optional[str]

    model_config = {"from_attributes": True}
