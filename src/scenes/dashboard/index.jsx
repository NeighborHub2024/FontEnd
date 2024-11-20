import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Header,
  StatBox,
  LineChart,
  ProgressCircle,
  BarChart,
  GeographyChart,
} from "../../components";
import {
  DownloadOutlined,
  Email,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { formattedAmount } from "../../utils/convert";

function Dashboard() {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [totalTransactionAmount, setTotalTransactionAmount] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  const fetchBookings = async () => {
    try {
      const response = await api.get('/booking/viewAllBooking');
      console.log(response.data);
      setTotalBookings(response.data.length);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get("/user/getTotalClients");
      setTotalUser(response.data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await api.get("/transaction/viewAllTransaction");
      const sum = response.data.filter(t => t.status === "Completed").reduce((a, b) => a + b.transactionAmount, 0)
      setTotalTransactionAmount((sum));
      setTotalPayment(response.data.filter(t => t.status === "Completed").length);
      setTransaction(response.data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchContacts();
    fetchPayments();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {!isXsDevices && (
          <Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: colors.blueAccent[700],
                color: "#fcfcfc",
                fontSize: isMdDevices ? "14px" : "10px",
                fontWeight: "bold",
                p: "10px 20px",
                mt: "18px",
                transition: ".3s ease",
                ":hover": {
                  bgcolor: colors.blueAccent[800],
                },
              }}
              startIcon={<DownloadOutlined />}
            >
              DOWNLOAD REPORTS
            </Button>
          </Box>
        )}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Statistic Items */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalBookings}
            subtitle="Total Bookings"
            icon={
              <Email
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPayment}
            subtitle="Total Transaction Completed"
            icon={
              <PointOfSale
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalUser}
            subtitle="Total Clients"
            icon={
              <PersonAdd
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ---------------- Row 2 ---------------- */}

        {/* Transaction Data */}
        <Box
          gridColumn={isXlDevices ? "span 6" : "span 4"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>

          {transaction.sort((a, b) => b.transactionId - a.transactionId).map((transaction, index) => (
            <Box
              key={`${transaction.transactionId}-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="20px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {'ID:' + transaction.transactionId + '- Sđt: ' + transaction.user.phone}
                </Typography>
                <Typography color={colors.gray[100]}>
                  {transaction.user.username}
                </Typography>
              </Box>
              <Typography color={colors.gray[100]}>
                {transaction.details}
              </Typography>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="8px 12px"
                borderRadius="4px"
              >
                {formattedAmount(transaction.transactionAmount)} VNĐ
              </Box>
            </Box>
          ))}
        </Box>

        {/* Revenue Details */}
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 2"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress={totalTransactionAmount/10000000} size="125" />
            <Typography
              textAlign="center"
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {formattedAmount(totalTransactionAmount)} VNĐ revenue generated
            </Typography>
            <Typography textAlign="center">
              This include all the transaction Completed. Target 10.000.000 VNĐ
            </Typography>
          </Box>
        </Box>

        {/* Geography Chart */}
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 2"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography variant="h5" fontWeight="600" mb="15px">
            Geography Based Traffic
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="200px"
          >
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
