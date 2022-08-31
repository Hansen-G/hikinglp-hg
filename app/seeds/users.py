import email
from app.models import db, User


# Adds a demo user, you can add other users here if you want

user1 = User(
    username='charlie',
    email='demo@aa.io',
    name='Charlie',
    password='password',
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png',
)
user2 = User(
    username='marnie',
    email='marnie@aa.io',
    name='Marnie',
    password='password',
    followers=[user1]
)
user3 = User(
    username='bobbie',
    email='bobbie@aa.io',
    name='Bobbie',
    password='password',
    followers=[user2, user1]
)
user4 = User(
    username='hansen',
    email='hansen@aa.io',
    name='Hansen',
    password='password',
    followers=[user2, user3]
)
user5 = User(
    username='kevin',
    email='kevin@aa.io',
    name='Kevin',
    password='password',
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
