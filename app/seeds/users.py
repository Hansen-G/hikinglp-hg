import email
from app.models import db, User


# Adds a demo user, you can add other users here if you want

user1 = User(
    username='charlie',
    email='demo@aa.io',
    name='Charlie',
    password='password',
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1662413467/Hikinglp/f20ffc372c2009378905e712b032b4f0_s0jt2j.jpg',
)
user2 = User(
    username='marnie',
    email='marnie@aa.io',
    name='Marnie',
    password='password',
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1662413463/Hikinglp/07c5a53870c411bd6f7aa78b26f9a3e1_kpwvbr.jpg',
    followers=[user1]
)
user3 = User(
    username='bobbie',
    email='bobbie@aa.io',
    name='Bobbie',
    password='password',
     profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1662189939/Hikinglp/WX20220903-032532_2x_re1fri.png',
    followers=[user2, user1]
)
user4 = User(
    username='hansen',
    email='hansen@aa.io',
    name='Hansen',
    password='password', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample-2.jpg',

    followers=[user2, user3]
)
user5 = User(
    username='kevin',
    email='kevin@aa.io',
    name='Kevin',
    password='password',
     profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample.jpg',
    followers=[user1, user4]
    
)

user_list = [user1, user2, user3, user4,
                 user5]


def seed_users():
    for user in user_list:
        db.session.add(user)
        db.session.commit()
    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)

    # db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
