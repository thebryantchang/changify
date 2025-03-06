import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTasks,fetchTasksByDueDate } from "../actions/tasks";

export const tasksSlice = createSlice({
    name:'tasks',
    initialState:{
        tasks:[],
        status:'idle',
        error: false
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllTasks.pending, state =>{
            state.status = 'loading'
        })
        .addCase(fetchAllTasks.fulfilled, (state,action)=>{
            state.status = 'succeeded';
            state.tasks = action.payload

        })
        .addCase(fetchAllTasks.rejected,(state,action)=>{
            state.status = 'failed',
            state.error = true
        })
        .addCase(fetchTasksByDueDate.pending, state =>{
            state.status = 'loading'
        })
        .addCase(fetchTasksByDueDate.fulfilled, (state,action)=>{
            state.status = 'succeeded';
            state.tasks = action.payload
        })
        .addCase(fetchTasksByDueDate.rejected, (state,action)=>{
            state.status = 'failed',
            state.error = true
        })
    }
})

export default tasksSlice.reducer