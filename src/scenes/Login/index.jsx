import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { createUser, loginUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { successAlert } from "../../services/sweetAlert";

const initialLoginForm = {
  username: "",
  password: "",
};

const loginSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is requried"),
});

const initialRegisterForm = {
  username: "",
  firstname: "",
  lastname: "",
  password1: "",
  password2: "",
};

const registerSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  password1: yup.string().required("password is required"),
  password2: yup.string().required("confirm password is required"),
});

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);

  const onSubmitLogin = (values) => {
    loginUser(values.username, values.password).then((res) => {
        if (res.status == 200) {
            successAlert(res.data.msg)
            localStorage.setItem('access-token', res.data.token)
            navigate("/")
        } 
    })
  };

  const onSubmitRegisterForm = (values) => {
        if (values.password1 !== values.password2) {
            console.log("password not matches");
        } else [
            createUser(values).then((res) => {
                if (res.status == 201) {
                  successAlert(res.data.msg).then(() => {
                    setIsLoginPage(true)
                  })
                }
            }).catch(error => console.log(error))
        ]
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems={"center"}
      sx={{ height: "100%", width: "100%" }}
    >
      {isLoginPage && (
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
          p={1.5}
          gap="1.5rem"
          sx={{ width: "80%" }}
        >
          <Typography
            variant="h2"
            fontWeight={"bold"}
            color={colors.blueAccent[500]}
          >
            Login
          </Typography>
          <Formik
            onSubmit={onSubmitLogin}
            initialValues={initialLoginForm}
            validationSchema={loginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  gap={"1.5rem"}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"text"}
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"password"}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  ></TextField>
                  <Box
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                    gap={"1rem"}
                  >
                    <Button type="submit" color="secondary" variant="contained">
                      Login
                    </Button>
                    <Button
                      onClick={() => setIsLoginPage(false)}
                      color="neutral"
                      variant="contained"
                    >
                      Register
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}

      {!isLoginPage && (
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
          p={1.5}
          gap="1.5rem"
          sx={{ width: "80%" }}
        >
          <Typography
            variant="h2"
            fontWeight={"bold"}
            color={colors.blueAccent[500]}
          >
            Register
          </Typography>
          <Formik
            onSubmit={onSubmitRegisterForm}
            initialValues={initialRegisterForm}
            validationSchema={registerSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  gap={"1.5rem"}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"text"}
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"text"}
                    label="Firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                    name="firstname"
                    error={!!touched.firstname && !!errors.firstname}
                    helperText={touched.firstname && errors.firstname}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"text"}
                    label="Lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    name="lastname"
                    error={!!touched.lastname && !!errors.lastname}
                    helperText={touched.lastname && errors.lastname}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"password"}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password1}
                    name="password1"
                    error={!!touched.password1 && !!errors.password1}
                    helperText={touched.password1 && errors.password1}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"password"}
                    label="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password2}
                    name="password2"
                    error={!!touched.password2 && !!errors.password2}
                    helperText={touched.password2 && errors.password2}
                  ></TextField>
                  <Box
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                    gap={"1rem"}
                  >
                    <Button type="submit" color="secondary" variant="contained">
                      Register
                    </Button>
                    <Button
                      onClick={() => setIsLoginPage(true)}
                      color="neutral"
                      variant="contained"
                    >
                      Login
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
    </Box>
  );
};

export default Login;
