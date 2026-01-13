import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { Modal } from 'antd';
import AddExpenseModal from '../components/Modals/AddExpense';
import AddIncomeModal from '../components/Modals/AddIncome';
import { toast } from 'react-toastify';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';
import TransactionsTable from '../components/TransactionsTable';

const Dashboard = () => {
  // const transactions = [
  //   {
  //     type: "income",
  //     amount: 1200,
  //     tag: "salary",
  //     name: "income-1",
  //     date: "2025-01-15"
  //   },
  //   {
  //     type: "expense",
  //     amount: 200,
  //     tag: "food",
  //     name: "expense-1",
  //     date: "2025-01-16"
  //   },
  // ];

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("DD-MM-YYYY"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction added successfully!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to add transaction. Please try again.");
    }
  }

  useEffect(() => {
    // Get all docs from the collections
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        //doc.data() is never undefined for query doc snapshots
        transactionArray.push(doc.data());
      });
      setTransactions(transactionArray);
      console.log("Transaction Array", transactionArray);
      toast.success("Transactions fetched successfully!");
    }
    setLoading(false);
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
      <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
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
          <TransactionsTable transactions={transactions} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
