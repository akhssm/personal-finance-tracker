import { Line, Pie } from "@ant-design/charts";
import React from "react";

function ChartComponent({ sortedTransactions }) {
  const lineData = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

    let finalSpendings = spendingData.map((acc, obj) => {
        let key = obj.tag;
        if (!acc[key]) {
            acc[key] = { tag: obj.tag, amount: obj.amount };
        } else {
            acc[key].amount += obj.amount;
        }
        return acc;
    }, {});

    let newSpendings = [
        { tag: "food", amount: 0 },
        { tag: "education", amount: 0 },
        { tag: "office", amount: 0 },
    ];

    spendingData.forEach((item) => {
        if (item.tag === "food") {
            newSpendings[0].amount += item.amount;
        } else if (item.tag === "education") {
            newSpendings[1].amount += item.amount;
        } else {
            newSpendings[2].amount += item.amount;
        }
    });

  const lineConfig = {
    data: lineData,
    width: 500,
    autofit: true,
    xField: "date",
    yField: "amount",
  };

  const pieConfig = {
    data: newSpendings,
    width: 500,
    autofit: true,
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div className="charts-wrapper">
      <div>
        <h2 style={{ marginTop: 0 }}>Your Analytics</h2>
        <Line {...lineConfig} />
      </div>

      <div>
        <h2>Your Spendings</h2>
        {spendingData.length > 0 ? (
          <Pie {...pieConfig} />
        ) : (
          <p>No expenses to show</p>
        )}
      </div>
    </div>
  );
}

export default ChartComponent;
