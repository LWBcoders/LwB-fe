import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://lwb.onrender.com",
});

// teacher signup
export const teacherSignup = (details) => {
    return baseApi
      .post(`/teacher/signup`, details)
      .then((response) => {
        return response.data;
      });
  };

//teacher signin
export const teacherSignin = (details) => {
    return baseApi
      .post(`/teacher/signin`, details)
      .then((response) => {
        return response.data;
      });
  };

  // student signup
export const studentSignup = (details) => {
    return baseApi
      .post(`/student/signup`, details)
      .then((response) => {
        return response.data;
      });
  };

  //teacher signin
export const studentSignin = (details) => {
    return baseApi
      .post(`/student/signin`, details)
      .then((response) => {
        return response.data;
      });
  };

//get all teachers
export const getTeachers = () => {
    return baseApi.get(`/teachers`).then((response) => {
      return response.data;
    });
  };

