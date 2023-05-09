from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Song

# def user_doesnt_exist(form, field):
#     username = field.data
#     user = User.query.filter(User.username != username).first()
#     if user:
#         raise ValidationError('Must be signed in to create a song!')

def song_exists(form, field):
    new_song_name = field.data
    song = Song.query.filter(Song.name == new_song_name).first()
    if song:
        raise ValidationError('This song already exists!')

class NewSong(FlaskForm):
    name = StringField("Song Name", validators=[DataRequired()])
    runtime = StringField("Run Time")
    cover_image = StringField("Cover Image")
    content = StringField("Content")
    album_id = SelectField("Album", choices=[])
    style = SelectField("Style", choices=[('reggae', "Reggae"), ('classic_rock', "Classic Rock"),
                                          ('punk', "Punk"), ('pop', "Pop"), ('hip_hop', "Hip Hop"),
                                          ('electronic', "Electronic"), ('jazz', "Jazz"), ('blues', "Blues"),
                                          ('country', "Country"), ('metal', "Metal"), ('folk', "Folk"),
                                          ('funk', "Funk"), ('soul', "Soul"), ('rnb', "R&B"),
                                          ('classical', "Classical")])
    submit = SubmitField("Submit Song")
