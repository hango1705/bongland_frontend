import React, { useEffect, useState } from "react";
import { 
  OrderPageContainer, 
  OrderPageHeader, 
  OrderEmptyState,
  OrderFilters,
  OrderTabs,
  OrderContent,
  OrderItem,
  OrderItemHeader,
  OrderItemProducts,
  OrderItemFooter,
  OrderProductImage,
  OrderProductInfo,
  OrderStatusBadge,
  OrderActionsGroup,
  OrderStatusGroup,
  OrderFilterButton,
  OrderSearchInput,
  OrderProductItem,
  OrderSummary,
  PageTitle,
  LoaderContainer,
  FilterWrapper
} from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { 
  SearchOutlined, 
  ShoppingOutlined, 
  EnvironmentOutlined, 
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  TagOutlined,
  CheckCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/UseMutationHook";
import * as message from "../../components/Message/Message";
import { Tabs, Badge, Input, Empty, Spin, Modal, Tooltip, Button } from "antd";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { vi } from 'date-fns/locale/vi';

const { TabPane } = Tabs;
const { Search } = Input;

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [backendStatus, setBackendStatus] = useState({ checked: false, connected: false });

  // Get user from Redux store
  const user = useSelector((state) => state.user);
  
  // Check backend connectivity
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const isConnected = await OrderService.checkBackendConnection();
        setBackendStatus({ checked: true, connected: isConnected });
        console.log('Backend connection test:', isConnected ? 'SUCCESS' : 'FAILED');
      } catch (error) {
        setBackendStatus({ checked: true, connected: false });
        console.error('Backend connection test error:', error);
      }
    };
    
    checkBackend();
  }, []);

  // Debug log for user data
  useEffect(() => {
    console.log('Debug - User Data:', {
      userId: user?.id,
      hasAccessToken: !!user?.access_token,
      isLoggedIn: !!user?.id && !!user?.access_token,
      isAdmin: user?.isAdmin
    });
  }, [user]);

  // Handle token refresh or logout on auth errors
  const handleAuthError = () => {
    // Logout user when auth fails
    console.log('Handling auth error - redirecting to login');
    navigate('/sign-in', { 
      state: { 
        from: location,
        message: 'Your session has expired. Please login again.' 
      } 
    });
  };

  // Fetch orders using React Query
  const fetchMyOrder = async () => {
    console.log('Debug - Fetching orders:', {
      userId: user?.id,
      hasAccessToken: !!user?.access_token
    });

    if (!user?.id || !user?.access_token) {
      throw new Error('Please login to view your orders');
    }
    
    try {
      console.log('Debug - Making API call with:', {
        userId: user.id,
        apiUrl: `${process.env.REACT_APP_API_URL}/order/get-all-order/${user.id}`
      });

      // First verify backend is reachable
      const backendAvailable = await OrderService.checkBackendConnection();
      if (!backendAvailable) {
        throw new Error('Backend server is not available. Please try again later.');
      }

      const res = await OrderService.getOrderByUser(user.id, user.access_token);
      console.log('Debug - API Response:', res);

      if (res?.status === "ERR") {
        throw new Error(res.message || 'Failed to fetch orders');
      }
      return res.data || [];
    } catch (error) {
      console.error('Debug - Error fetching orders:', error);
      // More detailed error message based on the error type
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error data:', error.response.data);
        console.error('Response error status:', error.response.status);
        console.error('Response error headers:', error.response.headers);
        
        if (error.response.status === 404) {
          throw new Error('API endpoint not found. The backend route may be missing or incorrect.');
        } else if (error.response.status === 401) {
          // Handle expired token
          handleAuthError();
          throw new Error('Your session has expired. Please login again.');
        } else if (error.response.status === 403) {
          // Handle permission issues
          if (error.response.data?.message?.includes('Admin privileges required')) {
            throw new Error('This feature requires administrator privileges.');
          } else {
            handleAuthError();
            throw new Error('Access denied. You may need to login again.');
          }
        } else {
          throw new Error(`Server error (${error.response.status}): ${error.response.data?.message || error.message}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
        throw new Error('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw error;
      }
    }
  };

  const { isPending, data: orders = [], error: orderError, refetch } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: fetchMyOrder,
    enabled: !!user?.id && !!user?.access_token,
    retry: 1
  });

  // Cancel order mutation
  const mutation = useMutationHooks({
    mutationFn: (data) => {
      const { id, token, orderItems, userId } = data;
      return OrderService.cancelOrder(id, token, orderItems, userId);
    }
  });
  
  const {
    isPending: isPendingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancel,
    data: dataCancel,
    mutate: cancelOrder
  } = mutation;

  // Show success/error notifications
  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success("Đơn hàng đã hủy thành công");
      refetch(); // Refetch orders after successful cancellation
      setIsModalVisible(false);
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message || "Không thể hủy đơn hàng");
    } else if (isErrorCancel) {
      message.error("Đã xảy ra lỗi khi hủy đơn hàng");
    }
  }, [isErrorCancel, isSuccessCancel, dataCancel, refetch]);
  
  // Handle order details navigation
  const handleDetailsOrder = (id) => {
    const token = state?.token || user?.access_token;
    navigate(`/details-order/${id}`, {
      state: {
        token: token,
      },
    });
  };
  
  // Show confirmation modal before cancelling
  const showCancelConfirm = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };
  
  // Actually cancel the order
  const handleCancelOrder = () => {
    if (!selectedOrder) return;
    
    const token = state?.token || user?.access_token;
    cancelOrder({
      id: selectedOrder._id,
      token: token,
      orderItems: selectedOrder?.orderItems,
      userId: user.id
    });
  };
  
  // Filter orders based on active tab and search text
  useEffect(() => {
    if (!orders || !Array.isArray(orders)) {
      setFilteredOrders([]);
      return;
    }
    
    let filtered = [...orders];
    
    // Filter by tab
    if (activeTab === 'processing') {
      filtered = filtered.filter(order => !order.isDelivered && !order.isCancelled);
    } else if (activeTab === 'shipping') {
      filtered = filtered.filter(order => order.isShipping && !order.isDelivered && !order.isCancelled);
    } else if (activeTab === 'delivered') {
      filtered = filtered.filter(order => order.isDelivered && !order.isCancelled);
    } else if (activeTab === 'cancelled') {
      filtered = filtered.filter(order => order.isCancelled);
    }
    
    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(order => 
        order._id?.toLowerCase().includes(searchText.toLowerCase()) ||
        order.orderItems?.some(item => 
          item.name?.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    
    setFilteredOrders(filtered);
  }, [orders, activeTab, searchText]);
  
  // Get order status for display
  const getOrderStatus = (order) => {
    if (order.isCancelled) {
      return { status: 'Đã hủy', type: 'error' };
    } else if (order.isDelivered) {
      return { status: 'Đã giao hàng', type: 'success' };
    } else if (order.isShipping) {
      return { status: 'Đang giao hàng', type: 'processing' };
    } else {
      return { status: 'Đang xử lý', type: 'default' };
    }
  };
  
  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  };

  // Render each product item
  const renderProductItems = (products) => {
    if (!products || !Array.isArray(products)) {
      return null;
    }
    
    return products.map((product) => (
      <OrderProductItem key={product?._id || Math.random().toString()}>
        <OrderProductImage>
          <img src={product?.image} alt={product?.name || 'Product'} />
          <Badge count={product?.amount || 1} offset={[-5, 5]} />
        </OrderProductImage>
        <OrderProductInfo>
          <h4>{product?.name || 'Unknown Product'}</h4>
          <div className="product-price">{convertPrice(product?.price || 0)}</div>
          <div className="product-quantity">
            <span style={{ marginRight: '8px' }}>Số lượng: {product?.amount || 1}</span>
            {product?.discount > 0 && (
              <span style={{ color: '#ff6683', fontWeight: '500' }}>
                Giảm giá: {product?.discount}%
              </span>
            )}
          </div>
          <div style={{ 
            fontSize: '13px', 
            color: '#666', 
            marginTop: '5px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: product?.countInStock > 0 ? '#52c41a' : '#f5222d',
              borderRadius: '50%',
              marginRight: '5px'
            }} />
            {product?.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
          </div>
        </OrderProductInfo>
      </OrderProductItem>
    ));
  };

  return (
    <Loading isPending={isPending || isPendingCancel}>
      <OrderPageContainer>
        {/* Add connection status indicator for debugging */}
        {backendStatus.checked && !backendStatus.connected && (
          <div style={{ 
            padding: "10px 20px", 
            margin: "0 auto 20px", 
            maxWidth: "800px",
            backgroundColor: "#fff3cd", 
            color: "#856404", 
            borderRadius: "4px", 
            textAlign: "center",
            border: "1px solid #ffeeba"
          }}>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              Không thể kết nối đến máy chủ. Vui lòng kiểm tra:
            </p>
            <div style={{ fontSize: "14px", marginTop: "8px", textAlign: "left" }}>
              <p>1. Máy chủ backend có đang chạy không? (http://localhost:3001)</p>
              <p>2. API endpoint "/order/get-all-order/:id" có tồn tại không?</p>
              <p>3. Có lỗi CORS nào không?</p>
              <Button type="primary" size="small" onClick={() => window.location.reload()}>
                Thử lại
              </Button>
            </div>
          </div>
        )}

        {orderError && (
          <div style={{ 
            padding: "10px 20px", 
            margin: "0 auto 20px", 
            maxWidth: "800px",
            backgroundColor: "#f8d7da", 
            color: "#721c24", 
            borderRadius: "4px", 
            textAlign: "center",
            border: "1px solid #f5c6cb"
          }}>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              Lỗi khi tải dữ liệu đơn hàng:
            </p>
            <div style={{ fontSize: "14px", marginTop: "8px", textAlign: "left" }}>
              <p>{orderError.message || 'Không thể tải danh sách đơn hàng'}</p>
              {orderError.message?.includes('session') || 
               orderError.message?.includes('login') ||
               orderError.message?.includes('Access denied') ? (
                <Button 
                  type="primary" 
                  onClick={() => navigate('/sign-in', { state: { from: location } })}
                >
                  Đăng nhập lại
                </Button>
              ) : (
                <Button 
                  type="primary" 
                  onClick={() => refetch()}
                >
                  Thử lại
                </Button>
              )}
            </div>
          </div>
        )}

        <OrderPageHeader>
          <PageTitle>
            <ShoppingCartOutlined className="title-icon" />
            Đơn hàng của tôi
          </PageTitle>
          
          {!user?.id ? (
            <OrderEmptyState>
              <InboxOutlined />
              <h3>Vui lòng đăng nhập</h3>
              <p>Bạn cần đăng nhập để xem đơn hàng của mình</p>
              <Button 
                type="primary" 
                onClick={() => navigate('/sign-in', { state: { from: location } })}
              >
                Đăng nhập ngay
              </Button>
            </OrderEmptyState>
          ) : (
            <>
              <FilterWrapper>
                <OrderSearchInput 
                  placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm" 
                  prefix={<SearchOutlined />}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </FilterWrapper>
              
              <OrderTabs 
                activeKey={activeTab}
                onChange={setActiveTab}
              >
                <TabPane tab="Tất cả đơn hàng" key="all" />
                <TabPane tab="Đang xử lý" key="processing" />
                <TabPane tab="Đang giao hàng" key="shipping" />
                <TabPane tab="Đã giao hàng" key="delivered" />
                <TabPane tab="Đã hủy" key="cancelled" />
              </OrderTabs>

              <OrderContent>
                {isPending ? (
                  <LoaderContainer>
                    <Spin size="large" />
                  </LoaderContainer>
                ) : orderError ? (
                  <OrderEmptyState>
                    <InboxOutlined />
                    <h3>Có lỗi xảy ra</h3>
                    <p>{orderError.message || 'Không thể tải danh sách đơn hàng'}</p>
                    {orderError.message?.includes('session') || 
                     orderError.message?.includes('login') ||
                     orderError.message?.includes('Access denied') ? (
                      <Button 
                        type="primary" 
                        onClick={() => navigate('/sign-in', { state: { from: location } })}
                      >
                        Đăng nhập lại
                      </Button>
                    ) : (
                      <Button 
                        type="primary" 
                        onClick={() => refetch()}
                      >
                        Thử lại
                      </Button>
                    )}
                  </OrderEmptyState>
                ) : filteredOrders?.length > 0 ? (
                  filteredOrders.map((order) => {
                    const orderStatus = getOrderStatus(order);
                    return (
                      <OrderItem key={order?._id}>
                        <OrderItemHeader>
                          <div className="order-id">
                            <FileTextOutlined />
                            <span>Mã đơn hàng: {order?._id}</span>
                          </div>
                          <OrderStatusBadge 
                            $type={orderStatus.type}
                          >
                            {orderStatus.status}
                          </OrderStatusBadge>
                        </OrderItemHeader>
                        
                        <div style={{ 
                          padding: '0 24px', 
                          marginTop: '12px', 
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '1px dashed #eee',
                          paddingBottom: '12px'
                        }}>
                          <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                              <ClockCircleOutlined style={{ marginRight: '8px' }} />
                              Đặt hàng: {formatDate(order?.createdAt)}
                              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#999' }}>
                                ({getRelativeTime(order?.createdAt)})
                              </span>
                            </div>
                            {order?.isShipping && (
                              <div style={{ fontSize: '14px', color: '#1890ff', marginBottom: '4px' }}>
                                <EnvironmentOutlined style={{ marginRight: '8px' }} />
                                Đang giao hàng: {formatDate(order?.updatedAt)}
                              </div>
                            )}
                            {order?.isDelivered && (
                              <div style={{ fontSize: '14px', color: '#52c41a', marginBottom: '4px' }}>
                                <CheckCircleOutlined style={{ marginRight: '8px' }} />
                                Đã giao hàng: {formatDate(order?.deliveredAt || order?.updatedAt)}
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                              <DollarOutlined style={{ marginRight: '8px' }} />
                              Phương thức thanh toán: <span style={{ fontWeight: '500' }}>{order?.paymentMethod}</span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#666' }}>
                              <TagOutlined style={{ marginRight: '8px' }} />
                              Phí vận chuyển: <span style={{ fontWeight: '500' }}>{convertPrice(order?.shippingPrice || 0)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <OrderItemProducts>
                          {renderProductItems(order?.orderItems)}
                        </OrderItemProducts>
                        
                        <OrderItemFooter>
                          <OrderStatusGroup>
                            <div className="status-item">
                              <EnvironmentOutlined />
                              <span className="label">Địa chỉ:</span>
                              <span className="value">
                                {typeof order?.shippingAddress?.address === 'object' 
                                  ? `${order?.shippingAddress?.address.address || ''}, ${order?.shippingAddress?.city || ''}`
                                  : `${order?.shippingAddress?.address || ''}, ${order?.shippingAddress?.city || ''}`
                                }
                              </span>
                            </div>
                            <div className="status-item">
                              <UserOutlined />
                              <span className="label">Người nhận:</span>
                              <span className="value">{order?.shippingAddress?.fullName}</span>
                              {order?.shippingAddress?.phone && (
                                <span style={{ marginLeft: '8px' }}>({order?.shippingAddress?.phone})</span>
                              )}
                            </div>
                          </OrderStatusGroup>
                          
                          <OrderSummary>
                            <div className="order-total">
                              <span>Tổng tiền:</span>
                              <span className="total-price">{convertPrice(order?.totalPrice)}</span>
                            </div>
                            
                            <OrderActionsGroup>
                              {!order.isDelivered && !order.isCancelled && (
                                <ButtonComponent
                                  onClick={() => showCancelConfirm(order)}
                                  size={40}
                                  styleButton={{
                                    height: "40px",
                                    background: "#fff0f3",
                                    borderRadius: "6px",
                                    border: "1px solid #ffd0d9"
                                  }}
                                  textButton={"Hủy đơn hàng"}
                                  styleTextButton={{ color: "#ff6683", fontSize: "14px", fontWeight: "500" }}
                                />
                              )}
                              <ButtonComponent
                                onClick={() => handleDetailsOrder(order?._id)}
                                size={40}
                                styleButton={{
                                  height: "40px",
                                  background: "#ff6683",
                                  borderRadius: "6px",
                                  border: "none"
                                }}
                                textButton={"Xem chi tiết"}
                                styleTextButton={{ color: "white", fontSize: "14px", fontWeight: "500" }}
                              />
                            </OrderActionsGroup>
                          </OrderSummary>
                        </OrderItemFooter>
                      </OrderItem>
                    );
                  })
                ) : (
                  <OrderEmptyState>
                    <InboxOutlined />
                    <h3>Không tìm thấy đơn hàng nào</h3>
                    <p>
                      {searchText 
                        ? "Không tìm thấy đơn hàng phù hợp với từ khóa tìm kiếm" 
                        : "Bạn chưa có đơn hàng nào trong danh mục này"}
                    </p>
                    <Button 
                      type="primary" 
                      icon={<ShoppingOutlined />}
                      onClick={() => navigate('/products')}
                    >
                      Mua sắm ngay
                    </Button>
                  </OrderEmptyState>
                )}
              </OrderContent>
            </>
          )}
        </OrderPageHeader>
      </OrderPageContainer>
      
      {/* Cancel Order Confirmation Modal */}
      <Modal
        title="Xác nhận hủy đơn hàng"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        maskClosable={!isPendingCancel}
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
        <p>Mã đơn hàng: {selectedOrder?._id}</p>
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button 
            style={{ marginRight: 8 }} 
            onClick={() => setIsModalVisible(false)}
            disabled={isPendingCancel}
          >
            Không
          </Button>
          <Button 
            type="primary" 
            danger
            onClick={handleCancelOrder}
            loading={isPendingCancel}
          >
            Xác nhận hủy
          </Button>
        </div>
      </Modal>
    </Loading>
  );
};

export default MyOrderPage;
