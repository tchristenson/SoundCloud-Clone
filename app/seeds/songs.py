from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song_one = Song(
        owner_id = 1,
        album_id = 1,
        name = 'Non-Violence',
        style_id = 3,
        cover_image = 'http://vibillow-images.s3.amazonaws.com/5c9bcb1130c744b78dc1b46d74c57b25.jpg',
        content = 'http://vibillow-songs.s3.amazonaws.com/ef62d5ae422442da80248074565fbff4.wav',
    )

    song_two = Song(
        owner_id = 1,
        album_id = 2,
        name = 'Song Two',
        style_id = 2,
        cover_image = 'https://i.imgur.com/kvEQyMo.jpg',
        content = 'https://vibillow-songs.s3.amazonaws.com/0da8b2074d06482a9f4b6af8066d86ae.wav',
    )

    song_three = Song(
        owner_id = 1,
        album_id = 3,
        name = 'Song Three',
        style_id = 3,
        cover_image = 'https://i.imgur.com/w23vYOi.jpg',
        content = 'https://vibillow-songs.s3.amazonaws.com/2212ed545aff49ac9f69ebd364dc3673.wav',
        # playlist_id = 1


    )

    song_four = Song(
        owner_id = 2,
        album_id = 4,
        name = 'Song Four',
        style_id = 4,
        cover_image = 'https://i.imgur.com/33858EJ.jpg',
        content = 'https://vibillow-songs.s3.amazonaws.com/3226d1015c2d4032b7a244cac7fb8b70.wav',
        # playlist_id = 1


    )

    song_five = Song(
        owner_id = 3,
        album_id = 5,
        name = 'Song Five',
        style_id = 7,
        cover_image = 'https://i.imgur.com/35t2wGj.jpg',
        content = 'https://vibillow-songs.s3.amazonaws.com/b92e4bbb980541c598a8ba5c0b4b3963.wav',
        # playlist_id = 1


    )

    song_seven = Song(
        owner_id = 1,
        album_id = 5,
        name = 'Song Seven',
        style_id = 7,
        cover_image = 'https://i.imgur.com/5CahQbr.jpg',
        content = 'https://vibillow-songs.s3.amazonaws.com/c2f43bee2623462a9932737b33d7dad8.wav',
        # playlist_id = 2


    )

    song_eight = Song(
        owner_id = 1,
        album_id = 5,
        name = 'Song Eight',
        style_id = 7,
        cover_image = 'https://i.imgur.com/l9gesTl.jpg',
        content = 'https://vibillow-songs.s3.amazonaws.com/d981e8da966b432ea303f85a03422de3.wav',
        # playlist_id = 2

    )

    song_nine = Song(
        owner_id = 1,
        album_id = 5,
        name = 'Song Nine',
        style_id = 7,
        cover_image = 'https://i.imgur.com/PmHN2v3.jpg',
        content = 'https://vibillow-songs.s3.amazonaws.com/daf90ec7342b45c6bcd6e6dac1f5a64d.wav',
        # playlist_id = 3

    )

    song_ten = Song(
        owner_id = 1,
        album_id = 5,
        name = 'Song Ten',
        style_id = 7,
        cover_image = 'https://i.imgur.com/QQGpEO9.jpg',
        content = 'https://vibillow-songs.s3.amazonaws.com/dcaa80a1d7434b349a50ec64c06ef59f.wav',
        # playlist_id = None

    )



    db.session.add_all([song_one, song_two, song_three, song_four, song_five, song_seven, song_eight, song_nine, song_ten])
    db.session.commit()



def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
