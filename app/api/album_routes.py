from flask import Blueprint
from ..models import Album, User
from flask_login import current_user, login_required


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
@login_required
def user_albums():
    """Query for albums owned by the current user"""
    albums = Album.query.filter(Album.owner_id.like(current_user.id)).all()
    return {'Albums': [album.to_dict() for album in albums]}
