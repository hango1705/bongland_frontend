import React, { useEffect, useState } from "react";
import {
  WrapperHeader,
  WrapperTextHeader,
  HeaderActions,
  NavLink,
  CartBadge,
  HeaderLogo,
  UserMenuContainer,
  ActionButton,
  ActionButtonsContainer
} from "./style";
import logo from "../../assets/images/animal.png";
import { Badge, Button, Dropdown, Tooltip } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  BellOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../../components/LoadingComponent/Loading";

const HeaderComponent = ({ isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const isLoggedIn = !!user?.access_token;
  
  useEffect(() => {
    console.log("Current user state:", user);
  }, [user]);
  
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  
  const handleLogout = async () => {
    setPending(true);
    await UserService.logoutUser();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(resetUser());
    setPending(false);
  };

  useEffect(() => {
    setPending(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setPending(false);
  }, [user?.name, user?.avatar]);

  return (
    <div>
      <WrapperHeader>
        <HeaderLogo>
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <WrapperTextHeader onClick={() => navigate("/")}>
            BÔNG LAND
          </WrapperTextHeader>
        </HeaderLogo>

        <NavLink>
          <div className="nav-item" onClick={() => navigate("/")}>Trang chủ</div>
          <div className="nav-item" onClick={() => navigate("/products")}>Sản phẩm</div>
          <div className="nav-item" onClick={() => navigate("/promotion")}>Khuyến mãi</div>
          <div className="nav-item" onClick={() => navigate("/about")}>Giới thiệu</div>
          <div className="nav-item" onClick={() => navigate("/contact")}>Liên hệ</div>
        </NavLink>

        <HeaderActions>
          <Loading isPending={pending}>
            <ActionButtonsContainer>
              <Tooltip title="Yêu thích">
                <ActionButton onClick={() => navigate("/wishlist")}>
                  <Badge count={0} size="small" color="#ff6683">
                    <HeartOutlined className="action-icon" />
                  </Badge>
                </ActionButton>
              </Tooltip>
              
              <Tooltip title="Thông báo">
                <ActionButton>
                  <Badge count={3} size="small" color="#ff6683">
                    <BellOutlined className="action-icon" />
                  </Badge>
                </ActionButton>
              </Tooltip>
              
              {!isHiddenCart && (
                <Tooltip title="Giỏ hàng">
                  <CartBadge
                    onClick={() => navigate("/order")}
                  >
                    <Badge
                      count={order?.orderItems?.length}
                      size="small"
                      color="#ff6683"
                    >
                      <ShoppingCartOutlined />
                    </Badge>
                    <span>Giỏ hàng</span>
                  </CartBadge>
                </Tooltip>
              )}
            </ActionButtonsContainer>
            
            <UserMenuContainer>
              {isLoggedIn ? (
                <Dropdown 
                  menu={{ 
                    items: [
                      user?.isAdmin && {
                        key: 'admin',
                        label: 'Quản lý hệ thống',
                        onClick: () => navigate("/system/admin")
                      },
                      {
                        key: 'profile',
                        label: 'Thông tin người dùng',
                        onClick: () => navigate("/profile-user")
                      },
                      {
                        key: 'orders',
                        label: 'Đơn hàng của tôi',
                        onClick: () => navigate("/my-order", {
                          state: { id: user?.id, token: user?.access_token },
                        })
                      },
                      {
                        key: 'logout',
                        label: 'Đăng xuất',
                        onClick: handleLogout
                      }
                    ].filter(Boolean) // Remove null/undefined items (for admin conditional)
                  }}
                  trigger={['click']} 
                  placement="bottomRight"
                >
                  <div className="user-dropdown">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt="avatar"
                      />
                    ) : (
                      <UserOutlined />
                    )}
                    <span className="user-name">{userName?.length ? userName : user?.email}</span>
                    <CaretDownOutlined />
                  </div>
                </Dropdown>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  className="login-button"
                >
                  <Button type="primary" shape="round" size="middle">
                    Đăng nhập
                  </Button>
                </div>
              )}
            </UserMenuContainer>
          </Loading>
        </HeaderActions>
      </WrapperHeader>
    </div>
  );
};
export default HeaderComponent;
