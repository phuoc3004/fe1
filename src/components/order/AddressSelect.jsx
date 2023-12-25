import React, { memo } from "react";
import { Select, Form } from "antd";

const { Option } = Select;

const AddressSelecte = ({
  label,
  options,
  value,
  setValue,
  type,
  reset,
  name,
}) => {
  const handleChange = (selectedValue) => {
    !name
      ? setValue(selectedValue)
      : setValue((prev) => ({ ...prev, [name]: selectedValue }));
  };

  return (
    <Form.Item
      required={true}
      label={label}
      name={name}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Select
        value={reset ? undefined : value}
        onChange={handleChange}
        placeholder={`--Chọn ${label}--`}
        className="w-full"
      >
        <Option value={undefined}>{`--Chọn ${label}--`}</Option>
        {options?.map((item) => (
          <Option
            key={
              type === "province"
                ? item?.province_id
                : type === "district"
                ? item?.district_id
                : item?.code
            }
            value={
              type === "province"
                ? item?.province_id
                : type === "district"
                ? item?.district_id
                : item?.code
            }
          >
            {type === "province"
              ? item?.province_name
              : type === "district"
              ? item?.district_name
              : item?.value}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default memo(AddressSelecte);
