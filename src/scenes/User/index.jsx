import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Typography,
  Grid,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { getUserList } from "../../services/apiService";
import { API_URL } from "../../config/config";

const User = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUserList()
      .then((res) => {
        setUserList(res.data);
      })
      .catch((error) => error.message);
  }, []);

  return (
    <Box p={3} display="flex" flexDirection={"column"} gap="1.5rem">
      <Typography
        variant="h2"
        fontWeight={"bold"}
        color={colors.greenAccent[400]}
      >
        ผู้ใช้งาน
      </Typography>
      <Box display={"grid"} gridTemplateColumns={"repeat(12, 1fr)"} gap="20px">
        {userList.map((user, index) => (
          <Box
            key={index}
            gridColumn={"span 3"}
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            padding={3}
            borderRadius={2.5}
            gap={"1.5rem"}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              {user.picture ? (
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`${API_URL}/${user.picture}`}
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
                    width: 100,
                    height: 100
                  }}
                >
                  <Typography
                    variant="h4"
                    color={colors.blueAccent[400]}
                    fontWeight="bold"
                  >
                    No Image
                  </Typography>
                </div>
              )}
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {user.f_name} {user.l_name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default User;
