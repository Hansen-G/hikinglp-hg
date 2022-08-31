from .db import db
from sqlalchemy.sql import func


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(64), nullable=False)
    tag = db.Column(db.String(64), nullable=False) 
    description = db.Column(db.String(1000), nullable=False)
    preview_img = db.Column(db.String(1000), nullable=True)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, onupdate=func.now())
    user = db.relationship('User', back_populates='albums')
    images = db.relationship('Image', back_populates='album', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'tag': self.tag,
            'description': self.details,
            'preview_img': self.preview_img,
            "user": self.user.to_dict(),
            "images": [image.to_dict() for image in self.images]
        }