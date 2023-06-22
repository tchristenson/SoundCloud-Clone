from flask import Blueprint, request
from app.models import Song, Album, User
from ..models import db


search_routes = Blueprint('search', __name__)
