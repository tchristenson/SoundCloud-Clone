## <h1>Vibillow</h1>



<<<<<<< HEAD
Vibillow is a website clone, inspired by [SoundCloud](https://soundcloud.com/discover). Vibillow can be used to post songs and albums for everyone to hear. Interested parties can sign up to post content at their leisure.
=======
Vibillow is a website clone, inspired by [SoundCloud](https://soundcloud.com/discover). Vibillow can be used to post songs and albums for everyone to hear. Users can also like songs and search for their favorite songs. Interested parties can sign up to post content at their leisure.
>>>>>>> d28e5d2f001c15797fca94faea51eddf7d20d1a1

**Live Site: [Vibillow](https://vibillow.onrender.com)**

#### Please see below links to project Wiki:
* [Feature List](https://github.com/tchristenson/SoundCloud-Clone/blob/main/feature_list.md)
* [Database Schema](https://github.com/tchristenson/SoundCloud-Clone/blob/main/DbDiagram.png)


<<<<<<< HEAD
#### This project is built with:
* Python
* JS
* PostgreSQL
* Flask
* React
* Redux

#### How to start project locally:
1. clone the repo into a desired location
2. cd into the react-app folder and npm install all the dependencies
3. run pipenv install -r requirements.txt from the root directory
4. get into the shell with pipenv shell
5. run the following commands in order: flask db init, flask db migrate, flask db upgrade, flask seed all
6. to start the server run flask run
7. cd into the react-app and run npm start
8. enjoy the music
=======

#### How to start project locally:
1. Clone the project repo into the desired location on your machine (https://github.com/tchristenson/SoundCloud-Clone)
2. Create a **.env** file based on the example with proper settings for your development environment. Review the *aws-s3-uploads-flask.md* file to set up your own AWS bucket and user
3. cd into the react-app directory and run the command below to install all dependencies
      ```bash
      npm install
      ```
4. Inside the root directory, run the following command:
      ```bash
      pipenv install -r requirements.txt
      ```
5. Still inside the root directory, run the commands below. Once executed, the database should be seeded and running:

      ```bash
      pipenv shell
      flask db init
      flask db migrate
      flask db upgrade
      flask seed all
      flask run
      ```

6. cd into the react-app directory and run the following command:
      ```bash
      npm start
      ```

7. Browse the site and enjoy

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /api/auth | To authenticate a user |
| POST | /api/auth/login | To login an existing user account |
| GET | /api/auth/logout | To logout the current user |
| POST | /api/auth/signup | To create a new user and log them in |
| GET | /api/auth/unauthorized | To return unauthorized JSON when login authentication fails |
| GET | /api/users | Queries for all users and returns each user as an object inside an array |
| GET | /api/users/:userId | Queries for a single user and returns that user as an object |
| GET | /api/albums | Queries for all albums and returns the albums as a list of dictionaries |
| GET | /api/albums/current | Queries for all albums owned by the current user and returns the albums as a list of dictionaries |
| GET | /api/albums/:albumId | Query for an album by id and returns that album in a dictionary |
| DELETE | /api/albums/delete/:albumId | Handles deletion of an album by its id if the album is owned by current user |
| POST | /api/albums/new | Allows a user to create a new album |
| PUT | /api/albums/edit/:albumId | Handles editing an album's details if the album owner is the logged in user |
| GET | /api/songs | Queries for all songs and returns the songs as a list of dictionaries |
| GET | /api/songs/styles | Queries for all styles and returns the styles as a list of dictionaries |
| GET | /api/songs/current | Queries for all songs owned by the current user and returns the songs as a list of dictionaries |
| GET | /api/songs/:albumId | Query for a song by id and returns that song in a dictionary |
| POST | /api/songs/:songId/likes/:userId | Queries for a song and user, and, if the user has not liked that song, adds the user's like. Otherwise, the user's like is removed from the song |
| POST | /api/songs/new | Allows a logged in user to upload a new song |
| DELETE | /api/songs/delete/:albumId | Handles deletion of a song by its id if the song is owned by current user |
| POST | /api/songs/bulk | Allows a logged in user to upload multiple songs at once while creating an album |

### Technologies Used:
* [Python](https://docs.python.org/3/)
* [JavaScript](https://devdocs.io/javascript/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Flask](https://flask.palletsprojects.com/en/2.3.x/)
* [React](https://react.dev/)
* [Redux](https://redux.js.org/)

>>>>>>> d28e5d2f001c15797fca94faea51eddf7d20d1a1

## Landing Page
You can access the Login and Signup Modal here. Also, we have a demo user button for you to check the website.

**Home Page: [Vibillow](https://vibillow.onrender.com)**
<<<<<<< HEAD
=======

### Authors
+ [Saad Anwer](https://github.com/anwersaad0)
+ [Tommy Christenson](https://github.com/tchristenson)
+ [Josh Johnson](https://github.com/sousyoshi)
+ [Matt Meyer](https://github.com/meyermatt22)
>>>>>>> d28e5d2f001c15797fca94faea51eddf7d20d1a1
