## Short description of project
Get information on the major leagues in football using the API-football. Users will have access to all the data concerning leagues, teams and players. Where available, this data will be combined with data from the fantasy-API, giving additional information concerning the Premier League fantasy standings. Also, where available, highlights from recent games will be made available.

## What we have done
Since this project requires 3 APIs (football information, fantasy information and highlights) as well as needing authentication for users that will create a profile, we decided to make a backend that makes the calls to the APIs and handles the users and authentication. What is ready on the backend is registering users, login in, getting registered users and some other small functionality. It also calls the API that provides highlights and returns the highlights. 
On the front end the skeleton is completely ready including the redux store. The front page shows mock data currently until our backend is ready, but the /highlights is displaying data from the API. 
We have also made a prototype design for some of the pages since it makes the programming easier if you already know how it is supposed to look like.

## What we plan to do
We plan on finishing the back end. It will make API calls and we will manipulate the data there a little bit. The front-end will then be able to make easy calls to our API. We are planning to finish the site which means displaying the data on the front page as well as the other pages such as /teams and /league. We will also make some custom functionality that is required like notifications for users when their team is playing. 
We also still must finish designing some of the smaller pages and designing some details on the pages that we have a design for.

## Project file structure
Public folder is for static content for the application such as the logo image.
Reducers are in the reducer’s directory; the name of the file indicates what part of the state it handles. There then is an action which has a matching name for each reducer in the action directory. 
The route directory contains a file for each of the domains on the application. 
The building block of the application is components and the components will be kept in the component directory. 

## Links
Our application:
http://footlong.herokuapp.com/
Our API:
https://iprogbackend.herokuapp.com/

## Tasks
# Sprint 1
- [X] Setup frontend environment **[Freyr]**
    - [X] Dependencies
    - [X] Linters
    - [X] Code architecture
    - [X] Store management
    - [X] Receive highlight api data
- [X] Setup backend environment **[Arnar]**
    - [X] Connect to apis
    - [X] Configure for heroku hosting
    - [X] Send highlight api data
    - [X] Code architecture
    - [X] Add input validation code


4
