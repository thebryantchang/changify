import React from "react"
import axios from "axios";
import {useFormik, validateYupSchema} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const SignInForm = () => {
    const navigate = useNavigate()

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      }),
      onSubmit: async(values) => {

        try {
            const response = await axios.post('/api/auth/signin', {
              username: values.username,
              password: values.password,
            }, {
              withCredentials: true, // Important to allow cookies to be set
            });
            
            // console.log('Sign-in success:', response.data);
            navigate('home')
            // Redirect or show success message
          } catch (error) {
            console.error('Sign-in failed:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message )
          }
      },
    });
  
    return (
      
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-8">
            {/* Welcome to Changify Heading */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center w-[250px] or h-[150px]">
              <h3 className="text-3xl font-bold font-[Poppins] text-gray-800">
                Welcome to 
              </h3>
              <h1 className="text-5xl font-bold font-[Poppins] text-gray-800 signature">
                Changify
              </h1>
            </div>
    
            {/* Sign In Form */}
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md ">
              <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    {...formik.getFieldProps("username")}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
        
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  Sign In
                </button>
              </form>
              {/* Hyperlink to Register Page */}
              <div className="text-right mt-4"> {/* Added text-right and margin-top */}
                <Link
                  to="/register" // Replace with your register route
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Don't have an account? Register Now!
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default SignInForm;