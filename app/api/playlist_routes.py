from flask import Blueprint, request
from ..models import Playlist, db
from flask_login import current_user, login_required
from ..forms.playlist_form import NewPlaylist

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


@playlist_routes.route('/new', methods=['POST'])
@login_required
def add_playlist():

    form = NewPlaylist()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # style_name = form.data['style']
        # print("style_name =========>  :", style_name)
        # print("Style.genre =========>  :", Style.genre)
        # style_instance = (Style.query.filter(Style.genre == style_name)).first().to_dict()



        playlist = Playlist(name = form.data['name'],
                      owner_id = current_user.id,
                     )

        db.session.add(playlist)
        db.session.commit()
        return playlist.to_dict()

    return { "errors": form.errors}
