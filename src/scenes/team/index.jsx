import React, { useState, useEffect } from "react";
import { Table, Tag, Button, message } from "antd";
import { getRegistrationForms, acceptRegistrationForm } from "../../services/registrationService";
import { Box } from "@mui/material";
import { Header } from "../../components";

const Team = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getRegistrationForms();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (registrationId) => {
    try {
      await acceptRegistrationForm(registrationId);
      message.success("Registration accepted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to accept registration");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "registrationId",
      key: "registrationId",
    },
    {
      title: "Biển số xe",
      dataIndex: "licensePlate",
      key: "licensePlate",
    },
    {
      title: "Loại xe",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    {
      title: "Giáy phép lái xe",
      dataIndex: "driversLicenseNumber",
      key: "driversLicenseNumber",
    },
    {
      title: "Tài xế",
      key: "driver",
      render: (text, record) => (
        <div>
          <p>{record.driver.username}</p>
          <p>{record.driver.phone}</p>
          <p>{record.driver.email}</p>
        </div>
      ),
    },
    {
      title: "Ngày kiểm tra sức khỏe",
      dataIndex: "healthCheckDay",
      key: "healthCheckDay",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, { status }) => {
        let color = status === 1 ? "green" : "red";
        return <Tag color={color}>{status === 1 ? "Accepted" : "Pending"}</Tag>;
      },
    },
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleAccept(record.registrationId)}
          disabled={record.status === 1} // Disable button if already accepted
        >
          Accept
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Phương tiện" subtitle="Quản lý phương tiện" />
      <Box mt="40px">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="registrationId"
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default Team;
