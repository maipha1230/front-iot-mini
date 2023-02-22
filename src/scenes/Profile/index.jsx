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
import {
  getUserSelf,
  updateUserSelft,
  uploadImage,
} from "../../services/apiService";
import LZString from "lz-string";
import { successAlert } from "../../services/sweetAlert";
import { API_URL } from "../../config/config";
import Resizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/reducers/profileSlice";

const profileSchema = yup.object().shape({
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is requried"),
});

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [imageProfile, setImageProfile] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [preview, setPreview] = useState(false);
  const [initialProfileForm, setInitialProfileForm] = useState({
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getUserSelf();
    if (res.status === 200) {
      setImageProfile(res.data.picture);
      setInitialProfileForm({
        firstname: res.data?.f_name,
        lastname: res.data?.l_name,
      });
    }
  };

  const onSubmitProfile = (values) => {
    updateUserSelft(values)
      .then((res) => {
        if (res.status === 200) {
          getUserSelf().then((res) => {
            if (res.status == 200) {
              dispatch(setProfile(res.data))
            }
          })
          successAlert(res.data.msg);
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onFileChange = (event) => {
    if (event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        // console.log(reader.result); //base64encoded string
        setImageProfile(reader.result);
        setPreview(true);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const onUploadClick = async () => {
    try {
      const formData = new FormData();
      formData.append("gallery", imageUpload);
      const res = await uploadImage(formData);
      if (res.status === 200) {
        getUserSelf().then((res) => {
          if (res.status == 200) {
            dispatch(setProfile(res.data))
          }
        })
        successAlert(res.data.msg);
        setPreview(false);
        setImageUpload(null);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={3} display="flex" flexDirection={"column"} gap="1.5rem">
      <Typography
        variant="h2"
        fontWeight={"bold"}
        color={colors.greenAccent[400]}
      >
        โปรไฟล์
      </Typography>
      <Box
        p={3}
        display={"flex"}
        flexDirection="column"
        gap={"1.5rem"}
        justifyContent="center"
        alignItems={"center"}
        sx={{ backgroundColor: colors.primary[400], borderRadius: "16px" }}
      >
        <label htmlFor="uploadProfile" style={{ cursor: "pointer" }}>
          <input
            type="file"
            id="uploadProfile"
            accept="image/png, image/jpg, image/jpeg"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
          <Box display="flex" justifyContent="center" alignItems="center">
            {imageProfile ? (
              <img
                alt="profile-user"
                width="150px"
                height="150px"
                src={preview ? imageProfile : `${API_URL}/${imageProfile}`}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  backgroundColor: colors.grey[100],
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  width: 150,
                  height: 150,
                }}
              />
            )}
          </Box>
        </label>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={onUploadClick}
          style={{ display: preview ? "block" : "none" }}
        >
          Upload Image Profile
        </Button>
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          sx={{ width: "60% " }}
        >
          <Formik
            onSubmit={onSubmitProfile}
            initialValues={initialProfileForm}
            validationSchema={profileSchema}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                </Grid>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  gap={"1rem"}
                  m={3}
                >
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={!isValid || !dirty}
                  >
                    Update
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
