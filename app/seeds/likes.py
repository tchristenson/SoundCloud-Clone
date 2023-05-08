from app.models import db, likes, environment, SCHEMA
from sqlalchemy.sql import text
from ..models import User, Song

def seed_likes():
    # item1 = likes(owner_id=1, song_id=1)
    # item2 = likes(owner_id=1, song_id=2)
    # item3 = likes(owner_id=1, song_id=3)
    # item4 = likes(owner_id=2, song_id=4)
    # item5 = likes(owner_id=2, song_id=2)
    # item6 = likes(owner_id=3, song_id=3)

    # like_list = [item1, item2, item3, item4, item5, item6]

    # for like in like_list:
    #     db.session.add(like)
    #     db.session.commit()

    testUser = User(
        username='Test', email='test@aa.io', password='password', bio='demo makes music', alias='TestTest', profile_image="asdfgasddfg", first_name='Test', last_name='TestTest', style_id=1)
    song_six = Song(
        owner_id = 3,
        album_id = 5,
        name = 'Song Six',
        runtime = '00:07:34',
        style_id = 7,
        cover_image = 'random6.png',
        content = 'randomsong6.jpeg'
    )
    song_six.user_likes.append(testUser)
    db.session.add(song_six)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
