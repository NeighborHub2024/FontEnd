import React, { useEffect, useState } from 'react';
import { Table, Typography, Input, Space, notification, Modal } from 'antd';
import api from '../../config/axios';
import {Row, Col } from 'antd';


const { Search } = Input;

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payment/viewAllPayment');
      setPayments(response.data);
    } catch (err) {
      setError('Error fetching payment data');
      notification.error({
        message: 'Error',
        description: 'Could not fetch payment data. Please try again later.',
      });
    }
  };

  const fetchBookingDetails = async (bookingId) => {
    try {
      const response = await api.get(`/booking/getBookingById/${bookingId}`);
      setSelectedBooking(response.data);
      setIsModalVisible(true);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Could not fetch booking details. Please try again later.',
      });
    }
  };

  // Define columns for the Ant Design table
  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      sorter: (a, b) => a.bookingId - b.bookingId,
      render: (text, record) => (
        <a onClick={() => fetchBookingDetails(record.bookingId)}>{text}</a>
      ),
    },
    {
      title: 'Payment Amount',
      dataIndex: 'paymentAmount',
      sorter: (a, b) => a.paymentAmount - b.paymentAmount,
      render: (amount) => `${amount.toLocaleString()} VND`,
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      sorter: (a, b) => new Date(a.paymentDate) - new Date(b.paymentDate),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      filters: [
        { text: 'isPaid', value: 'isPaid' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.paymentStatus.includes(value),
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actual Cost',
      dataIndex: 'actualCost',
      render: (cost) => `${cost.toLocaleString()} VND`,
      sorter: (a, b) => a.actualCost - b.actualCost,
    },
    {
      title: 'Actions ',
      dataIndex: 'actions',
      render: (text, record) => (
        <a onClick={() => fetchBookingDetails(record.bookingId)}>View</a>
      ),
    },
  ];

  // Filter payments based on search text
  const filteredPayments = payments.filter(payment =>
    payment.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Typography.Title level={4}>Payment Management</Typography.Title>
      <Search
        placeholder="Search by Description"
        onSearch={value => setSearchText(value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table
        columns={columns}
        dataSource={filteredPayments}
        rowKey="bookingId"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={`Booking Details - ID: ${selectedBooking?.bookingId}`}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedBooking && (
          <div style={{ padding: '24px', border: '1px solid #f0f0f0', borderRadius: '8px', backgroundColor: '#fff' }}>
        <Typography.Title level={4}>Booking Details</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
          <Typography.Paragraph>
              <strong>User ID:</strong> {selectedBooking.user.userId}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>User Booking:</strong> {selectedBooking.user.username}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>User Phone:</strong> {selectedBooking.user.phone}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Pickup Location:</strong> {selectedBooking.pickupLocation}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Dropoff Location:</strong> {selectedBooking.dropoffLocation}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Pickup Time:</strong> {new Date(selectedBooking.pickupTime).toLocaleString()}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Dropoff Time:</strong> {new Date(selectedBooking.dropoffTime).toLocaleString()}
            </Typography.Paragraph>
          </Col>
          <Col span={12}>
          <Typography.Paragraph>
              <strong>Driver ID:</strong> {selectedBooking.registration.driver.driverId}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Driver:</strong> {selectedBooking.registration.driver.username}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Vehicle Type:</strong> {selectedBooking.registration.vehicleType}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Distance:</strong> {selectedBooking.distance} km
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Payment Amount:</strong> {selectedBooking.amount.toLocaleString()} VND
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Booking Status:</strong> {selectedBooking.status === "0" ? "Pending" : "Completed"}
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
        )}
      </Modal>
    </div>
  );
};

export default Payment;
