import React, { useEffect, useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assets/images/logo.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  const location = useLocation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleNavigateSignup = () => {
    navigate("/sign-up");
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      console.log("Login successful:", data);
      
      // Store tokens in localStorage
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(data?.refresh_token));
      
      if (data?.access_token) {
        try {
          const decoded = jwtDecode(data?.access_token);
          if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, data?.access_token);
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
      
      // Navigate after successful login
      setTimeout(() => {
        if (location?.state) {
          navigate(location?.state);
        } else {
          navigate("/");
        }
      }, 100);
    }
  }, [isSuccess, data]);

  const handleGetDetailsUser = async (id, token) => {
    try {
      const storage = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storage);
      const res = await UserService.getDetailsUser(id, token);
      
      console.log("User details:", res?.data);
      
      if (res?.data) {
        // Update Redux state with user data
        dispatch(
          updateUser({ 
            ...res?.data, 
            access_token: token, 
            refreshToken 
          })
        );
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSignin = () => {
    if (!email || !password) return;
    
    mutation.mutate({
      email,
      password,
    });
  };
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "940px",
          height: "470px",
          borderRadius: "6px",
          backgroundColor: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1 style={{ color: "#f48ea1" }}>Bông Land xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder={"abc@gmail.com"}
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "#FF6683" }}>{data?.message}</span>
          )}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignin}
              size={40}
              styleButton={{
                background: "#FF6683",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textButton={"Đăng nhập"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </Loading>
          <p>
            <WrapperTextLight> Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <WrapperTextLight
              onClick={handleNavigateSignup}
              style={{ cursor: "pointer" }}
            >
              Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            alt="image logo"
            preview={false}
            height="470px"
            width="470px"
          />
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
