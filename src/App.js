import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetUser } from "./redux/slides/userSlide";
import Loading from "./components/LoadingComponent/Loading";

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsPending(true);
    // If user is already in Redux state with access_token, we're logged in
    if (user?.access_token) {
      setIsPending(false);
      return;
    }

    // Otherwise, check localStorage
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    } else {
      setIsPending(false);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      try {
        decoded = jwtDecode(storageData);
        return { decoded, storageData };
      } catch (error) {
        console.error('Error decoding token:', error);
        // Clear invalid tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
    return { decoded, storageData: null };
  };

  const handleGetDetailsUser = async (id, token) => {
    try {
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const res = await UserService.getDetailsUser(id, token);
      
      // Update user with data from API
      dispatch(
        updateUser({
          ...res?.data,
          access_token: token,
          refreshToken: refreshToken,
        })
      );
      
      console.log("User authenticated:", res?.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      dispatch(resetUser());
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } finally {
      setIsPending(false);
    }
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      try {
        const currentTime = new Date();
        const { decoded } = handleDecoded();
        
        if (!decoded?.exp) return config;
        
        let storageRefreshToken = localStorage.getItem("refresh_token");
        if (!storageRefreshToken) return config;
        
        const refreshToken = JSON.parse(storageRefreshToken);
        const decodedRefreshToken = jwtDecode(refreshToken);
        
        if (decoded?.exp < currentTime.getTime() / 1000) {
          if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
            const data = await UserService.refreshToken(refreshToken);
            config.headers["token"] = `Bearer ${data?.access_token}`;
          } else {
            dispatch(resetUser());
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
          }
        }
        return config;
      } catch (error) {
        console.error('Error in interceptor:', error);
        return config;
      }
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  if (isPending) {
    return <Loading isPending={true} />;
  }
  return (
    <div>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}
export default App;
