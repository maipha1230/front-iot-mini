import { useState } from "react";
import { ColorModeContext, useMode } from "../theme";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import TopBar from "../scenes/TopBar"
import SideBar from "../scenes/SideBar"
import Dashboard from "../scenes/Dashboard";
import Profile from "../scenes/Profile"
import History from "../scenes/History"
import User from "../scenes/User"
import { Routes, Route } from "react-router-dom";
function UserBase() {
  const [theme, colorMode] = useMode();
  return (
        <div className="app">
          <SideBar />
          <main className="content" style={{minHeight: "100vh"}}>
            <TopBar></TopBar>
            <Routes>
              <Route index  path="/" element= {<Dashboard/>} />
              <Route path="/dashboard" element= {<Dashboard/>} />
              <Route path="/history" element= {<History/>} />
              <Route path="/profile" element= {<Profile/>} />
              <Route path="/users" element= {<User/>} />
            </Routes>
          </main>
        </div>
  );
}

export default UserBase;
