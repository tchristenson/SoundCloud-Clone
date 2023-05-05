from .db import db, environment, SCHEMA
from sqlalchemy.schema import ForeignKey


class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'))
    album_id = db.Column(db.Integer, ForeignKey('albums.id'))
    name = db.Column(db.String(50), nullable=False)
    runtime = db.Column(db.Integer) # Undecided on datatype. Date, datetime, or integer?
    style_id = db.Column(db.Integer, ForeignKey('styles.id'))
    cover_image = db.Column(db.String())
    content = db.Column(db.String(), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'albumId': self.album_id,
            'styleId': self.style_id,
            'name': self.name,
            'runtime': self.runtime,
            'coverImage': self.cover_image,
            'content': self.content
        }
