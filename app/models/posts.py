from app.models import comments
from .db import db
from sqlalchemy.sql import func


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=True)
    post = db.Column(db.String(5000), nullable=False)
    preview_img = db.Column(db.String(1000), nullable=True)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, onupdate=func.now())

    user = db.relationship('User', back_populates='posts')
    locations = db.relationship('Location', back_populates='posts')
    comments = db.relationship('Comment', back_populates='posts', cascade="all, delete-orphan")
    images = db.relationship('Image', back_populates='posts', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'location_id': self.location_id,
            'post': self.post,
            'preview_img': self.preview_img,
            "user": self.user.to_dict(),
            "comments": [comment.to_dict() for comment in self.comments],
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }


