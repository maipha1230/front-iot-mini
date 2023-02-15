import React, { useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Typography,
  TextField
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ToDo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [date, SetDate] = useState(new Date());

  const onDatePick = (newValue) => {
    SetDate(newValue);
  };
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      alignItems={"center"}
      gap="2rem"
    >
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography
          variant="h1"
          fontWeight={"bold"}
          color={colors.greenAccent[400]}
        >
          Todo-List
        </Typography>
        <Typography variant="h2" fontWeight={"bold"} color={colors.grey[100]}>
          Phathompong
        </Typography>
      </Box>
      <Box
        width={"60%"}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        gap={"2rem"}
      >
        <Box
          display={"flex"}
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          width={"full"}
        >
            <InputBase sx={{ ml: 2, flex: 1, height: 60 }} placeholder="add to do"></InputBase>
        </Box>
        <Box
          display={"flex"}
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date&Time picker"
              value={date}
              onChange={onDatePick}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
}

export default ToDo;
