from .db import db
from sqlalchemy.sql import func
from enum import unique


class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=True, onupdate=func.now())

    user = db.relationship("User", back_populates="comments")                 
    posts = db.relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment': self.comment,
            "user": self.user.to_dict(),
            
        }
