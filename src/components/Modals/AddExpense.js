import React from 'react';
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd';

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish
}) {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(
            { ...values, amount: Number(values.amount) },
            "expense"
          );
          form.resetFields();
        }}
      >
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the transaction name" },
          ]}
        >
          <Input className="custom-input" />
        </Form.Item>

        {/* Amount */}
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please enter the amount" },
            {
              validator: (_, value) =>
                value > 0
                  ? Promise.resolve()
                  : Promise.reject("Amount must be greater than 0"),
            },
          ]}
        >
          <Input
            type="number"
            min={1}
            className="custom-input"
            placeholder="₹"
          />
        </Form.Item>

        {/* Date */}
        <Form.Item
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date" },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>

        {/* Tag */}
        <Form.Item
          label="Tag"
          name="tag"
          rules={[
            { required: true, message: "Please select a tag" },
          ]}
        >
          <Select className="select-input">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn btn-blue">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;
