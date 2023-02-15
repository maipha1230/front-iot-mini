import { axiosInstance } from "./axiosInstance";

export const createUser = (user) => {
  return axiosInstance.post("/create-user", {
    username: user.username,
    password: user.password1,
    f_name: user.firstname,
    l_name: user.lastname,
  });
};

export const loginUser = (username, password) => {
  return axiosInstance.post("/login-user", {
    username: username,
    password: password
  })
}

export const getUserList = () => {
  return axiosInstance.get("/get-user-list")
}

export const getUserSelf = () => {
  return axiosInstance.get('/get-user-self')
}

export const updateUserSelft = (user) => {
  return axiosInstance.post('/update-user-self', user)
}

export const uploadImage = (formData) => {
  return axiosInstance.post('/user-upload-image-self', formData)
}

export const getData = () => {
  return axiosInstance.get('/get-data')
}

export const updateSplinkerStatus = (splinker_status) => {
  return axiosInstance.post('/update-splinker-status', { splinker_status: splinker_status })
}

export const getSplinkerStatus = () => {
  return axiosInstance.get('/get-splinker-status')
}


