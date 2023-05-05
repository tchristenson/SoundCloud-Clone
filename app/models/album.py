from .db import db, environment, SCHEMA
from sqlalchemy.schema import ForeignKey


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'))
    name = db.Column(db.String(50), nullable=False)
    total_runtime = db.Column(db.Timestamp())  #Undecided on datatype. Date, datetime, integer?
    style_id = db.Column(db.Integer, ForeignKey('styles.id'))
    cover_image = db.Column(db.String())


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'totalRuntime': self.total_runtime,
            'styleId': self.style_id,
            'coverImage': self.cover_image

        }
