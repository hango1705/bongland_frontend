import React, { useEffect, useState } from "react";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./style";
import logo from "../../assets/images/animal.png";
import { Badge, Button, Col, Popover } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const order = useSelector((state) => state.order);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setPending(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setPending(false);
  };

  useEffect(() => {
    setPending(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setPending(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup
        onClick={() =>
          navigate("/my-order", {
            state: { id: user?.id, token: user?.access_token },
          })
        }
      >
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  return (
    <div>
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={6} style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "60px", height: "60px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <WrapperTextHeader onClick={() => navigate("/")}>
            BÔNG LAND ONLINE
          </WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={11}>
            <ButtonInputSearch
              size="large"
              textButton="Tìm kiếm"
              placeholder="Nhập sản phẩm cần tìm"
              borderColor="#f48ea1"
              onChange={onSearch}
            />
          </Col>
        )}
        <Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <Loading isPending={pending}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                ></img>
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng nhập/Đăng ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div
              onClick={() => navigate("/order")}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Badge
                count={order?.orderItems?.length}
                size="small"
                color="#02c4c1"
              >
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#f48ea1" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};
export default HeaderComponent;
