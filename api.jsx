import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://lwb.onrender.com",
});

// teacher signup
export const teacherSignup = (details) => {
  return baseApi.post(`/teacher/signup`, details).then((response) => {
    return response.data;
  });
};

//teacher signin
export const teacherSignin = (details) => {
  return baseApi.post(`/teacher/signin`, details).then((response) => {
    return response.data;
  });
};

// student signup
export const studentSignup = (details) => {
  return baseApi.post(`/student/signup`, details).then((response) => {
    return response.data;
  });
};

//teacher signin
export const studentSignin = (details) => {
  return baseApi.post(`/student/signin`, details).then((response) => {
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
  return baseApi
    .get(`/quiz`, {
      params: {
        schoolyear: yearQuery,
        subject: subjectQuery,
        teacher: teacherQuery,
      },
    })
    .then((response) => {
      return response.data;
    });
};

// GET QUIZ BY ID
<<<<<<< HEAD
export const getQuizById = (id)=>{
  return  baseApi.get(`/quiz/${id}`)
}
=======
export const getQuizById = (id) => {
  return baseApi.get(`/quiz/${id}`).then((response) => {
    return response.data;
  });
};
>>>>>>> main

// .catch((err) => {
//   setError(err.response.data.message);
// });

// POST new QUIZ

export const addQuiz = (newQuiz) => {
  return baseApi.post("/quiz", newQuiz).then((response) => {
    return response;
<<<<<<< HEAD
  })
}
// DELETE QUIZ BY ID

export const deleteQuizById = (id)=>{
  console.log(id, "<<<in api")
  return baseApi.delete(`/quiz/${id}`)
}
=======
  });
};
>>>>>>> main

//add videos

export const addVideo = (item) => {
  return baseApi.post(`/videos`, item).then((response) => {
    return response.data;
  });
};

// get videos
export const getAllVideos = (subject, teacher, year) => {
  let endPointString = "/videos";

  const queries = {};

  if (subject !== "") {
    queries.subject = subject;
  }
  if (teacher !== "") {
    queries.teacher = teacher;
  }
  if (year !== "") {
    queries.year = year;
  }
  return baseApi.get(endPointString, { params: queries }).then((response) => {
    return response.data;
  });
};

//get single video
export const getVideo = (id) => {
  return baseApi.get(`/videos/${id}`).then((response) => {
    return response.data;
  });
};

// get all events
export const getEvents = () => {
  return baseApi
    .get("/events")
    .then((response) => response.data.events)
    .catch((error) => {
      console.error("Error fetching events:", error);
      throw error;
    });
};

// post a new event
export const createEvent = (event) => {
  return baseApi
    .post("/events", {
      title: event.title,
      start: event.start,
      end: event.end,
      url: event.url,
    })
    .then((response) => response.data.newEvent)
    .catch((error) => {
      console.error("Error creating event:", error);
      throw error;
    });
};

//delete event by Id
export const deleteEvent = (eventId) => {
  return baseApi.delete(`/events/${eventId}`).catch((error) => {
    console.error("Error deleting event:", error);
    throw error;
  });
};

//patch event by Id
export const updateEvent = (eventId, updatedData) => {
  return baseApi.patch(`/events/${eventId}`, updatedData).catch((error) => {
    console.error("Error updating event:", error);
    throw error;
  });
};
