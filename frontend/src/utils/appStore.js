import {configureStore} from '@reduxjs/toolkit';
import userRouter from "./userSlice";
import feedReducer from './feedSlice';
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice"


const appStore= configureStore({
    reducer :{
        user: userRouter,
        // user:useReducer,
        feed:feedReducer,
        connections : connectionReducer,
        requests : requestReducer,

    },
});

export default appStore;