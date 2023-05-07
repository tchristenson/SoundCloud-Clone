from flask import Blueprint
from app.models import Song


song_routes = Blueprint('songs', __name__)


@song_routes.route('/')
def songs():
    """Query for all songs and return them in a list of dictionaries"""
    songs = Song.query.all()
    print('adsfasdfadfadfasfd',songs)
    return songs.to_dict()
