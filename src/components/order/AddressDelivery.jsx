import React, { memo, useEffect, useState } from "react";
import { Select, Form, Input, Col, Row } from "antd";
import AddressSelecte from "./AddressSelect";
import InputReadOnly from "./InputReadOnly";
import {
  apiGetPublicProvinces,
  apiGetPublicDistrict,
} from "../../api/province";

const AddressDelivery = ({ onUpdateAddress }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    const formattedAddress = ` ${
      district
        ? `${
            districts?.find((item) => item.district_id === district)
              ?.district_name
          },`
        : ""
    } ${
      province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : ""
    }`;

    setAddress(formattedAddress);
    // onUpdateAddress(formattedAddress);
  }, [province, district]);

  useEffect(() => {
    onUpdateAddress(`${homeAddress + "," + address}`);
  }, [homeAddress, address]);

  const handleChangeHomeAddress = (value) => {
    setHomeAddress(value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form style={{ width: 600 }} labelAlign="right">
        <h1>Địa chỉ giao hàng</h1>
        <div>
          <div>
            <AddressSelecte
              type="province"
              value={province}
              setValue={setProvince}
              options={provinces}
              label="Tỉnh/Thành phố"
            />
            <AddressSelecte
              reset={reset}
              type="district"
              value={district}
              setValue={setDistrict}
              options={districts}
              label="Quận/Huyện"
            />
            <Form.Item
              required={true}
              label="Địa chỉ nhà"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <Input
                onChange={(e) => handleChangeHomeAddress(e.target.value)}
              />
            </Form.Item>
          </div>
          {/* <InputReadOnly
            label="Địa chỉ chính xác"
            value={`${
              district
                ? `${
                    districts?.find((item) => item.district_id === district)
                      ?.district_name
                  },`
                : ""
            } ${
              province
                ? provinces?.find((item) => item.province_id === province)
                    ?.province_name
                : ""
            }`}
          /> */}
        </div>
      </Form>
    </div>
  );
};

export default memo(AddressDelivery);
