import Navbar from "../nav";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchAllTasks,fetchTasksByDueDate } from "../../store/actions/tasks";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

    const token = Cookies.get("x-access-token");

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    const useless_string = "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await axios.get('/api/auth/isauth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch(fetchAllTasks({ uid: user.data._id, token }));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const deletetask = async (taskid) => {
        console.log(taskid);
        await axios.delete(`/api/tasks/deletetaskbyid/${taskid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // window.location.reload();
        const user = await axios.get('/api/auth/isauth', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      dispatch(fetchAllTasks({ uid: user.data._id, token }));
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 pt-20 pb-10 flex">
                <div className="w-1/4 bg-white p-6 rounded-lg shadow-md ml-6">
                    <h3 className="text-xl font-semibold mb-4">Sort By</h3>
                    <div className="relative mb-2">
                        <div className="block w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Date
                        </div>
                        <select
                            // Handle the onChange here for sorting
                            onChange={async(e)=>{
                              console.log(e.target.value)
                              if(e.target.value==="earliestCreationDate"){
                                console.log('sini')
                                try {
                                  const user = await axios.get('/api/auth/isauth', {
                                      headers: {
                                          Authorization: `Bearer ${token}`
                                      }
                                  });
                                  dispatch(fetchAllTasks({ uid: user.data._id, token }));
                              } catch (error) {
                                  console.log(error);
                              }
                                
                              }
                              if(e.target.value==="earliestDueDate"){
                                console.log('sana')
                                try {
                                  const user = await axios.get('/api/auth/isauth', {
                                      headers: {
                                          Authorization: `Bearer ${token}`
                                      }
                                  });
                                  dispatch(fetchTasksByDueDate({ uid: user.data._id, token }));
                              } catch (error) {
                                  console.log(error);
                              }
                              }
                            }}
                            className="absolute top-12 left-0 w-full bg-white text-black p-2 rounded-lg border border-gray-300 shadow-md"
                        >
                            <option value="earliestCreationDate">Earliest Creation Date</option>
                            <option value="earliestDueDate">Earliest Due Date</option>
                        </select>
                        
                    </div>
                    
                </div>
                <div className="max-w-4xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Task List</h2>
                    <div className="space-y-6">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className={`bg-gradient-to-r p-6 rounded-lg shadow-md border border-gray-300 transition-transform transform hover:scale-105 ${
                                    task.importance === "Low"
                                        ? "from-green-400 to-green-500"
                                        : task.importance === "Medium"
                                            ? "from-yellow-400 to-yellow-500"
                                            : task.importance === "High"
                                                ? "from-red-400 to-red-500"
                                                : task.importance === "Urgent"
                                                    ? "from-pink-400 to-pink-500"
                                                    : "from-indigo-400 to-indigo-500"
                                }`}
                            >
                                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                                <p className="text-gray-700 mb-2">{task.description}</p>
                                <p className="text-sm text-gray-500 mb-4">{task.details}</p>
                                <p className="text-sm text-gray-600 mb-4">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

                                {/* Importance at the top-right in a cool oval style */}
                                <p
                                    className={`absolute top-4 right-4 text-sm font-medium mb-4 px-4 py-2 rounded-full shadow-md ${
                                        task.importance === "Low"
                                            ? "bg-green-200 text-green-700"
                                            : task.importance === "Medium"
                                                ? "bg-yellow-200 text-yellow-700"
                                                : task.importance === "High"
                                                    ? "bg-red-200 text-red-700"
                                                    : task.importance === "Urgent"
                                                        ? "bg-pink-200 text-pink-700"
                                                        : "bg-indigo-200 text-indigo-700"
                                    }`}
                                >
                                    Importance: {task.importance}
                                </p>

                                {/* Category at the bottom left */}
                                <div className="absolute bottom-4 left-4">
                                    <span
                                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                            task.category === "School"
                                                ? "bg-blue-200 text-blue-700"
                                                : task.category === "Work"
                                                    ? "bg-green-200 text-green-700"
                                                    : task.category === "Private"
                                                        ? "bg-yellow-200 text-yellow-700"
                                                        : task.category === "Miscellaneous"
                                                            ? "bg-purple-200 text-purple-700"
                                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {task.category}
                                    </span>
                                </div>

                                <div className="flex justify-end items-end">
                                    <button
                                        onClick={() => deletetask(task._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
