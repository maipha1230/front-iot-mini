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

const History = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return(
        <Box>
            
        </Box>
    ) 
}

export default History;