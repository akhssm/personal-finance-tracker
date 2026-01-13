import { Table } from 'antd';
import React, { useState } from 'react'

function TransactionsTable({ transactions }) {
    const [search, setSearch] = useState("");
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Tag",
            dataIndex: "tag",
            key: "tag",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        }
    ];

    let filteredTransactions = transactions.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <>
      <input
        value={search}
        onChange ={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
      />
      <Table dataSource={filteredTransactions} columns={columns} />
    </>
    )
}

export default TransactionsTable
