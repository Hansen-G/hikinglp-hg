from app.models import db, User, Post, Comment, Location, Image, Album
# from app.seeds.users import user1, user2, user3, user4, user5
# from app.seeds.posts import post1, post2, post3, post4, post5, post6


comment1 = Comment(
    post_id=1,
    user_id=1,
    comment="This is my first post and first comment",
)
comment2 = Comment(
    post_id=1,
    user_id=2,
    comment="This is my first post and second comment",
)
comment3 = Comment(
    post_id=1,
    user_id=3,
    comment="This is my first post and third comment",
)

comment4 = Comment(
    post_id=2,
    user_id=1,
    comment="This is my second post and first comment",
)
comment5 = Comment(
    post_id=2,
    user_id=2,
    comment="This is my second post and second comment",
)
comment6 = Comment(
    post_id=2,
    user_id=3,
    comment="This is my second post and third comment",
)

comment_list = [comment1, comment2, comment3, comment4, comment5, comment6]
def seed_comments():
    for comment in comment_list:
        db.session.add(comment)
        db.session.commit()

def undo_seed_comments():
    for comment in comment_list:
        db.session.delete(comment)
        db.session.commit()
