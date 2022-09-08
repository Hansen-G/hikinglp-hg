# Introduction

Welcome to the [Hikinglp](<https://hikinglp.herokuapp.com/>)!

This project [Hikinglp](<https://hikinglp.herokuapp.com/>) is a clone and innovation of Yelp. Hikinglp will allow users to sign up, create posts for National parks or other Hiking routes, post comments and likes, forward other users' posts, and follow other users. It also enabled OpenAI APIs to generate suggestions for possible options.


# Feature list document

## Signup and Login

1. You can login in if you already have an account or as the demo user.
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662652159/Hikinglp/3_idjtxj.png)

2. If you want to have your own account, please click sign up.
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662652158/Hikinglp/4_m9q5ga.png)

## Homepage

1. The homepage will display recommended Hiking destinations closest to you if you enable the location. If not, it will display random suggested destinations.
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662652163/Hikinglp/1_p57khp.png)

2. Hikinglp will also show recent user activity
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662652163/Hikinglp/2_fbcvhz.png)

## Creating a new Location

 1. Log In , Sign Up or Use the Demo User

 2. Click on 'Create a Location' in the Navbar

 3. Enter the loctaion information
 ![image](https://res.cloudinary.com/hansenguo/image/upload/v1662652157/Hikinglp/9_af6sl4.png)

## Edit Location

If you are the owner of a location, you can edit your location.

1. Click on your location
 ![image](https://res.cloudinary.com/hansenguo/image/upload/v1662653247/Hikinglp/12_bdvyuj.png)


2. Then click the 'Edit Location'

3. Edit Location Info
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662653249/Hikinglp/13_a9acab.png)

## Deleting Location

1. If you are the owner of a Location follow the previous instructions but click on the delete button

## Creating a Post

1. Log In , Sign Up or Use the Demo User

2. Click on 'Wirte a post
![image](<https://res.cloudinary.com/hansenguo/image/upload/v1662653399/Hikinglp/14_pva9ux.png>)

3. Write your post
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662653442/Hikinglp/15_p5sjsi.png)

## Edit a Post


1. Click on the ```...``` icon on your Post
2. Input the changes
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662653518/Hikinglp/16_rh7brz.png)
3. Click on 'Save Edit'
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662653521/Hikinglp/17_llkhje.png)


## Deleting a Comment

1. Click on the ```...``` icon on your Post
2. Click on Delete



## Talk with AI

1. Click on the 'Chat with Hikinglp AI' button

2. Type in your question
![image](https://res.cloudinary.com/hansenguo/image/upload/v1662652157/Hikinglp/11_lvlcdt.png)

3. Hikinglp will give you suggestions

## Loading

![image](https://res.cloudinary.com/hansenguo/image/upload/v1662133140/Hikinglp/Screen_Recording_2022-09-01_at_17_55_12_MOV_AdobeExpress_y187t2.gif)


# How to Install Application via Command Line

Go to [Repo](https://github.com/Hansen-G/hikinglp-hg)

 1. Copy Code Link

<img width="400" height="200" alt="Screenshot 2022-08-27 at 10 57 35 PM" src="https://user-images.githubusercontent.com/61948122/187086891-807e04bf-958a-4e59-b49e-becd86ee68a0.png">

 2. Open up terminal and input  ```git clone 'Link from github'``` in your desired folder.

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 26 04 AM" src="https://user-images.githubusercontent.com/61948122/187086901-56ef5245-0c0b-4bc8-9f5b-f33e21eaebce.png">

 3. Got to application by using ```cd /Folder Location```.

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 28 47 AM" src="https://user-images.githubusercontent.com/61948122/187086935-e1c719b6-30fe-4f6c-b95e-635d7ac94aaa.png">

 4. Open Up Code in your IDE by using code . in the location folder.

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 31 58 AM" src="https://user-images.githubusercontent.com/61948122/187087107-03c7ac45-2257-4044-aced-4a871f10414e.png">

 5. Open up the integrated terminal.

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 34 48 AM" src="https://user-images.githubusercontent.com/61948122/187087212-e1835cf3-9d7d-4a78-b8cd-dfe44e144b55.png">

 6. In one terminal instances run NPM Install in the ```/frontend``` directories.

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 37 16 AM" src="https://user-images.githubusercontent.com/61948122/187087321-da2f80dd-6aa2-4892-b364-60e517622b1b.png">

 7. In the backend terminal run: ```pipenv install```  then  ```pipenv run flask run``` then ```flask db init && flask db migrate && flask db upgrade```

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 38 21 AM" src="https://user-images.githubusercontent.com/61948122/187087365-5a944dc2-a695-4144-bb03-7308370d1e02.png">

 8. In the react-app folder create a .env file and and input ```SECRET_KEY='your-secret-key-goes-here' DATABASE_URL=sqlite:///dev.db```

<img width="400" height="300" alt="Screenshot 2022-08-28 at 10 39 14 AM" src="https://user-images.githubusercontent.com/61948122/187087391-acb9f5be-bd6f-4bec-b391-66cff64e6199.png">

 9. In the front end terminal run **npm start**

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 40 16 AM" src="https://user-images.githubusercontent.com/61948122/187087439-136799ea-2592-4d95-8416-59448c281400.png">

# Link to WIKI and additional information

[Wiki](https://github.com/Hansen-G/hikinglp-hg/wiki)

[Feature List](https://github.com/Hansen-G/hikinglp-hg/wiki/Feature-Lists)

[Database Schema](https://github.com/Hansen-G/hikinglp-hg/wiki/Database-Schema-with-Relationships)

[User Stories](https://github.com/Hansen-G/hikinglp-hg/wiki/User-Stories)

[Third party API](https://github.com/Hansen-G/hikinglp-hg/wiki/Third-party-API-Doc)

# Technologies used

### Backend

- Python
- Flask
- SQLAlchemy
- PostgreSQL
- WTForms
- Docker
- Heroku

### Frontend

- JavaScript
- React
- Redux
- CSS
- HTML



# To-dos/future features

- Using S3 for image upload with Flask
- Post Comments
- Album
- Search



# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


<br>

## Deploy to Heroku
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations. 

1. Write your Dockerfile. In order for the Github action to work effectively, it must have a configured Dockerfile. Follow the comments found in this [Dockerfile](./Dockerfile) to write your own!

2. Create a new project on Heroku.

3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".

4. Configure production environment variables. In your Heroku app settings -> config variables you should have two environment variables set:

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

5. Generate a Heroku OAuth token for your Github Action. To do so, log in to Heroku via your command line with `heroku login`. Once you are logged in, run `heroku authorizations:create`. Copy the GUID value for the Token key.

6. In your Github Actions Secrets you should have two environment variables set. You can set these variables via your Github repository settings -> secrets -> actions. Click "New respository secret" to create
each of the following variables:

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token (from step 6)|
   | `HEROKU_APP_NAME` | Heroku app name    |

7. Push to your `main` branch! This will trigger the Github Action to build your Docker image and deploy your application to the Heroku container registry. Please note that the Github Action will automatically upgrade your production database with `flask db upgrade`. However, it will *not* automatically seed your database. You must manually seed your production database if/when you so choose (see step 8).

8. *Attention!* Please run this command *only if you wish to seed your production database*: `heroku run -a HEROKU_APP_NAME flask seed all`

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |


