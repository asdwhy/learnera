## Code base structure

Within /doc there are various documentations provided each sprint

Within /src is the source code for the client and the server.
The client code is implemented with Node.js using the Angular 12 framework.
The server code is implemented with Node.js using the Express.js framework.

Within /src/client is a README.md that describes installation and setup process.
Within /src/server is a README.md that describes installation and setup process.

## Server architecture
Within index.js (the entry point of the application), the express server is setup on port 5000. The MongoDB is also setup at port 27017. The server receives http requests with body's encoded as JSON's.

Index.js uses routes for http requests in the routes directory.


## Client architecture
Within the angular project, the root of the html is found in app.component.html, and other important pages to note are the login page and landing page. These other pages use the RoutingModule by Angular, to route to a different page.

Within the /app folder in the client source code is where most of the code is written.
Within app there are directories for Angular Material components, our custom components, and services.


## API Endpoints
 ### POST /api/user/login
 @body: username String, password String
 @return:
 - 200 OK: A user was found matching the username password combination and a token is granted.
 - 401 UNAUTHORIZED: A user was not found matching the username password combination, so access is denied.
 
 
 ### POST /api/user/register
 @body: username String, password String, firstName String, lastName String OR companyName String, phone Number, ownerId String.
 @desc: Creates a BFS user. If authenticated as a BFS user, ability to create company accounts is enabled.
 @return:
 - 200 OK: A user is created with the information provided.
 

 ### GET /api/user/me  
 @body:   
 @return:
 - 200 OK: The information of the currently loged in user is provided as a response.


 ### PUT /api/user/updateuser  
 @body: email String, firstName String, lastName String  
 @return:
 - 200 OK: A user was found matching the token and the information is updated using the request body.
 - 400 BAD REQUEST: If the request is improperly formatted.
 - 401 UNAUTHORIZED: A user was not found matching the current token.
 

 ### POST /api/user/get-user  
 @body: uid String  
 @return:
 - 200 OK: User matching uid has been located and will be sent as a response.
 - 400 BAD REQUEST: If the uid field does not exist in the request.
 - 404 NOT FOUND: No users found with the specified uid.


 ### POST /api/user/logout
 @body: uid String
 @return:
 - 200 OK: JWT has been successfully removed from the database 
 - 401 Not Authenticated: User is not currently logged in
 - 500 INTERNAL SERVER: Error with the database query
 

 ### POST /api/comment/post  
 @body: id String, body String  
 @return:
 - 200 OK: Comment is successfully created and uploaded to the database.
 - 400 BAD REQUEST: If the request is improperly formatted.
 

 ### POST /api/comment/get-comments  
 @body: tid String  
 @return:
 - 200 OK: Comments matching tid has been located and will be sent as a response.
 - 400 BAD REQUEST: If the tid field does not exist in the request.
 - 404 NOT FOUND: No threads found with the specified tid.
 

 ### POST /api/thread/post  
 @body: title String, body String  
 @return:
 - 200 OK: Thread is successfully created and uploaded to the database.
 - 400 BAD REQUEST: If the request is improperly formatted.
 
 ### POST /api/thread/search  
 @body: query String  
 @return:
 - 200 OK: Threads with query matching a substring of the title have been located and will be sent as a response.
 - 400 BAD REQUEST: If the query field does not exist in the request.
 - 404 NOT FOUND: If no threads are found with query matching a substring of the title.
 

 ### POST /api/thread/get-thread  
 @body: tid String  
 @return:
 - 200 OK: Thread matching tid has been located and will be sent as a response.
 - 400 BAD REQUEST: If the tid field does not exist in the request.
 - 404 NOT FOUND: No threads found with the specified tid.


 ### GET /api/videos/get-categories  
 @body:  
 @return:
 - 200 OK: Sends the categories of E-Learning videos as the response body.
 

 ### POST /api/video/search  
 @body: query String  
 @return:
 - 200 OK: Threads with query matching a substring of the title have been located and will be sent as a response.
 - 400 BAD REQUEST: If the query field does not exist in the request.
 - 404 NOT FOUND: If no threads are found with query matching a substring of the title.
 
 
 ### POST /api/video/upload  
 @body: title String, body String  
 @return:
 - 200 OK: Video is successfully created and uploaded to the database.
 - 400 BAD REQUEST: If the request is improperly formatted.
 
 
 ### POST /api/video/get-video  
 @body: vid String  
 @return:
 - 200 OK: Video matching vid has been located and will be sent as a response.
 - 400 BAD REQUEST: If the vid field does not exist in the request.
 - 404 NOT FOUND: No threads found with the specified vid.
 
 
 ### POST /api/like/thread  
 @body: target String  
 @return:
 - 200 OK: Thread has successfully been liked or unliked
 - 400 BAD REQUEST: If the request is improperly formatted.
 
 
 ### POST /api/like/video  
 @body: target String  
 @return:
 - 200 OK: Video has successfully been liked or unliked
 - 400 BAD REQUEST: If the request is improperly formatted.
 
 
 ### POST /api/like/comment  
 @body: target String  
 @return:
 - 200 OK: Comment has successfully been liked or unliked
 - 400 BAD REQUEST: If the request is improperly formatted.
 
 
 ### POST /api/like/hasLiked  
 @body: target String  
 @return:
 - 200 OK: Return whether or not the user has liked a target thread/video/comment/etc
 - 400 BAD REQUEST: If the request is improperly formatted.
 

 ### POST /api/company/get-companies
 @body: uid String
 @return:
 - 200 OK: Companies owned by uid as a response
 - 400 BAD REQUEST: If the uid field does not exist in the request.
 - 404 NOT FOUND: No companies owned by the specified uid.


 ### POST /api/conference/post
 @body: title String, body String
 @return:
 - 200 OK: Conference is successfully created and uploaded to the database.
 - 400 BAD REQUEST: If the request is improperly formatted.


 ### POST /api/conference/search
 @body: query String
 @return:
 - 200 OK: Conference's that have not yet expired with query matching any substring of the title have been located, then sorted by expiry date, will be sent as a response.
 - 400 BAD REQUEST: If the query field does not exist in the request.
 - 404 NOT FOUND: If no non-expired conferences are found with query matching a substring of the title.


 ### POST /api/conference/get-conference
 @body: conId String
 @return:
 - 200 OK: Conference matching conId has been located and will be sent as a response.
 - 400 BAD REQUEST: If the conId field does not exist in the request.
 - 404 NOT FOUND: No conference found with the specified conId.


 ### POST /api/conference/signature
 @body: meetingNumber Number, role Number (0-1)
 @return:
 - 200 OK: signature created by the provided meetingNumber and role.
 - 400 BAD REQUEST: If the meetingNumber or role field does not exist in the request.
