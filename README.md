## Setup
This site can be visited on the link bellow. It is also possible to run it locally. The user then needs to run the back-end as well or configure the app to use the running back-end, the link to that is also bellow. 

### Run locally
Users then need to clone the repo using git.<br/><br/>
     &nbsp;&nbsp;&nbsp;$ git clone https://github.com/freyrdanielsson/footlong-client.git<br/><br/>
They then need to install the packages that the application needs. This can be done using either npm or yarn. They need to navigate to the git repo first using:<br/><br/>
    &nbsp;&nbsp;&nbsp;$ cd footlong-client<br/><br/>
Then install the packages using either of the two:<br/><br/>
    &nbsp;&nbsp;&nbsp;$ npm install<br/><br/>
    &nbsp;&nbsp;&nbsp;$ yarn install<br/><br/>
Users then need to create a .env file and add to it:<br/><br/>
    &nbsp;&nbsp;&nbsp;REACT_APP_SERVICE_URL=<link to back-end><br/><br/>
If user have cloned the backend and are running it locally then the link will be to localhost and then the port it is running on (3001 if nothing was changed in the back-end code). If not then the link should be to the running API link listed below. 
Lastly, to start the application, users need to run either of the two, depending on prefrence:<br/><br/>
Since this is running locally, users also need to add REACT_APP_RAPID_API_KEY and REACT_APP_RAPID_API_HOST to the .env file. The host should be 'api-football-v1.p.rapidapi.com' but users need to get their own key from https://rapidapi.com/ to be able to recieve data from the API. <br /><br/>
    &nbsp;&nbsp;&nbsp;$ npm run start<br/><br/>
    &nbsp;&nbsp;&nbsp;$ yarn run start<br/><br/>
The application then start running on localhost on port 3000.

## Short description of project
Get information on the major leagues in football using the API-football. Users will have access to all the data concerning leagues, teams and players. Where available, highlights from recent games will be made available. Visitor on the site can see teams that users have created. The teams consist of real players from the leagues avilable on the site. Visitor can also signup to create an account and can then create their own team.

## What we have done
The project requires 2 APIs, one for football information and one for highlight. Users also need to be able to sign up and sign in and save some persistent data. To handle this we created our own back-end that comunicates with these APIs as well as handling the user data and authentication.
The backend code can be found here: https://github.com/arnar44/iprogBackend
The front-end uses redux to keep track of the state that it is in. 
Here is a list of activities that are possible on the site:

### Home Page - '/'
Initially this page displays fixture going on in the leagues on the current date. Users can change the date and look at fixtures on other days. Since ccovid-19 is still going strong there aren't any maches going on currently so we recommend going back to the 9th of November, that date had a lot of matches with a lot of events occuring.
Users can click on any of the fixtures displayed so see in more detail. If this is a match that has started and/or finished users will see that activities and stats from that match displayed.

### Highlights - '/higlights'
Here all the highlights from all the latest matches are displayed. Users can scroll down the site to see what highlights are available and watch the on the site.

### Dream Team - '/teams'
Here users can view custom teams that other users have created. If the user has created a team, those teams will be highlighted green in the list of teams. Clicking a team will display the team, its players, formation and when it was last edited. If the user owns the team he is viewing he has the option to edit that team.

### Authentication - '/login' and '/register'
Here users can login to their account or they can go to register a new account.

### Profile - '/profile'
This is the users profile site. Here he can view his profile information as well as changing it if he would like to. The users list of custom teams is also displayed here so he can have an overview of his teams. This is also where users can create their own teams.

### Create team - '/profile/edit/:id'
This is where users make changes to their teams. Users can search for players in the leagues and teams the site offers. Users can change the formation of their team as well as adding players and/or changing player positions. To add a player, a user needs to click a player in the list that is yielded when he searches for players. To change a players position the user needs to click that player in their team. 

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

