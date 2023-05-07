from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song_one = Song(
        owner_id = 1,
        album_id = 1,
        name = 'Album One',
        runtime = '00:03:34',
        style_id = 2,
        cover_image = 'random.png',
        content = 'randomsong.jpeg'

    )

    song_two = Song(
        owner_id = 1,
        album_id = 2,
        name = 'Album Two',
        runtime = '00:04:34',
        style_id = 2,
        cover_image = 'random2.png',
        content = 'randomsong2.jpeg'

    )

    song_three = Song(
        owner_id = 1,
        album_id = 3,
        name = 'Album Three',
        runtime = '00:05:34',
        style_id = 3,
        cover_image = 'random3.png',
        content = 'randomsong3.jpeg'

    )

    song_four = Song(
        owner_id = 2,
        album_id = 4,
        name = 'Album Four',
        runtime = '00:06:34',
        style_id = 4,
        cover_image = 'random4.png',
        content = 'randomsong4.jpeg'

    )

    song_five = Song(
        owner_id = 3,
        album_id = 5,
        name = 'Album Five',
        runtime = '00:07:34',
        style_id = 7,
        cover_image = 'random5.png',
        content = 'randomsong5.jpeg'

    )

    db.session.add_all([song_one, song_two, song_three, song_four, song_five])
    db.session.commit()








def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()