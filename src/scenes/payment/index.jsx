import React, { useEffect, useState } from 'react';
import { Table, Typography, Input, notification, Modal } from 'antd';
import api from '../../config/axios';

const { Search } = Input;

const Payment = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transaction/viewAllTransaction');
      setTransactions(response.data);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Could not fetch transactions. Please try again later.',
      });
    }
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      sorter: (a, b) => a.transactionId - b.transactionId,
    },
    {
      title: 'Amount',
      dataIndex: 'transactionAmount',
      render: (transactionAmount) => `${transactionAmount.toLocaleString()} VND`,
      sorter: (a, b) => a.transactionAmount - b.transactionAmount,
    },
    {
      title: 'Detail',
      dataIndex: 'details',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.transactionId.toString().includes(searchText)
  );

  return (
    <div style={{ padding: '24px' }}>
      <Typography.Title style={{color: 'white'}} level={4}>Transaction Management</Typography.Title>
      <Search
        placeholder="Search by Transaction ID"
        onSearch={(value) => setSearchText(value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table
        columns={columns}
        dataSource={filteredTransactions}
        rowKey="transactionId"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={`Transaction Details - ID: ${selectedTransaction?.transactionId}`}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedTransaction && (
          <div>
            <Typography.Paragraph>
              <strong>Transaction ID:</strong> {selectedTransaction.transactionId}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Amount:</strong> {selectedTransaction.amount.toLocaleString()} VND
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Date:</strong> {new Date(selectedTransaction.date).toLocaleString()}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Status:</strong> {selectedTransaction.status}
            </Typography.Paragraph>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Payment;
