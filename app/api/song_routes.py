from flask import Blueprint, request
from app.models import Song, Style
from flask_login import current_user, login_required, current_user
from ..forms.song_form import NewSong
from ..forms.edit_song_form import EditSong
from ..models import db
from ..api.aws_song_helpers import get_unique_song_filename, upload_song_file_to_s3
from ..api.aws_image_helpers import get_unique_image_filename, upload_image_file_to_s3



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
    song = Song.query.get(id)
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


    print("form.data ======>>", form.data)

    if form.validate_on_submit():
        style_name = form.data['style']
        style_instance = (Style.query.filter(Style.genre.like(style_name)).first()).to_dict()

        cover_image = form.data["cover_image"]
        cover_image.filename = get_unique_image_filename(cover_image.filename)
        image_upload = upload_image_file_to_s3(cover_image)

        print("=========> upload data here get y IMAGE :", image_upload)
        content = form.data["content"]
        content.filename = get_unique_song_filename(content.filename)
        audio_upload = upload_song_file_to_s3(content)

        print("=========> upload data here get y AUDIO :", audio_upload["url"])

        # if "url" not in audio_upload:
        #     return { "errors": form.errors}
        # if "url" not in image_upload:
        #     return { "errors": form.errors}

        song= Song(name = form.data['name'],
                        owner_id = current_user.id,
                        cover_image = image_upload["url"],
                        content = audio_upload["url"],
                        album_id = form.data['album_id'],
                        style_id = style_instance['id'])
        print("song here look belive me ===> :", song)
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
        return "Delete Successful"
    else:
        return 'Must be song owner to delete song.'

@song_routes.route("/edit/<int:id>", methods=['PUT'])
@login_required
def edit_song(id):
    """Handles editing a song's details if the song owner is the logged in user"""

    song = Song.query.get(id)
    if not song:
        return {"error": "Song not found."}
    print('song printing inside of edit route ------->', song.to_dict())

    form = EditSong()
    form['csrf_token'].data = request.cookies['csrf_token']


    print("form.data ======>>", form.data)

    if form.validate_on_submit():
        style_name = form.data['style']
        style_instance = (Style.query.filter(Style.genre.like(style_name)).first()).to_dict()

        cover_image = form.data["cover_image"]
        cover_image.filename = get_unique_image_filename(cover_image.filename)
        image_upload = upload_image_file_to_s3(cover_image)

        print("=========> upload data here get y IMAGE :", image_upload)
        # content = form.data["content"]
        # content.filename = get_unique_song_filename(content.filename)
        # audio_upload = upload_song_file_to_s3(content)

        # print("=========> upload data here get y AUDIO :", audio_upload["url"])

        # if "url" not in audio_upload:
        #     return { "errors": form.errors}
        # if "url" not in image_upload:
        #     return { "errors": form.errors}

        song.name = form.data['name']
        song.cover_image = image_upload["url"]
        # song.content = audio_upload["url"]
        song.album_id = form.data['album_id']
        song.style_id = style_instance['id']
        print("song here look belive me ===> :", song)
        # db.session.add(song)
        db.session.commit()
        return song.to_dict()


    return { "errors": form.errors}
