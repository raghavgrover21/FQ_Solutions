creating a basic Readme due to shortage of time.

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
    - Common json file for common strings such as "something went wrong"(clean and modular code)
    - Could have added dynamic pagination(the page limit and offset could have been dependent on front end requirement/ depending on the device the user is using).
    - Could have added status codes if there are multiple cases of failure in a single API
    - Could have added single return statement in case of if else ladder case or single point of exit.
    - Could have created a middleware for validating roles making the code easily changeable for any developer.
    - Could have added validations for the entire all the remaining API's (added only for login and signup)
    - Could have written validations on my own logic using regex and basic if else(if needed)