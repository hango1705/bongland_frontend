import axios from "axios";

export const axiosJWT = axios.create();

// Determine the API URL based on the environment
const IS_LOCAL = process.env.REACT_APP_IS_LOCAL === 'true';
const apiUrl = IS_LOCAL 
  ? 'http://localhost:3001/api' 
  : process.env.REACT_APP_API_URL;

export const loginUser = async (data) => {
  const res = await axios.post(`${apiUrl}/user/sign-in`, data);
  return res.data;
};
export const signupUser = async (data) => {
  const res = await axios.post(`${apiUrl}/user/sign-up`, data);
  return res.data;
};
export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(`${apiUrl}/user/get-details/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const deleteUser = async (id, access_token) => {
  const res = await axiosJWT.delete(`${apiUrl}/user/delete-user/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(`${apiUrl}/user/getAll`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
// export const refreshToken = async () => {
//   const res = await axios.post(`${apiUrl}/user/refresh-token`, {
//     withCredentials: true,
//   });
//   return res.data;
// };
export const refreshToken = async (refreshToken) => {
  const res = await axios.post(
    `${apiUrl}/user/refresh-token`,
    {},
    {
      headers: {
        token: `Bearer ${refreshToken}`,
      },
    }
  );
  return res.data;
};
export const logoutUser = async () => {
  const res = await axios.post(`${apiUrl}/user/log-out`);
  return res.data;
};
export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(`${apiUrl}/user/update-user/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const deleteManyUser = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/user/delete-many/`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
