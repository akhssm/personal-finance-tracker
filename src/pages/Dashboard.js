import React, { useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { Modal } from 'antd';
import AddExpenseModal from '../components/Modals/AddExpense';
import AddIncomeModal from '../components/Modals/AddIncome';

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const onFinish = (values, type) => {
    console.log("On Finish", values, type);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  return (
    <div>
      <Header />

      <Cards
        showExpenseModal={() => setIsExpenseModalVisible(true)}
        showIncomeModal={() => setIsIncomeModalVisible(true)}
      />

      <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
    </div>
  );
};

export default Dashboard;
