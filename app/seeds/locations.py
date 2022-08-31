from app.models import db, User, Post, Comment, Location, Image, Album

location1 = Location(
    name="Alcatraz Island",
    details='Alcatraz reveals stories of American incarceration, justice, and our common humanity. This small island was once a fort, a military prison, and a maximum security federal penitentiary. In 1969, the Indians of All Tribes occupied Alcatraz for 19 months in the name of freedom and Native American civil rights. We invite you to explore Alcatraz\'s complex history and natural beauty.',
    address='Alcatraz Island, San Francisco, CA',
    lat=37.8267,
    lng=-122.4233,
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1661926183/Hikinglp/location1_dqgmla.png"
)


location2 = Location(
    name="Castle Mountains",
    details='Castle Mountains represents some of the most unique elements of the Mojave Desert. Nestled between the Nevada state line and Mojave National Preserve, the nearly 21,000 acres of Castle Mountains boasts Joshua tree forests, unbroken natural landscapes, rare desert grasslands, and rich human history. This intriguing area provides serenity and solitude from nearby metropolitan areas.',
    address='Castle Mountains, Mojave, CA',
    lat=35.0,
    lng=-115.0,
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1661926189/Hikinglp/location2_xycgbe.png"
)


location3 = Location(
    name='Golden Gate',
    details='Experience a park so rich it supports 19 distinct ecosystems with over 2,000 plant and animal species. Go for a hike, enjoy a vista, have a picnic or learn about the centuries of overlapping history from California’s indigenous cultures, Spanish colonialism, the Mexican Republic, US military expansion and the growth of San Francisco. All of this and more awaits you, so get out and find your park.',
    address='Golden Gate Park, San Francisco, CA',
    lat=37.8267,
    lng=-122.4233,
    preview_img="https://res.cloudinary.com/hansenguo/image/upload/v1661926186/Hikinglp/location3_gxwtkz.png"
)

location_list = [location1, location2, location3]

def seed_locations():
    for location in location_list:
        db.session.add(location)
        db.session.commit()

def undo_seed_locations():
    for location in location_list:
        db.session.delete(location)
        db.session.commit()