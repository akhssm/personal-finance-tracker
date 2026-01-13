import React, { useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { Modal } from 'antd';

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  return (
    <div>
      <Header />

      <Cards
        showExpenseModal={() => setIsExpenseModalVisible(true)}
        showIncomeModal={() => setIsIncomeModalVisible(true)}
      />

      {/* Income Modal */}
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Income"
        open={isIncomeModalVisible}
        onCancel={() => setIsIncomeModalVisible(false)}
        footer={null}
        centered
      >
        Income
      </Modal>

      {/* Expense Modal */}
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Expense"
        open={isExpenseModalVisible}
        onCancel={() => setIsExpenseModalVisible(false)}
        footer={null}
        centered
      >
        Expense
      </Modal>
    </div>
  );
};

export default Dashboard;
