import { Radio, Select, Table } from 'antd';
import React, { useState } from 'react';
import searchImg from '../../assets/search.svg';

function TransactionsTable({ transactions }) {
  const { Option } = Select;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Tag", dataIndex: "tag", key: "tag" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") return new Date(a.date) - new Date(b.date);
    if (sortKey === "amount") return a.amount - b.amount;
    return 0;
  });

  return (
    <div style={{ padding: "0 2rem", boxSizing: "border-box" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchImg} width="16" alt="search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
        </div>

        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value || "")}
          value={typeFilter}
          placeholder="All"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Radio.Group
            className="radio-group"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
          <button className="btn">Export to CSV</button>

          <label htmlFor="file-csv" className="btn btn-blue">
            Import from CSV
          </label>

          <input
            id="file-csv"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table columns={columns} dataSource={sortedTransactions} />
    </div>
  );
}

export default TransactionsTable;
