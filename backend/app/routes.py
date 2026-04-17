import logging
from typing import List, Optional
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from .database import get_db
from .models import Post, Project, Subscriber, Contact
from .schemas import (
    PostOut, PostDetailOut,
    ProjectOut,
    SubscriberCreate, SubscriberOut,
    ContactCreate, ContactOut,
)
from .email_utils import send_contact_email

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api")


# ── Posts ──────────────────────────────────────────────────────────────────

@router.get("/posts", response_model=List[PostOut])
def list_posts(
    category: Optional[str] = Query(None),
    limit:    int            = Query(20, ge=1, le=100),
    offset:   int            = Query(0,  ge=0),
    db:       Session        = Depends(get_db),
):
    q = db.query(Post).filter(Post.published == True)
    if category:
        q = q.filter(Post.category.ilike(category))
    return q.order_by(Post.created_at.desc()).offset(offset).limit(limit).all()


@router.get("/posts/{slug}", response_model=PostDetailOut)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug, Post.published == True).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return post


# ── Projects ───────────────────────────────────────────────────────────────

@router.get("/projects", response_model=List[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.order).all()


@router.get("/projects/{slug}", response_model=ProjectOut)
def get_project(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return project


# ── Subscribers ────────────────────────────────────────────────────────────

@router.post("/subscribers", response_model=SubscriberOut, status_code=201)
def subscribe(data: SubscriberCreate, db: Session = Depends(get_db)):
    # Already subscribed? Return silently (no info leak)
    existing = db.query(Subscriber).filter(Subscriber.email == data.email).first()
    if existing:
        return existing
    sub = Subscriber(email=data.email)
    db.add(sub)
    try:
        db.commit()
        db.refresh(sub)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    return sub


# ── Contact ────────────────────────────────────────────────────────────────

@router.post("/contact", response_model=ContactOut, status_code=201)
def send_contact(
    data:       ContactCreate,
    background: BackgroundTasks,
    db:         Session = Depends(get_db),
):
    # Salva no banco
    contact = Contact(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)

    # Dispara email em background (não bloqueia a resposta ao frontend)
    background.add_task(
        send_contact_email,
        name=data.name,
        email=data.email,
        subject=data.subject or "",
        message=data.message,
    )

    return contact
