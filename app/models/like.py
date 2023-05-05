from .db import db, environment, SCHEMA
from sqlalchemy.schema import ForeignKey
# from .user import User
# from .song import Song



class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'))
    song_id = db.Column(db.Integer, ForeignKey('songs.id'))

    owner = db.relationship('User', back_populates='likes')
    song = db.relationship('Song', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'songId': self.song_id
        }
