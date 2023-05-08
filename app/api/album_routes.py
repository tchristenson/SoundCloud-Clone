from flask import Blueprint
from ..models import Album, User


album_routes = Blueprint('albums', __name__)

@album_routes.route('')
def get_all_albums():
    """Query for all albums and return them in a list of dictionaries"""
    albums = Album.query.all()
    return {'Albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>')
def get_album_by_id(id):
    """
    Query for an album by id and returns that album in a dictionary
    """
    album = Album.query.get(id)
    return album.to_dict()

@album_routes.route('/current')
def user_albums():
    """Query for albums owned by the current user"""
    albums = Album.query.join(User, User.id == Album.owner_id).all()
    return {'Albums': [album.to_dict() for album in albums]}
