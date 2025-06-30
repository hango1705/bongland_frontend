import axios from "axios";
import { axiosJWT } from "./UserService";

// Determine the API URL based on the environment
const IS_LOCAL = process.env.REACT_APP_IS_LOCAL === 'true';
const apiUrl = IS_LOCAL 
  ? 'http://localhost:3001/api' 
  : (process.env.REACT_APP_API_URL || 'http://localhost:3001/api');

console.log('OrderService initialized with API URL:', apiUrl, {
  IS_LOCAL: IS_LOCAL,
  REACT_APP_IS_LOCAL: process.env.REACT_APP_IS_LOCAL,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL
});

// Add a utility function to check if the backend is reachable
export const checkBackendConnection = async () => {
  try {
    // Try to connect to a real endpoint with a short timeout
    console.log('Testing backend connection to:', apiUrl);
    
    // Try the product endpoint since it doesn't require authentication
    const res = await axios.get(`${apiUrl}/product/get-all-type`, { timeout: 3000 });
    console.log('Backend connection successful:', res.status);
    return true;
  } catch (error) {
    console.warn('Backend connection check failed:', error.message);
    return false;
  }
};

export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${apiUrl}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getOrderByUser = async (id, access_token) => {
  try {
    console.log('OrderService - getOrderByUser called with:', { 
      id, 
      hasAccessToken: !!access_token,
      apiUrl: `${apiUrl}/order/get-all-order/${id}`
    });

    // Try the user-specific endpoint first
    try {
      const res = await axiosJWT.get(
        `${apiUrl}/order/get-all-order/${id}`,
        {
          headers: {
            token: `Bearer ${access_token}`,
          },
        }
      );
      
      console.log('OrderService - API Response:', res.data);
      return res.data;
    } catch (error) {
      // Don't try the admin fallback - it requires admin privileges
      // Just throw the original error
      console.error('Error fetching user orders:', error);
      throw error;
    }
  } catch (error) {
    console.error('OrderService - Error:', error);
    throw error;
  }
};

export const getDetailsOrder = async (id, access_token) => {
  try {
    console.log('OrderService getDetailsOrder called with:', { id, access_token });
    const res = await axiosJWT.get(
      `${apiUrl}/order/get-details-order/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    console.log('OrderService response:', res.data);
    return res.data;
  } catch (error) {
    console.error('OrderService error:', error);
    throw error;
  }
};

export const cancelOrder = async (id, access_token, orderItems, userId) => {
  const res = await axiosJWT.delete(
    `${apiUrl}/order/cancel-order/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
      data: {
        orderItems,
        userId,
      },
    }
  );
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${apiUrl}/order/get-all-order`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyOrder = async (data, access_token) => {
  const res = await axiosJWT.post(`${apiUrl}/order/delete-many-order`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
