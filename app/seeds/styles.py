from app.models import db, Style, environment, SCHEMA
from sqlalchemy.sql import text

def seed_styles():
    reggae = Style(genre='Reggae')
    classic_rock = Style(genre='Classic Rock')
    punk = Style(genre='Punk')
    pop = Style(genre='Pop')
    hip_hop = Style(genre='Hip Hop')
    electronic = Style(genre='Electronic')
    jazz = Style(genre='Jazz')
    blues = Style(genre='Blues')
    country = Style(genre='Country')
    metal = Style(genre='Metal')
    folk = Style(genre='Folk')
    funk = Style(genre='Funk')
    soul = Style(genre='Soul')
    rnb = Style(genre='R&B')
    classical = Style(genre='Classical')

    styles_list = [reggae, classic_rock, punk, pop, hip_hop, electronic, jazz, blues, country, metal, folk, funk, soul, rnb, classical]

    for style in styles_list:
        db.session.add(style)
        db.session.commit()

def undo_styles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.styles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM styles"))

    db.session.commit()
