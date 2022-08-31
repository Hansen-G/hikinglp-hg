from app.models import albums, images, locations
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from email.policy import default
from .followings import follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String(1000), nullable=True, default='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png')
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, onupdate=func.now())

    posts = db.relationship('Post', back_populates='user', cascade="all, delete-orphan")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    images = db.relationship('Image', back_populates='user', cascade="all, delete-orphan")
    albums = db.relationship('Album', back_populates='user', cascade="all, delete-orphan")
    locations = db.relationship('Location', back_populates='user', cascade="all, delete-orphan")

    # With refering to AA repo
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.following_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            "name": self.name,
            'username': self.username,
            'email': self.email,
            'profile_img': self.profile_img,
        }
