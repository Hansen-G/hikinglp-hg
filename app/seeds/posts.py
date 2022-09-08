from app.models import db, User, Post, Comment, Location, Image, Album
from app.seeds.users import user1, user2, user3, user4, user5

post1 = Post(
    user_id=1,
    location_id=1,
    post="Nice place to visit",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1662609002/Hikinglp/8d1ffea4d0f59ea2ee4b5c52b6a7234c_ycyrsx.jpg"
    )
post2 = Post(
    user_id=2,
    location_id=2,
    post="Amazing place to visit",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1662609004/Hikinglp/de57c584a1bf7660b44a3ecbe719696d_z3llyq.jpg"
    )
post3 = Post(
    user_id=3,
    location_id=3,
    post="I love this place",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1662609007/Hikinglp/8c48f581ea9ff0578667a4756ee85439_jjlmjw.jpg"
)

post4 = Post(
    user_id=1,
    location_id=3,
    post="Excellent place for a vacation",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1662609008/Hikinglp/ed65027a80e9751a36aa504460ba7694_ozenru.jpg"
)


post5 = Post(
    user_id=2,
    location_id=1,
    post="I visited this place last year",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1662609011/Hikinglp/b694d36901a8b9b093ef4b171c0bb38d_sgwy06.jpg"
)

post6 = Post(
    user_id=3,
    location_id=3,
    post="Wow this place is amazing",
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1662609073/Hikinglp/574a6e25f3dc08a3d4b9cbb228edc639_jknnaf.jpg"
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


