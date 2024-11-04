import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Typography,
  Modal,
  Input,
  notification,
  Space,
  Row,
  Col,
} from 'antd';
import api from '../../config/axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/booking/viewAllBooking');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Could not fetch bookings. Please try again later.'); // Set error message
      notification.error({ message: error }); // Ant Design notification for error
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (registration) => {
    setSelectedRegistration(registration);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRegistration(null);
  };

  function convertMetersToKilometers(meters) {
    return (meters / 1000).toFixed(1);
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={4}>Booking Management</Typography.Title>
      <Input
        placeholder="Search by User"
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      <Table dataSource={filteredBookings} rowKey="bookingId">
        <Table.Column title="Booking ID" dataIndex="bookingId" />
        <Table.Column title="User" dataIndex={['user', 'username']} />
        <Table.Column title="Ngày đặt" render={(text, booking) => formatDateTime(booking.pickupTime)} />
        <Table.Column title="Status" dataIndex="status" />
        <Table.Column
          title="Registration"
          render={(text, booking) => (
            booking.registration ? (
              <Button type="primary" onClick={() => handleOpenModal(booking)}>
                View Registration
              </Button>
            ) : (
              'No Registration'
            )
          )}
        />
        <Table.Column
          title="Distance"
          render={(text, booking) => `${convertMetersToKilometers(booking.distance)} km`}
        />
        <Table.Column
          title="Actions"
          render={(text, booking) => (
            <Space>
              <Button type="primary" style={{ marginRight: '10px' }}>Edit</Button>
              <Button type="danger">Cancel</Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="Registration Details"
        visible={openModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal} type="primary">
            Close
          </Button>,
        ]}
      >
        {selectedRegistration && (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Typography.Text strong>License Plate:</Typography.Text>
              <Typography.Text>{selectedRegistration.registration.licensePlate}</Typography.Text>
              <br />
              <Typography.Text strong>Vehicle Type:</Typography.Text>
              <Typography.Text>{selectedRegistration.registration.vehicleType}</Typography.Text>
              <br />
              <Typography.Text strong>Driver's License:</Typography.Text>
              <Typography.Text>{selectedRegistration.registration.driversLicenseNumber}</Typography.Text>
              <br />
              <Typography.Text strong>Owner Name:</Typography.Text>
              <Typography.Text>{selectedRegistration.registration.driver.username}</Typography.Text>
            </Col>
            <Col span={12}>
              <Typography.Text strong>Owner Phone:</Typography.Text>
              <Typography.Text>{selectedRegistration.registration.driver.phone}</Typography.Text>
              <br />
              <Typography.Text strong>Owner Email:</Typography.Text>
              <Typography.Text>{selectedRegistration.registration.driver.email}</Typography.Text>
              <br />
              <Typography.Text strong>Average Rating:</Typography.Text>
              <Typography.Text>{selectedRegistration.registration.driver.averageRating}</Typography.Text>
              <br />
              <Typography.Text strong>Health Check Date:</Typography.Text>
              <Typography.Text>{selectedRegistration.registration.healthCheckDay}</Typography.Text>
            </Col>
            <Col span={12}>
              <Typography.Text strong>User Booking:</Typography.Text>
              <Typography.Text>{selectedRegistration.user.username}</Typography.Text>
              <br />
              <Typography.Text strong>Phone:</Typography.Text>
              <Typography.Text>{selectedRegistration.user.phone}</Typography.Text>
              <br />
              <Typography.Text strong>Mail:</Typography.Text>
              <Typography.Text>{selectedRegistration.user.email}</Typography.Text>
            </Col>
            <Col span={12}>
              <Typography.Text strong>Pickup Location:</Typography.Text>
              <Typography.Text>{selectedRegistration.pickupLocation}</Typography.Text>
              <br />
              <Typography.Text strong>Drop Off Location:</Typography.Text>
              <Typography.Text>{selectedRegistration.dropoffLocation}</Typography.Text>
              <br />
              <Typography.Text strong>Pickup Time:</Typography.Text>
              <Typography.Text>{formatDateTime(selectedRegistration.pickupTime)}</Typography.Text>
            </Col>
          </Row>
        )}
      </Modal>

      {/* Error notification */}
      {error && notification.error({ message: error })}
    </div>
  );
};

export default Bookings;
