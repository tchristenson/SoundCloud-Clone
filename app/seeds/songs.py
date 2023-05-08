from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song_one = Song(
        owner_id = 1,
        album_id = 1,
        name = 'Song One',
        runtime = '00:03:34',
        style_id = 2,
        cover_image = 'random.png',
        content = 'randomsong.jpeg'

    )

    song_two = Song(
        owner_id = 1,
        album_id = 2,
        name = 'Song Two',
        runtime = '00:04:34',
        style_id = 2,
        cover_image = 'random2.png',
        content = 'randomsong2.jpeg'

    )

    song_three = Song(
        owner_id = 1,
        album_id = 3,
        name = 'Song Three',
        runtime = '00:05:34',
        style_id = 3,
        cover_image = 'random3.png',
        content = 'randomsong3.jpeg'

    )

    song_four = Song(
        owner_id = 2,
        album_id = 4,
        name = 'Song Four',
        runtime = '00:06:34',
        style_id = 4,
        cover_image = 'random4.png',
        content = 'randomsong4.jpeg'

    )

    song_five = Song(
        owner_id = 3,
        album_id = 5,
        name = 'Song Five',
        runtime = '00:07:34',
        style_id = 7,
        cover_image = 'random5.png',
        content = 'randomsong5.jpeg'

    )

    song_seven = Song(
        owner_id = 1,
        album_id = 5,
        name = 'Song Seven',
        runtime = '00:07:34',
        style_id = 7,
        cover_image = 'random5.png',
        content = 'randomsong5.jpeg'

    )

    song_eight = Song(
        owner_id = 1,
        album_id = 5,
        name = 'Song Eight',
        runtime = '00:07:34',
        style_id = 7,
        cover_image = 'random5.png',
        content = 'randomsong5.jpeg'

    )

    song_nine = Song(
        owner_id = 1,
        album_id = 5,
        name = 'Song Nine',
        runtime = '00:07:34',
        style_id = 7,
        cover_image = 'random5.png',
        content = 'randomsong5.jpeg'

    )

    song_ten = Song(
        owner_id = 1,
        album_id = 5,
        name = 'Song Ten',
        runtime = '00:07:34',
        style_id = 7,
        cover_image = 'random5.png',
        content = 'randomsong5.jpeg'

    )



    db.session.add_all([song_one, song_two, song_three, song_four, song_five, song_seven, song_eight, song_nine, song_ten])
    db.session.commit()



def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
