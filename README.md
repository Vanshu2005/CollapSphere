 CollapSphere

A full-stack platform built to understand how modern applications manage authentication, user identity, relationship workflows, and secure API access.



 Problem

Most beginner projects stop at:

* Login
* CRUD
* Store data
* Display UI

I wanted to move one layer deeper and build the parts users don't see but real systems depend on.

Examples:

* How is identity verified?
* How are sessions maintained?
* How do two users become connected?
* How do we prevent invalid interactions?
* How do APIs decide who can access what?



 What I Built

Identity Layer

Users can register and authenticate securely.

Implemented:

* Password hashing using bcrypt
* JWT-based authentication
* Cookie-based session handling
* Protected route middleware


Implemented:

* Send connection requests
* Accept requests
* Reject requests
* Ignore requests
* Prevent self-connections



# Request Lifecycle

```text
Client Request
      ↓
Authentication Middleware
      ↓
Token Validation
      ↓
Business Logic
      ↓
Database Layer
      ↓
Response
```


 Stack

Frontend
React.js

Backend
Node.js
Express.js

Database
MongoDB
Mongoose

Security
JWT
bcrypt


 Next Version

* Real-time interactions
* Recommendation engine
* Notifications
* Observability
* Deployment pipeline



Built and maintained by Vanshika Agrawal
