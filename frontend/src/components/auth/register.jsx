import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { useFormik } from 'formik'; // Formik for form handling
import * as Yup from 'yup'; // Yup for validation schema
import axios from 'axios'; // Axios for API calls

const RegisterPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/auth/register', {
          email: values.email,
          username: values.username,
          password: values.password,
        }, {
          withCredentials: true, // Allow cookies to be set
        });

        console.log('Registration success:', response.data);
        navigate('/'); // Redirect to home page after successful registration
      } catch (error) {
        console.error('Registration failed:', error.response?.data?.message || error.message);
        alert(error.response?.data?.message || 'Registration failed. Please try again.');
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

        {/* Register Form */}
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md relative">
          <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            {/* Username Field */}
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

            {/* Password Field */}
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

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </form>

          {/* Hyperlink to Sign-In Page */}
          <div className="text-right mt-4">
            <Link
              to="/" // Replace with your sign-in route
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;