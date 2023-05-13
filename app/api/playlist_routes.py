from flask import Blueprint, request
from ..models import Playlist, db
from flask_login import current_user, login_required

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('')
def get_all_playlists():
    """Query for all playlists and return them in a list of dictionaries"""
    playlists = Playlist.query.all()
    return {'Playlists': [playlist.to_dict() for playlist in playlists]}

@playlist_routes.route('/current')
@login_required
def user_playlists():
    """Query for playlists owned by the current user"""
    playlists = Playlist.query.filter(Playlist.owner_id == current_user.id).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}
