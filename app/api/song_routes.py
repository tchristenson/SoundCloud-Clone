from flask import Blueprint, request
from app.models import Song, Style, Album
from flask_login import current_user, login_required, current_user
from ..forms.song_form import NewSong
from ..models import db



song_routes = Blueprint('songs', __name__)


@song_routes.route('')
def songs():
    """Query for all songs and return them in a list of dictionaries"""
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/current')
@login_required
def user_songs():
    """Query for songs owned by the current user"""
    songs = Song.query.filter(Song.owner_id.like(current_user.id)).all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/<int:id>')
def song(id):
    """
    Query for a song by id and returns that song in a dictionary
    """
    song = Song.query.options(
        db.joinedload(Song.album),
        db.joinedload(Song.style)
    ).get(id)

    return song.to_dict()

@song_routes.route('/new', methods = ['POST'])
@login_required
def add_song():
    """Handles displaying a new post form on get requests and validating submitted data for songs posts"""

    # Reference line below when considering how to display the user's albums. We may need to set choices to an
    # empty list to start, then query the Album model and fill it only where the Album's user_id matches
    # the current user's id
    # form.author.choices = [(user.id, user.username) for user in User.query.all()]

    form = NewSong()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        style_name = form.data['style']
        style_instance = (Style.query.filter(Style.genre.like(style_name)).first()).to_dict()
        song= Song(name = form.data['name'],
                        owner_id = current_user.id,
                        runtime = form.data['runtime'],
                        cover_image = form.data['cover_image'],
                        content = form.data['content'],
                        album_id = form.data['album_id'], # placeholder until we can make this a dropdown
                        style_id = style_instance['id']) # placeholder
        db.session.add(song)
        db.session.commit()
        return song.to_dict()


    return { "errors": form.errors}


@song_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_song(id):
    """ Handles deleting a song by its id that is owned by the user
    """
    song = Song.query.get(id)
    if song.owner_id == current_user.id:
        db.session.delete(song)
        db.session.commit()
    else:
        return 'Must be song owner to delete song.'
