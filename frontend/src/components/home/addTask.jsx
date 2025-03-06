import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../nav"

const AddTaskPage = () =>{

    

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
          title: '',
          description: '',
          details: '',
          importance: '',
          category: '',
          year: '',
          month: '',
          day: ''
        },
        validationSchema: Yup.object({
          title: Yup.string().required('Title is required'),
          description: Yup.string().required('Description is required'),
          details: Yup.string().required('Details are required'),
          importance: Yup.string().required('Importance is required'),
          category: Yup.string().required('Category is required'),
          year: Yup.number().required('Year is required').positive().integer(),
          month: Yup.number().required('Month is required').min(1).max(12),
          day: Yup.number().required('Day is required').min(1).max(31),
        }),
        onSubmit: async(values) => {
            // // Combine the month, day, and year into a JavaScript Date object
            // const dueDate = new Date(values.year, values.month - 1, values.day);
    
            // const taskData = {
            //     title: values.title,
            //     description: values.description,
            //     details: values.details,
            //     importance: values.importance,
            //     category: values.category,
            //     dueDate,
            //     userId, // Include userId
            // };
    
            // axios.post('/api/tasks', taskData)
            // .then(response => {
            //   console.log(response.data);
            //   // Handle success (e.g., show a success message or redirect)
            // })
            // .catch(err => {
            //   console.error(err);
            //   // Handle error (e.g., show error message)
            // });
            console.log(values)
            const token = Cookies.get("x-access-token")
            console.log(token)
            const user = await axios.get('/api/auth/isauth',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(user.data._id)
            const DateDue = new Date(values.year, values.month - 1, values.day);
            try{
                const task = await axios.post('/api/tasks/posttask',{
                    title: values.title,
                    description: values.description,
                    details: values.details,
                    importance: values.importance,
                    category: values.category,
                    creator: user.data._id,
                    dueDate: DateDue,
                    dayDue: values.day,
                    monthDue: values.month,
                    yearDue: values.year
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(task)
                formik.resetForm();
                alert("Task added successfully!");
            }catch(error){
                console.log(error)
            }
        },
      });
    

    return(
        <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 pt-20 pb-10">
      <div className="flex flex-col items-center space-y-8">
        {/* Task Form Container */}
        <div className="max-w-4xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Add Task</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-3 border border-gray-300 rounded-lg"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm">{formik.errors.title}</div>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                className="w-full p-3 border border-gray-300 rounded-lg"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm">{formik.errors.description}</div>
              )}
            </div>

            {/* Details Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Details</label>
              <textarea
                name="details"
                className="w-full h-32 text-lg p-4 border border-gray-300 rounded-lg"
                {...formik.getFieldProps("details")}
                />
              {formik.touched.details && formik.errors.details && (
                <div className="text-red-500 text-sm">{formik.errors.details}</div>
              )}
            </div>

            {/* Importance Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Importance</label>
              <select
                name="importance"
                className="w-full p-3 border border-gray-300 rounded-lg"
                {...formik.getFieldProps("importance")}
              >
                <option value="">Select Importance</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>

              </select>
              {formik.touched.importance && formik.errors.importance && (
                <div className="text-red-500 text-sm">{formik.errors.importance}</div>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    name="category" // Ensure this name is unique as well
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    {...formik.getFieldProps("category")}
                >
                <option value="">Select Category</option>
                <option value="School">School</option>
                <option value="Work">Work</option>
                <option value="Private">Private</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Others">Others</option>
            </select>
            {formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-sm">{formik.errors.category}</div>
            )}
            </div>

            {/* Due Date Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <div className="flex space-x-4">
                <select
                  name="year"
                  className="w-1/3 p-3 border border-gray-300 rounded-lg"
                  {...formik.getFieldProps("year")}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => 2025 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  name="month"
                  className="w-1/3 p-3 border border-gray-300 rounded-lg"
                  {...formik.getFieldProps("month")}
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  name="day"
                  className="w-1/3 p-3 border border-gray-300 rounded-lg"
                  {...formik.getFieldProps("day")}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
                </select>
              </div>
              {formik.errors.year && formik.touched.year && (
                <div className="text-red-500 text-sm">{formik.errors.year}</div>
              )}
              {formik.errors.month && formik.touched.month && (
                <div className="text-red-500 text-sm">{formik.errors.month}</div>
              )}
              {formik.errors.day && formik.touched.day && (
                <div className="text-red-500 text-sm">{formik.errors.day}</div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
    )
}

export default AddTaskPage