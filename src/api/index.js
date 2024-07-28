import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async (token) =>{
  const res= await  API.get("/user/dashboard", {
        headers: { authorization: token },
    });
   // console.log(res);
    return res.data;
  }

export const getWorkouts = async (token, date) => {
 const res=   await API.get(`/user/workouts${date}`, {
        headers: { authorization:  token },
    });
    // console.log(res);
    
    return res.data;
  }
    
    export const addWorkout = async (token, data) => {
        const res = await API.post(`user/workouts`, data, {
          headers: {
            authorization: token,
          },
        });
        return res.data;
      } 
    
    
