import axios from "axios";

// Determine the API URL based on the environment
const IS_LOCAL = process.env.REACT_APP_IS_LOCAL === 'true';
const API_URL = IS_LOCAL 
  ? 'http://localhost:3001/api' 
  : process.env.REACT_APP_API_URL;

/**
 * Service for handling address-related API calls
 */
class AddressService {
  static async getProvinces() {
    try {
      const res = await axios.get(`${API_URL}/address/provinces`);
      return res.data;
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return {
        status: "ERR",
        message: "Failed to fetch provinces. Please try again later.",
        error: error.response?.data || error.message
      };
    }
  }

  static async getDistricts(provinceCode) {
    try {
      if (!provinceCode) {
        throw new Error('Province code is required');
      }
      const res = await axios.get(`${API_URL}/address/districts/${provinceCode}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching districts:', error);
      return {
        status: "ERR",
        message: "Failed to fetch districts. Please try again later.",
        error: error.response?.data || error.message
      };
    }
  }

  static async getWards(districtCode) {
    try {
      if (!districtCode) {
        throw new Error('District code is required');
      }
      const res = await axios.get(`${API_URL}/address/wards/${districtCode}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching wards:', error);
      return {
        status: "ERR",
        message: "Failed to fetch wards. Please try again later.",
        error: error.response?.data || error.message
      };
    }
  }

  static async getFullAddress(addressCodes) {
    try {
      if (!addressCodes?.provinceCode || !addressCodes?.districtCode || !addressCodes?.wardCode) {
        throw new Error('All address codes are required');
      }
      const res = await axios.post(`${API_URL}/address/full-address`, addressCodes);
      return res.data;
    } catch (error) {
      console.error('Error fetching full address:', error);
      return {
        status: "ERR",
        message: "Failed to fetch full address. Please try again later.",
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Helper method to format address components into a string
   * @param {Object} address - Address object containing province, district, ward, and detail
   * @returns {string} Formatted address string
   */
  static formatAddress(address) {
    if (!address) return '';
    
    const components = [];
    if (address.detail) components.push(address.detail);
    if (address.ward) components.push(address.ward);
    if (address.district) components.push(address.district);
    if (address.province) components.push(address.province);
    
    return components.join(', ');
  }
}

export default AddressService; 