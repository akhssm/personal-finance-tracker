import React from 'react';
// import transactions from "../assets/transactions.svg";

function NoTransactions() {
    return (
      <div 
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
            marginBottom: "2rem",
        }}
     >
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            You have No Transactions Currently.
        </p>
    </div>
    );
}

export default NoTransactions;