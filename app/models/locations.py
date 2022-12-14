from .db import db
from sqlalchemy.sql import func

class Location(db.Model):
    __tablename__ = 'locations'
    # Test

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    nsf_id = db.Column(db.String, unique=True, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    details = db.Column(db.String(2000), nullable=False)
    directionsInfo = db.Column(db.String(2000), nullable=False)
    address = db.Column(db.String(1000), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    preview_img = db.Column(db.String(1000), nullable=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, onupdate=func.now())

    user = db.relationship('User', back_populates='locations')
    posts = db.relationship(
        'Post', back_populates='locations', cascade="all, delete-orphan")
    images = db.relationship(
        'Image', back_populates='locations', cascade="all, delete-orphan")

    

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'address': self.address,
            'details': self.details,
            'preview_img': self.preview_img,
            "directionsInfo": self.directionsInfo,
            "city": self.city,
            "state": self.state,
            'lat': self.lat,
            'lng': self.lng,
            "posts": [post.to_dict() for post in self.posts],
            "nsf_id": self.nsf_id,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }