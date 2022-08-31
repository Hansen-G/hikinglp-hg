from .db import db
from sqlalchemy.sql import func


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)
    tag = db.Column(db.String(64), nullable=False)
    url = db.Column(db.String(1000), nullable=True)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, onupdate=func.now())
    user = db.relationship('User', back_populates='images')
    album = db.relationship('Album', back_populates='images')
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'album_id': self.album_id,
            'tag': self.tag,
            'url': self.url,
            "user": self.user.to_dict(),
        }

