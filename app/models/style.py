from .db import db, environment, SCHEMA



class Style(db.Model):
    __tablename__ = 'styles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String(30), nullable=False)

    owner = db.relationship('User', back_populates='style')
    songs = db.relationship('Song', back_populates='style')
    album = db.relationship('Album', back_populates='style')

    def to_dict(self):
        return {
            'id': self.id,
            'genre': self.genre
        }
