creating a basic Readme due to shortage of time.


To run the application
1. clone the project and cd into the folder.
2. Open terminal/cmd in the same directory.
3. type - npm install(will install all the external libraries used inside this project)
4. After the installation of the about command type node server.js(Entry file for this project)
flow of the application
1. signup
2. login
3. admin role can perform the following
    - add a user
    - remove a user
    - add a event
4. user role
    - fetch all the events(i am assuming it to be the front page of the application)
    - fetch all the events the user is interested in kind of a wishlist for events


5. Scope of improvement
    - Could have added enviroment variable for jwt secret.
    - Common json file for common strings such as "something went wrong"(for clean and modular code)
    - Could have added dynamic pagination(user input).
    - Could have added status codes if there are multiple cases of failure in a single API.
    - Could have added single return statement in case of if else ladder case or single point of exit.
    - Could have created a middleware for validating roles making the code easily changeable for any developer.
    - Could have added validations for all the remaining API's (added only for login and signup due to time constrains)