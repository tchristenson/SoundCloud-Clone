from app.models import db, likes, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    item1 = likes(owner_id=1, song_id=1)
    item2 = likes(owner_id=1, song_id=2)
    item3 = likes(owner_id=1, song_id=3)
    item4 = likes(owner_id=2, song_id=4)
    item5 = likes(owner_id=2, song_id=2)
    item6 = likes(owner_id=3, song_id=3)

    like_list = [item1, item2, item3, item4, item5, item6]

    for like in like_list:
        db.session.add(like)
        db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
