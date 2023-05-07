from flask import Blueprint
from app.models import Song, User



song_routes = Blueprint('songs', __name__)


@song_routes.route('')
def songs():
    """Query for all songs and return them in a list of dictionaries"""
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/current')
def user_songs():
    """Query for songs owned by the current user"""
    # songs = Song.query.filter(Song.owner_id.like(User.id)).all()
    songs = Song.query.join(User, User.id == Song.owner_id).all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/<int:id>')
def song(id):
    """
    Query for a song by id and returns that song in a dictionary
    """
    song = Song.query.get(id)
    return song.to_dict()
