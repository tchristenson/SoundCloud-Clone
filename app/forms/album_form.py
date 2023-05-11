from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Album
from app.api.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS

def album_exists(form, field):
    new_album_name = field.data
    album = Album.query.filter(Album.name == new_album_name).first()
    if album:
        raise ValidationError('This album already exists!')

class NewAlbum(FlaskForm):
    name = StringField("Album Name", validators=[DataRequired()])
    cover_image = FileField("Cover Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])
    style = SelectField("Style", choices=[('reggae', "Reggae"), ('classic_rock', "Classic Rock"),
                                      ('punk', "Punk"), ('pop', "Pop"), ('hip_hop', "Hip Hop"),
                                      ('electronic', "Electronic"), ('jazz', "Jazz"), ('blues', "Blues"),
                                      ('country', "Country"), ('metal', "Metal"), ('folk', "Folk"),
                                      ('funk', "Funk"), ('soul', "Soul"), ('rnb', "R&B"),
                                      ('classical', "Classical")])
