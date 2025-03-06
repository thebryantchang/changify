import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async({uid,token})=>{





    const response = await axios.get(`/api/tasks/gettasksbyuser/${uid}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
})

export const fetchTasksByDueDate = createAsyncThunk('tasks/fetchTasksByDueDate',async({uid,token})=>{
    const response = await axios.get(`/api/tasks/gettasksbyduedate/${uid}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
})