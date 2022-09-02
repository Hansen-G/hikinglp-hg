from flask.cli import AppGroup
from .users import seed_users, undo_users
from .locations import seed_locations, undo_seed_locations
from .posts import seed_posts, undo_seed_posts
from .comments import seed_comments, undo_seed_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_locations()
    seed_posts()
    seed_comments()
    
    


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_seed_comments()
    undo_seed_posts()
    undo_seed_locations()
    


