from flask import Blueprint
from ..models import Album, User


album_routes = Blueprint('albums', __name__)

@album_routes.route('/<int:id>')
def get_album_by_id(id):
    """
    Query for an album by id and returns that album in a dictionary
    """
    album = Album.query.get(id)
    return album.to_dict()


