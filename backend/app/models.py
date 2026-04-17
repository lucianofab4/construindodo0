from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from .database import Base


class Post(Base):
    __tablename__ = "posts"

    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String(255), nullable=False)
    slug        = Column(String(255), unique=True, nullable=False, index=True)
    excerpt     = Column(String(500))
    content     = Column(Text, nullable=False)
    category    = Column(String(100))
    published   = Column(Boolean, default=True)
    featured    = Column(Boolean, default=False)
    read_time   = Column(Integer, default=5)  # minutes
    created_at  = Column(DateTime, default=datetime.utcnow)
    updated_at  = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Project(Base):
    __tablename__ = "projects"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(255), nullable=False)
    slug        = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(Text)
    long_desc   = Column(Text)
    status      = Column(String(50), default="active")  # active | building | idea
    url         = Column(String(500))
    order       = Column(Integer, default=0)
    created_at  = Column(DateTime, default=datetime.utcnow)


class Subscriber(Base):
    __tablename__ = "subscribers"

    id         = Column(Integer, primary_key=True, index=True)
    email      = Column(String(255), unique=True, nullable=False, index=True)
    active     = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Contact(Base):
    __tablename__ = "contacts"

    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String(255), nullable=False)
    email      = Column(String(255), nullable=False)
    subject    = Column(String(500))
    message    = Column(Text, nullable=False)
    read       = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
