from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

likes = db.Table(
    'song_likes',
    db.Model.metadata,
    db.Column('user_id', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('song_id', db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
)

if environment == "production":
    likes.schema = SCHEMA
