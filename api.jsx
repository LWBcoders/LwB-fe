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


// GET ALL SUBJECTS

export const getAllSubjects = () => {
  return baseApi.get(`/subjects`).then((response) => {
    return response.data;
  });
};

// GET ALL YEARS
export const getAllYears = () => {
  return baseApi.get(`/years`).then((response) => {
    return response.data;
  });
};


// GET ALL QUIZZES
export const getAllQuizzes = (yearQuery, subjectQuery, teacherQuery) => {
  return baseApi.get(`/quiz`, {params: {"schoolyear": yearQuery, "subject": subjectQuery, "teacher": teacherQuery}} ).then((response) => {
    return response.data;
  });
};

// GET QUIZ BY ID
export const getQuizById = (id)=>{
  return  baseApi.get(`/quiz/${id}`)
}

// .catch((err) => {
//   setError(err.response.data.message);
// });

// POST new QUIZ

export const addQuiz = (newQuiz)=>{
  return baseApi.post('/quiz', newQuiz).then((response)=>{
    return response;
  })
}
// DELETE QUIZ BY ID

export const deleteQuizById = (id)=>{
  console.log(id, "<<<in api")
  return baseApi.delete(`/quiz/${id}`)
}


  //add videos

  export const addVideo = (item) => {
    return baseApi.post(`/videos`, item).then((response) => {
      return response.data;
    });
  };

  // get videos
  export const getAllVideos = () => {
    return baseApi.get(`/videos`).then((response) => {
      return response.data;
    });
  };

   //get single video
   export const getVideo = (id) => {
    return baseApi.get(`/videos/${id}`).then((response) => {
      return response.data;
    });
  };
