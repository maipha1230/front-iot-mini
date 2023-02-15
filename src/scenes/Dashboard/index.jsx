import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Typography,
  Grid,
  Switch,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { ResponsiveLine } from "@nivo/line";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getData, getSplinkerStatus, updateSplinkerStatus } from "../../services/apiService";
import { successToast } from "../../services/sweetAlert";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [humidData, setHumidData] = useState(0);
  const [tempData, setTempData] = useState(0);
  const [splinkerStatus, setSplinkerStatus] = useState(false);
  const [humidChart, setHumidChart] = useState();
  const [tempChart, setTempChart] = useState();

  useEffect(() => {
    getDhtTData();
    fetchSplinkerStatus();
    setInterval(() => {
      getDhtTData();
    }, 75000);
    setInterval(() => {
      fetchSplinkerStatus();
    }, 5000);
  }, []);

  const getDhtTData = async () => {
    try {
      const res = await getData();
      if (res.status === 200) {
        let data = res.data;
        data = data.reverse();
        let humid = [];
        let temp = [];
        let labels = [];
        for (let d of data) {
          labels.push(new Date(d.createdAt).toLocaleTimeString());
          humid.push(d.humid);
          temp.push(d.temp);
        }
        setHumidChart({
          labels: labels,
          backgroundColor: colors.grey[100],
          borderColor: colors.grey[100],
          pointBorderColor: colors.grey[100],
          datasets: [
            {
              label: "Humidity(%)",
              data: humid,
              fill: false,
              borderColor: colors.blueAccent[500],
              tension: 0.1,
            },
          ],
        });
        setTempChart({
          labels: labels,
          datasets: [
            {
              label: "Temperature(°C)",
              data: temp,
              fill: false,
              borderColor: colors.greenAccent[500],
              tension: 0.1,
            },
          ],
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchSplinkerStatus = async () => {
    try {
      const res = await getSplinkerStatus();
      if (res.status === 200) {
        setHumidData(res.data.humid);
        setTempData(res.data.temp);
        setSplinkerStatus(res.data.splinker_status);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const changeSplinkerStatus = async() => {
    try {
      const res =  await updateSplinkerStatus(!splinkerStatus)
      if (res.status === 200) {
        successToast(res.data.msg)
        fetchSplinkerStatus()
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Box p={3} display="flex" flexDirection={"column"} gap="1.5rem">
      <Typography
        variant="h2"
        fontWeight={"bold"}
        color={colors.greenAccent[400]}
      >
        แดชบอร์ด
      </Typography>
      <Box display={"grid"} gridTemplateColumns={"repeat(12, 1fr)"} gap="20px">
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2.5}
          gap={"1.5rem"}
        >
          <Typography variant="h3" color={colors.greenAccent[400]}>
            humidity(%)
          </Typography>
          <Typography
            variant="h1"
            fontWeight={"bold"}
            color={colors.blueAccent[400]}
          >
            {humidData == 0 ? "-" : humidData}
          </Typography>
        </Box>
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2.5}
          gap={"1.5rem"}
        >
          <Typography variant="h3" color={colors.greenAccent[400]}>
            Temperature(°C)
          </Typography>
          <Typography
            variant="h1"
            fontWeight={"bold"}
            color={colors.blueAccent[400]}
          >
            {tempData == 0 ? "-" : tempData}
          </Typography>
        </Box>
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2.5}
          gap={"1.5rem"}
        >
          <Typography variant="h3" color={colors.greenAccent[400]}>
            Sprinkler Status
          </Typography>
          <Typography
            variant="h1"
            fontWeight={"bold"}
            color={colors.blueAccent[400]}
          >
            {splinkerStatus == 1 ? "ON" : "OFF"}
          </Typography>
        </Box>
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2.5}
          gap={"1.5rem"}
        >
          <Typography variant="h3" color={colors.greenAccent[400]}>
            Sprinkler Controller
          </Typography>
          <Switch color="third" checked = { splinkerStatus == 1 ? true : false } onChange={changeSplinkerStatus} />
        </Box>
        <Box
          gridColumn={"span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2.5}
          gap={"1.5rem"}
        >
          <Typography variant="h3" color={colors.greenAccent[400]}>
            Humidity Chart
          </Typography>
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            p={"1.5rem"}
            sx={{
              borderRadius: "5px",
              backgroundColor: theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[800],
              width: "100%",
              height: "50vh",
            }}
          >
            {humidChart && <Line data={humidChart} />}
          </Box>
        </Box>
        <Box
          gridColumn={"span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2.5}
          gap={"1.5rem"}
        >
          <Typography variant="h3" color={colors.greenAccent[400]}>
            Temperature Chart
          </Typography>
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            p={"1.5rem"}
            sx={{
              borderRadius: "5px",
              backgroundColor: theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[800],
              width: "100%",
              height: "50vh",
            }}
          >
            {tempChart && <Line data={tempChart} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
