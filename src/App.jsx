import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import TopBar from "./scenes/TopBar"
import UserRoute from "./guard/UserRoute";
import UserBase from "./base/UserBase";
import SideBar from "./scenes/SideBar"
import Dashboard from "./scenes/Dashboard";
import Login from "./scenes/Login"
import { Routes, Route } from "react-router-dom";
function App() {
  const [theme, colorMode] = useMode();
  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <div className="app">
    //       <SideBar />
    //       <main className="content" style={{ minHeight: 1300 }}>
    //         <TopBar></TopBar>
    //         <Routes>
    //           <Route path="/login" element= {<Login/>} />
    //           <Route path="/" element= {<Dashboard/>} />
    //         </Routes>
            
            
    //       </main>
    //     </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
          <Routes>
            <Route path="/login" element= {<Login/>} />
            <Route element= {<UserRoute/>} >
              <Route path="/*" element={<UserBase />}></Route>
            </Route>
          </Routes>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
