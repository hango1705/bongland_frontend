import React, { useEffect } from "react";
import { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const { data, isPending, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = (id, token) => {
    UserService.getDetailsUser(id, token)
      .then((res) => {
        dispatch(updateUser({ ...res.data, access_token: token }));
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnchangeAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    try {
      const filePreview = await getBase64(file);
      setAvatar(filePreview);
    } catch (error) {
      console.error("Error generating file preview:", error);
    }
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };
  return (
    <div
      style={{
        width: "1270px",
        margin: "0 auto",
        height: "500px",
        borderTop: "1px solid #e5e5e5",
      }}
    >
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Tên người dùng</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="name"
              value={name}
              onChange={handleOnchangeName}
            />

            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "#f48ea1",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Địa chỉ email</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              value={email}
              onChange={handleOnchangeEmail}
            />

            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "#f48ea1",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="phone"
              value={phone}
              onChange={handleOnchangePhone}
            />

            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "#f48ea1",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="address"
              value={address}
              onChange={handleOnchangeAddress}
            />

            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "#f48ea1",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Ảnh đại diện</WrapperLabel>
            <WrapperUploadFile
              type="file"
              onChange={handleOnchangeAvatar}
            ></WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "#f48ea1",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
