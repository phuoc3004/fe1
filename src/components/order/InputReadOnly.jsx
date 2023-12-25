import React from "react";
import { Form, Input } from "antd";

const InputReadOnly = ({ label, value }) => {
  return (
    <Form>
      <Form.Item label={label} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Input readOnly value={value || ""} />
      </Form.Item>
    </Form>
  );
};

export default InputReadOnly;
