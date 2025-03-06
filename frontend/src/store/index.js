import { configureStore } from "@reduxjs/toolkit";
import  TasksReducer  from "./reducers/tasks";

export const store = configureStore({
    reducer:{
        tasks: TasksReducer
    }
})