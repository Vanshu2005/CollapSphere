#CollapSphere Api

authRouter
post/signup
post/login
post/logout

profileRouter
get/profile/view
patch/profile/edit
patch/profile/password // forgot password api

connectionRequestRouter
post/request/send/instrested/:userId
post/request/send/ignored/:userId
post/request/review/accepted/:requestId
post/request/review/rejected/:requestId

userRouter
get/user/connections
get/user/requests
get/user/feed- get you the profiles of other users on platform

Status : ignore, intrested, accepted, rejected 