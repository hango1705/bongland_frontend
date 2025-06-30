import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileContent,
  ProfileSidebar,
  ProfileMain,
  ProfileAvatar,
  ProfileSection,
  ProfileSectionTitle,
  ProfileFormGroup,
  ProfileLabel,
  ProfileValue,
  ProfileInput,
  UpdateButton,
  AvatarUpload,
  OrderHistoryTable,
  AddressCard,
  PageTitle,
  UserInfo,
  UserName,
  UserRole,
  StatsCard,
  StatsGrid,
  TabsContainer,
  TabContent
} from "./style";
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined, 
  UploadOutlined,
  EditOutlined,
  CheckOutlined,
  ShoppingOutlined,
  HeartOutlined,
  BellOutlined,
  LogoutOutlined,
  CreditCardOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Avatar, Button, Tabs, Badge, Modal, Form, Input, Upload } from "antd";
import { getBase64 } from "../../utils";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false,
    address: false
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    city: ""
  });
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address?.address || "",
      avatar: user?.avatar || "",
      city: user?.address?.city || ""
    });
  }, [user]);

  // Mutation hook for updating user data
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, rests, access_token);
  });

  const { isPending, isSuccess, isError } = mutation;

  // Handle successful/failed updates
  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thông tin thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
      // Reset all edit modes
      setEditMode({
        name: false,
        email: false,
        phone: false,
        address: false
      });
    } else if (isError) {
      message.error("Cập nhật thông tin thất bại");
    }
  }, [isSuccess, isError]);

  // Get user details from server
  const handleGetDetailsUser = (id, token) => {
    UserService.getDetailsUser(id, token)
      .then((res) => {
        dispatch(updateUser({ ...res.data, access_token: token }));
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle avatar file selection
  const handleAvatarChange = async (info) => {
    if (info.file) {
      try {
        const filePreview = await getBase64(info.file.originFileObj);
        setFormData(prev => ({
          ...prev,
          avatar: filePreview
        }));
      } catch (error) {
        console.error("Error generating file preview:", error);
      }
    }
  };

  // Toggle edit mode for a field
  const toggleEditMode = (field) => {
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Save a single field
  const handleUpdateField = (field) => {
    // Create payload based on the field being updated
    const payload = {
      id: user?.id,
      access_token: user?.access_token
    };

    if (field === 'name') {
      payload.name = formData.name;
    } else if (field === 'email') {
      payload.email = formData.email;
    } else if (field === 'phone') {
      payload.phone = formData.phone;
    } else if (field === 'address') {
      payload.address = {
        address: formData.address,
        city: formData.city
      };
    }

    mutation.mutate(payload);
  };

  // Save avatar
  const handleSaveAvatar = () => {
    mutation.mutate({
      id: user?.id,
      avatar: formData.avatar,
      access_token: user?.access_token
    });
    setIsAvatarModalVisible(false);
  };

  // Helper function to display user's name or email if name is not available
  const displayName = user?.name || user?.email?.split('@')[0] || "Người dùng";

  // Mock order history data - in a real app, you would fetch this
  const orderHistory = [
    { id: "BD12345", date: "15/05/2023", total: "450,000đ", status: "Đã giao hàng" },
    { id: "BD12346", date: "02/06/2023", total: "720,000đ", status: "Đang giao hàng" },
    { id: "BD12347", date: "17/06/2023", total: "380,000đ", status: "Đang xử lý" }
  ];

  // Mock statistics
  const stats = [
    { icon: <ShoppingOutlined />, title: "Đơn hàng", value: orderHistory.length, color: "#ff6683" },
    { icon: <HeartOutlined />, title: "Yêu thích", value: 12, color: "#ff6683" },
    { icon: <CreditCardOutlined />, title: "Điểm thưởng", value: 250, color: "#ff6683" }
  ];

  // Tab items for the Tabs component
  const tabItems = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      children: (
        <ProfileSection>
          <ProfileSectionTitle>Thông tin cơ bản</ProfileSectionTitle>
          <ProfileFormGroup>
            <ProfileLabel>
              <UserOutlined /> Họ tên
            </ProfileLabel>
            {editMode.name ? (
              <div className="edit-field">
                <ProfileInput 
                  value={formData.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)} 
                  placeholder="Nhập họ tên của bạn"
                />
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />} 
                  onClick={() => handleUpdateField('name')}
                  className="save-btn"
                >
                  Lưu
                </Button>
                <Button 
                  onClick={() => toggleEditMode('name')}
                  className="cancel-btn"
                >
                  Hủy
                </Button>
              </div>
            ) : (
              <div className="value-container">
                <ProfileValue>{formData.name || "Chưa cập nhật"}</ProfileValue>
                <UpdateButton onClick={() => toggleEditMode('name')}>
                  <EditOutlined /> Sửa
                </UpdateButton>
              </div>
            )}
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel>
              <MailOutlined /> Email
            </ProfileLabel>
            {editMode.email ? (
              <div className="edit-field">
                <ProfileInput 
                  value={formData.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                  placeholder="Nhập email của bạn"
                  type="email"
                />
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />} 
                  onClick={() => handleUpdateField('email')}
                  className="save-btn"
                >
                  Lưu
                </Button>
                <Button 
                  onClick={() => toggleEditMode('email')}
                  className="cancel-btn"
                >
                  Hủy
                </Button>
              </div>
            ) : (
              <div className="value-container">
                <ProfileValue>{formData.email || "Chưa cập nhật"}</ProfileValue>
                <UpdateButton onClick={() => toggleEditMode('email')}>
                  <EditOutlined /> Sửa
                </UpdateButton>
              </div>
            )}
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel>
              <PhoneOutlined /> Số điện thoại
            </ProfileLabel>
            {editMode.phone ? (
              <div className="edit-field">
                <ProfileInput 
                  value={formData.phone} 
                  onChange={(e) => handleInputChange('phone', e.target.value)} 
                  placeholder="Nhập số điện thoại của bạn"
                />
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />} 
                  onClick={() => handleUpdateField('phone')}
                  className="save-btn"
                >
                  Lưu
                </Button>
                <Button 
                  onClick={() => toggleEditMode('phone')}
                  className="cancel-btn"
                >
                  Hủy
                </Button>
              </div>
            ) : (
              <div className="value-container">
                <ProfileValue>{formData.phone || "Chưa cập nhật"}</ProfileValue>
                <UpdateButton onClick={() => toggleEditMode('phone')}>
                  <EditOutlined /> Sửa
                </UpdateButton>
              </div>
            )}
          </ProfileFormGroup>

          <ProfileSectionTitle>Địa chỉ giao hàng</ProfileSectionTitle>
          <ProfileFormGroup>
            <ProfileLabel>
              <HomeOutlined /> Địa chỉ
            </ProfileLabel>
            {editMode.address ? (
              <div className="edit-field address-edit">
                <ProfileInput 
                  value={formData.address} 
                  onChange={(e) => handleInputChange('address', e.target.value)} 
                  placeholder="Nhập địa chỉ của bạn"
                  className="address-input"
                />
                <ProfileInput 
                  value={formData.city} 
                  onChange={(e) => handleInputChange('city', e.target.value)} 
                  placeholder="Nhập thành phố"
                  className="city-input"
                />
                <div className="address-actions">
                  <Button 
                    type="primary" 
                    icon={<CheckOutlined />} 
                    onClick={() => handleUpdateField('address')}
                    className="save-btn"
                  >
                    Lưu
                  </Button>
                  <Button 
                    onClick={() => toggleEditMode('address')}
                    className="cancel-btn"
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            ) : (
              <div className="value-container">
                <ProfileValue>
                  {formData.address && formData.city
                    ? `${formData.address}, ${formData.city}`
                    : "Chưa cập nhật"}
                </ProfileValue>
                <UpdateButton onClick={() => toggleEditMode('address')}>
                  <EditOutlined /> Sửa
                </UpdateButton>
              </div>
            )}
          </ProfileFormGroup>
        </ProfileSection>
      )
    },
    {
      key: "orders",
      label: "Lịch sử đơn hàng",
      children: (
        <ProfileSection>
          <ProfileSectionTitle>Đơn hàng gần đây</ProfileSectionTitle>
          {orderHistory.length > 0 ? (
            <OrderHistoryTable>
              <thead>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.total}</td>
                    <td>
                      <Badge 
                        status={
                          order.status === "Đã giao hàng" ? "success" :
                          order.status === "Đang giao hàng" ? "processing" : "default"
                        } 
                        text={order.status} 
                      />
                    </td>
                    <td>
                      <Button 
                        type="primary" 
                        size="small"
                        onClick={() => navigate(`/details-order/${order.id}`)}
                      >
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </OrderHistoryTable>
          ) : (
            <div className="empty-state">
              <ShoppingOutlined style={{ fontSize: '48px', color: '#ff6683' }} />
              <p>Bạn chưa có đơn hàng nào</p>
              <Button type="primary" onClick={() => navigate('/products')}>
                Mua sắm ngay
              </Button>
            </div>
          )}
        </ProfileSection>
      )
    },
    {
      key: "wishlist",
      label: "Sản phẩm yêu thích",
      children: (
        <ProfileSection>
          <ProfileSectionTitle>Sản phẩm đã lưu</ProfileSectionTitle>
          <div className="empty-state">
            <HeartOutlined style={{ fontSize: '48px', color: '#ff6683' }} />
            <p>Chưa có sản phẩm yêu thích</p>
            <Button type="primary" onClick={() => navigate('/products')}>
              Khám phá sản phẩm
            </Button>
          </div>
        </ProfileSection>
      )
    }
  ];

  return (
    <ProfileContainer>
      <Loading isPending={isPending}>
        <PageTitle>Thông tin người dùng</PageTitle>
        
        <ProfileContent>
          <ProfileSidebar>
            <ProfileAvatar onClick={() => setIsAvatarModalVisible(true)}>
              {formData.avatar ? (
                <Avatar 
                  size={120} 
                  src={formData.avatar} 
                  alt="Ảnh đại diện"
                />
              ) : (
                <Avatar 
                  size={120} 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#ff6683' }}
                />
              )}
              <div className="avatar-edit-overlay">
                <UploadOutlined />
                <span>Cập nhật</span>
              </div>
            </ProfileAvatar>
            
            <UserInfo>
              <UserName>{displayName}</UserName>
              <UserRole>{user?.isAdmin ? "Quản trị viên" : "Thành viên"}</UserRole>
            </UserInfo>
            
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatsCard key={index} $color={stat.color}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-title">{stat.title}</div>
                  </div>
                </StatsCard>
              ))}
            </StatsGrid>
            
            <div className="sidebar-actions">
            <ButtonComponent
                onClick={() => navigate('/my-order')}
              size={40}
              styleButton={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "8px",
                  marginTop: "20px",
                  backgroundColor: "#fff0f3",
                  border: "1px solid #ffd0d9"
                }}
                icon={<ShoppingOutlined />}
                textButton={"Đơn hàng của tôi"}
              styleTextButton={{
                  color: "#ff6683",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginLeft: "10px"
                }}
            />

            <ButtonComponent
                onClick={() => navigate('/wishlist')}
              size={40}
              styleButton={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "8px",
                  marginTop: "10px",
                  backgroundColor: "#fff0f3",
                  border: "1px solid #ffd0d9"
                }}
                icon={<HeartOutlined />}
                textButton={"Sản phẩm yêu thích"}
              styleTextButton={{
                  color: "#ff6683",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginLeft: "10px"
                }}
            />

            <ButtonComponent
              size={40}
              styleButton={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "8px",
                  marginTop: "10px",
                  backgroundColor: "#fff0f3",
                  border: "1px solid #ffd0d9"
                }}
                icon={<BellOutlined />}
                textButton={"Thông báo"}
              styleTextButton={{
                  color: "#ff6683",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginLeft: "10px"
                }}
            />

            <ButtonComponent
                onClick={() => {
                  // Handle logout
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("refresh_token"); 
                  navigate('/sign-in');
                }}
              size={40}
              styleButton={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "8px",
                  marginTop: "20px",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #e0e0e0"
                }}
                icon={<LogoutOutlined />}
                textButton={"Đăng xuất"}
              styleTextButton={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginLeft: "10px"
                }}
              />
            </div>
          </ProfileSidebar>
          
          <ProfileMain>
            <Tabs 
              defaultActiveKey="profile" 
              items={tabItems}
              onChange={(key) => setActiveTab(key)}
              tabBarStyle={{ marginBottom: 24 }}
            />
          </ProfileMain>
        </ProfileContent>
      </Loading>

      {/* Avatar Upload Modal */}
      <Modal
        title="Cập nhật ảnh đại diện"
        open={isAvatarModalVisible}
        onCancel={() => setIsAvatarModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAvatarModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveAvatar}>
            Lưu ảnh
          </Button>
        ]}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          {formData.avatar ? (
            <Avatar size={120} src={formData.avatar} />
          ) : (
            <Avatar size={120} icon={<UserOutlined />} style={{ backgroundColor: '#ff6683' }} />
          )}
        </div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleAvatarChange}
        >
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </div>
        </Upload>
        <p style={{ marginTop: 10, color: '#666', fontSize: '13px' }}>
          Hỗ trợ định dạng JPG, GIF hoặc PNG. Kích thước tối đa 2MB.
        </p>
      </Modal>
    </ProfileContainer>
  );
};

export default ProfilePage;
