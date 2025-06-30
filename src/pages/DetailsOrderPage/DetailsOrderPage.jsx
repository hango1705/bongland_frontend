import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import { orderConstant } from "../../constant";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";
import {
  PageContainer,
  PageTitle,
  ContentWrapper,
  OrderStatusBar,
  OrderGrid,
  InfoCard,
  ProductsTable,
  ProductItem,
  OrderSummary
} from "./style";

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;
  
  // Get user from Redux store
  const user = useSelector((state) => state.user);
  
  // Get access token from user data
  const access_token = user?.access_token;

  // Debug log
  useEffect(() => {
    console.log('Debug Info:', {
      orderId: id,
      hasAccessToken: !!access_token,
      user: user
    });
  }, [id, access_token, user]);

  const { isLoading, data: response, error } = useQuery({
    queryKey: ["orders-details", id, access_token],
    queryFn: async () => {
      try {
        if (!access_token) {
          throw new Error('No access token available');
        }
        console.log('Making API call with:', { id, access_token });
        const res = await OrderService.getDetailsOrder(id, access_token);
        console.log('API Response:', res);
        if (res.status === "ERR") {
          throw new Error(res.message || 'Failed to fetch order details');
        }
        return res;
      } catch (err) {
        console.error('API Error:', err);
        throw err;
      }
    },
    enabled: !!(id && access_token),
    retry: 1
  });

  // Extract the actual order data from the response
  const data = response?.data;

  const getOrderStatus = () => {
    if (data?.isCancelled) return { type: "cancelled", text: "Đã hủy" };
    if (data?.isDelivered) return { type: "delivered", text: "Đã giao hàng" };
    if (data?.isPaid) return { type: "processing", text: "Đang xử lý" };
    return { type: "pending", text: "Chờ xác nhận" };
  };

  const orderStatus = getOrderStatus();

  if (isLoading) {
    return <Loading />;
  }

  if (!access_token) {
    return (
      <PageContainer>
        <PageTitle>Chi tiết đơn hàng</PageTitle>
        <ContentWrapper>
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            Vui lòng đăng nhập để xem chi tiết đơn hàng
          </div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageTitle>Chi tiết đơn hàng</PageTitle>
        <ContentWrapper>
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            Có lỗi xảy ra: {error.message || "Không thể tải thông tin đơn hàng"}
          </div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (!data) {
    return (
      <PageContainer>
        <PageTitle>Chi tiết đơn hàng</PageTitle>
        <ContentWrapper>
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            Không tìm thấy thông tin đơn hàng
          </div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Chi tiết đơn hàng</PageTitle>
      
      <ContentWrapper>
        <OrderStatusBar>
          <div className="order-id">
            Mã đơn hàng: <span>{id}</span>
          </div>
          <div className={`order-status ${orderStatus.type}`}>
            {orderStatus.text}
          </div>
        </OrderStatusBar>

        <OrderGrid>
          <InfoCard>
            <div className="card-header">Địa chỉ người nhận</div>
            <div className="card-content">
              <div className="info-item">
                <div className="label">Họ tên</div>
                <div className="value">{data?.shippingAddress?.fullName}</div>
              </div>
              <div className="info-item">
                <div className="label">Địa chỉ</div>
                <div className="value">
                  {typeof data?.shippingAddress?.address === 'object' 
                    ? `${data?.shippingAddress?.address.address || ''} ${data?.shippingAddress?.city || ''}`
                    : `${data?.shippingAddress?.address || ''} ${data?.shippingAddress?.city || ''}`
                  }
                </div>
              </div>
              <div className="info-item">
                <div className="label">Số điện thoại</div>
                <div className="value">{data?.shippingAddress?.phone}</div>
              </div>
            </div>
          </InfoCard>

          <InfoCard>
            <div className="card-header">Hình thức giao hàng</div>
            <div className="card-content">
              <div className="info-item">
                <div className="label">Đơn vị vận chuyển</div>
                <div className="value">
                  <span style={{ color: '#f57c00', fontWeight: 600 }}>FAST</span>
                  {" "}Giao hàng tiết kiệm
                </div>
              </div>
              <div className="info-item">
                <div className="label">Phí vận chuyển</div>
                <div className="value">{convertPrice(data?.shippingPrice)}</div>
              </div>
            </div>
          </InfoCard>

          <InfoCard>
            <div className="card-header">Hình thức thanh toán</div>
            <div className="card-content">
              <div className="info-item">
                <div className="label">Phương thức</div>
                <div className="value">
                  {orderConstant.payment[data?.paymentMethod]}
                </div>
              </div>
              <div className="info-item">
                <div className="label">Trạng thái</div>
                <div className="value" style={{ color: data?.isPaid ? '#388e3c' : '#d32f2f' }}>
                  {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </div>
              </div>
            </div>
          </InfoCard>
        </OrderGrid>

        <ProductsTable>
          <div className="table-header">
            <div className="header-cell">Sản phẩm</div>
            <div className="header-cell">Giá</div>
            <div className="header-cell">Số lượng</div>
            <div className="header-cell">Giảm giá</div>
          </div>
          {data?.orderItems?.map((item) => (
            <ProductItem key={item._id || item.product}>
              <div className="product-info">
                <img src={item.image} alt={item.name} />
                <div className="details">
                  <div className="name">{item.name}</div>
                </div>
              </div>
              <div className="price">{convertPrice(item.price)}</div>
              <div className="quantity">{item.amount}</div>
              <div className="discount">
                {item.discount > 0 ? `${item.discount}%` : '-'}
              </div>
            </ProductItem>
          ))}
        </ProductsTable>

        <OrderSummary>
          <div className="summary-header">Tổng quan đơn hàng</div>
          <div className="summary-content">
            <div className="summary-row">
              <div className="label">Tạm tính</div>
              <div className="value">
                {convertPrice(data?.orderItems?.reduce((total, item) => 
                  total + item.price * item.amount, 0
                ))}
              </div>
            </div>
            <div className="summary-row">
              <div className="label">Phí vận chuyển</div>
              <div className="value">{convertPrice(data?.shippingPrice)}</div>
            </div>
            <div className="summary-row">
              <div className="label">Tổng cộng</div>
              <div className="value total">{convertPrice(data?.totalPrice)}</div>
            </div>
          </div>
        </OrderSummary>
      </ContentWrapper>
    </PageContainer>
  );
};

export default DetailsOrderPage;
