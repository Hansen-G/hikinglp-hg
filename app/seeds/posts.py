from app.models import db, User, Post, Comment, Location, Image, Album
from app.seeds.users import user1, user2, user3, user4, user5

post1 = Post(
    user_id=1,
    location_id=1,
    post="I am a post",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample-2.jpg"
    )
post2 = Post(
    user_id=2,
    location_id=2,
    post="I am a post",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample-2.jpg"
    )
post3 = Post(
    user_id=3,
    location_id=3,
    post="I am a post",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample-2.jpg"
)

post4 = Post(
    user_id=1,
    location_id=3,
    post="I am a post",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample-2.jpg"
)


post5 = Post(
    user_id=2,
    location_id=1,
    post="I am a post",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample-2.jpg"
)

post6 = Post(
    user_id=3,
    location_id=3,
    post="I am a post",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample-2.jpg"
)

post_list = [post1, post2, post3, post4, post5, post6]

def seed_posts():
    for post in post_list:
        db.session.add(post)
        db.session.commit()

def undo_seed_posts():
    for post in post_list:
        db.session.delete(post)
        db.session.commit()


