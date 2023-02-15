import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { logoutAlert } from "../../services/sweetAlert";
import { useNavigate } from "react-router-dom";
function TopBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  const onLogoutClick = () => {
    logoutAlert().then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem('access-token')
        navigate("/login")
      }
    })
  } 

  return (
    <Box display={"flex"} justifyContent="space-between" p={2}>
      <Box display={"flex"} gap="1.5rem" alignItems="center">
        <CalendarMonthIcon />
        <Typography variant="h5">
          {date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Typography>
        <AccessTimeIcon />
        <Typography variant="h5">
          {date.toLocaleString("en-Us", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
          })}
        </Typography>
      </Box>
      <Box display={"flex"}>
        <IconButton onClick={ColorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={onLogoutClick} >
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TopBar;
