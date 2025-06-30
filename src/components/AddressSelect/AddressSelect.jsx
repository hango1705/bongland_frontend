import React, { useEffect, useState } from 'react';
import { Select, Alert, Button } from 'antd';
import { SelectContainer, SelectWrapper, SelectLabel } from './style';
import AddressService from '../../services/AddressService';

const AddressSelect = ({ onChange, defaultValues }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(defaultValues?.province || null);
  const [selectedDistrict, setSelectedDistrict] = useState(defaultValues?.district || null);
  const [selectedWard, setSelectedWard] = useState(defaultValues?.ward || null);
  const [loading, setLoading] = useState({ provinces: false, districts: false, wards: false });
  const [error, setError] = useState(null);

  const handleError = (error, type) => {
    console.error(`Error fetching ${type}:`, error);
    setError({
      type,
      message: error.message || `Failed to load ${type}. Please try again.`
    });
    setLoading({ ...loading, [type]: false });
  };

  const fetchProvinces = async () => {
    try {
      setLoading(prev => ({ ...prev, provinces: true }));
      setError(null);
      const res = await AddressService.getProvinces();
      if (res?.status === 'OK' && Array.isArray(res?.data)) {
        setProvinces(res.data);
      } else {
        throw new Error(res?.message || 'Invalid province data received');
      }
    } catch (error) {
      handleError(error, 'provinces');
    } finally {
      setLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const fetchDistricts = async (provinceCode) => {
    if (!provinceCode) return;
    try {
      setLoading(prev => ({ ...prev, districts: true }));
      setError(null);
      const res = await AddressService.getDistricts(provinceCode);
      if (res?.status === 'OK' && Array.isArray(res?.data)) {
        setDistricts(res.data);
      } else {
        throw new Error(res?.message || 'Invalid district data received');
      }
    } catch (error) {
      handleError(error, 'districts');
    } finally {
      setLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const fetchWards = async (districtCode) => {
    if (!districtCode) return;
    try {
      setLoading(prev => ({ ...prev, wards: true }));
      setError(null);
      const res = await AddressService.getWards(districtCode);
      if (res?.status === 'OK' && Array.isArray(res?.data)) {
        setWards(res.data);
      } else {
        throw new Error(res?.message || 'Invalid ward data received');
      }
    } catch (error) {
      handleError(error, 'wards');
    } finally {
      setLoading(prev => ({ ...prev, wards: false }));
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
      setSelectedDistrict(null);
      setSelectedWard(null);
      setWards([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (onChange) {
      const selectedProvinceName = provinces.find(p => p.code === selectedProvince)?.name;
      const selectedDistrictName = districts.find(d => d.code === selectedDistrict)?.name;
      const selectedWardName = wards.find(w => w.code === selectedWard)?.name;

      onChange({
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
        provinceName: selectedProvinceName,
        districtName: selectedDistrictName,
        wardName: selectedWardName
      });
    }
  }, [selectedProvince, selectedDistrict, selectedWard, provinces, districts, wards]);

  const handleRetry = () => {
    switch (error?.type) {
      case 'provinces':
        fetchProvinces();
        break;
      case 'districts':
        if (selectedProvince) fetchDistricts(selectedProvince);
        break;
      case 'wards':
        if (selectedDistrict) fetchWards(selectedDistrict);
        break;
      default:
        fetchProvinces();
    }
  };

  return (
    <SelectContainer>
      {error && (
        <Alert
          message={error.message}
          type="error"
          action={
            <Button size="small" type="primary" onClick={handleRetry}>
              Retry
            </Button>
          }
        />
      )}
      
      <SelectWrapper>
        <SelectLabel>Tỉnh/Thành phố</SelectLabel>
        <Select
          value={selectedProvince}
          onChange={setSelectedProvince}
          loading={loading.provinces}
          placeholder="Chọn Tỉnh/Thành phố"
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {provinces.map(province => (
            <Select.Option key={province.code} value={province.code}>
              {province.name}
            </Select.Option>
          ))}
        </Select>
      </SelectWrapper>

      <SelectWrapper>
        <SelectLabel>Quận/Huyện</SelectLabel>
        <Select
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          loading={loading.districts}
          placeholder="Chọn Quận/Huyện"
          disabled={!selectedProvince}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {districts.map(district => (
            <Select.Option key={district.code} value={district.code}>
              {district.name}
            </Select.Option>
          ))}
        </Select>
      </SelectWrapper>

      <SelectWrapper>
        <SelectLabel>Phường/Xã</SelectLabel>
        <Select
          value={selectedWard}
          onChange={setSelectedWard}
          loading={loading.wards}
          placeholder="Chọn Phường/Xã"
          disabled={!selectedDistrict}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {wards.map(ward => (
            <Select.Option key={ward.code} value={ward.code}>
              {ward.name}
            </Select.Option>
          ))}
        </Select>
      </SelectWrapper>
    </SelectContainer>
  );
};

export default AddressSelect; 