from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS
from app.models import User
import re

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_email(form, field):
    email = field.data
    email_error = '@' not in email
    if email_error:
        raise ValidationError('Email is not valid.')
    if(re.fullmatch(regex, email)):
        print("Valid Email")
    else:
        raise ValidationError("Invalid Email")

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired()])
    alias = StringField('alias')
    bio = StringField('bio')
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    profile_picture = FileField("profile_picture", validators=[FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])
