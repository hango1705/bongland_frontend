import React from "react";
import {
  Label,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperContainer,
  WrapperValue,
  WrapperItemOrderInfo,
} from "./style";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  
  const orderInfo = state?.orderInfo || {};
  const orderItems = orderInfo?.orderItems || [];
  const paymentMethod = state?.paymentMethod || 'cod';
  
  const getDeliveryMethodName = (method) => {
    switch(method) {
      case 'express':
        return 'Giao hàng nhanh (1-2 ngày)';
      case 'standard':
      default:
        return 'Giao hàng tiêu chuẩn (3-5 ngày)';
    }
  };
  
  const getPaymentMethodName = (method) => {
    switch(method) {
      case 'bank':
        return 'Chuyển khoản ngân hàng';
      case 'momo':
        return 'Ví điện tử MoMo';
      case 'cod':
      default:
        return 'Thanh toán khi nhận hàng';
    }
  };

  const handleNavigateHomepage = () => {
    navigate("/");
  };
  
  const handleViewOrders = () => {
    navigate("/my-order");
  };
  
  return (
    <div style={{ background: "#f5f5fa", width: "100%", minHeight: "100vh", paddingBottom: "30px" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            marginLeft: "5px",
            paddingTop: "20px",
            color: "#ff6683",
            textAlign: "center",
          }}
        >
          Đặt hàng thành công!
        </h3>
        
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperContainer>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <div>
                <Label>Mã đơn hàng</Label>
                <WrapperValue>#{orderInfo?._id || 'N/A'}</WrapperValue>
              </div>
              <div>
                <Label>Ngày đặt hàng</Label>
                <WrapperValue>
                  {orderInfo?.createdAt 
                    ? new Date(orderInfo.createdAt).toLocaleString('vi-VN')
                    : new Date().toLocaleString('vi-VN')
                  }
                </WrapperValue>
              </div>
            </div>
            
            <WrapperInfo>
              <div>
                <Label>Phương thức giao hàng</Label>
                <WrapperValue>
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {getDeliveryMethodName(orderInfo?.deliveryMethod)}
                  </span>
                </WrapperValue>
              </div>
            </WrapperInfo>
            
            <WrapperInfo>
              <div>
                <Label>Phương thức thanh toán</Label>
                <WrapperValue>
                  {getPaymentMethodName(paymentMethod)}
                </WrapperValue>
              </div>
            </WrapperInfo>
            
            <WrapperInfo>
              <div>
                <Label>Thông tin người nhận</Label>
                <WrapperValue>
                  <div>{orderInfo?.shippingAddress?.fullName}</div>
                  <div>{orderInfo?.shippingAddress?.phone}</div>
                </WrapperValue>
              </div>
            </WrapperInfo>
            
            <WrapperItemOrderInfo>
              <h4 style={{ margin: "10px 0", padding: "0 10px" }}>Chi tiết đơn hàng</h4>
              {orderItems.map((item) => {
                return (
                  <WrapperItemOrder key={item?.product}>
                    <div
                      style={{
                        width: "500px",
                        display: "flex",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                          borderRadius: "4px",
                          border: "1px solid #f0f0f0",
                        }}
                      />
                      <div
                        style={{
                          fontSize: "14px",
                          width: "260px",
                        }}
                      >
                        {item?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#242424" }}>
                        Đơn giá: {convertPrice(item?.price)}
                      </span>
                      <span style={{ fontSize: "14px", color: "#242424" }}>
                        Số lượng: {item?.amount}
                      </span>
                      <span style={{ fontSize: "15px", color: "#ff6683", fontWeight: "500" }}>
                        {convertPrice(item?.price * item?.amount)}
                      </span>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfo>
            
            <div style={{ 
              marginTop: "20px", 
              padding: "15px", 
              borderTop: "1px solid #f0f0f0",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "flex-end" 
            }}>
              <div><span>Tạm tính:</span> <span style={{ marginLeft: "20px" }}>{convertPrice(orderInfo?.itemsPrice || 0)}</span></div>
              <div><span>Phí vận chuyển:</span> <span style={{ marginLeft: "20px" }}>{convertPrice(orderInfo?.shippingPrice || 0)}</span></div>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ff6683" }}>
                <span>Tổng cộng:</span> <span style={{ marginLeft: "20px" }}>{convertPrice(orderInfo?.totalPrice || 0)}</span>
              </div>
            </div>
          </WrapperContainer>
        </div>
        
        <div style={{ marginTop: "20px", textAlign: "center", display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            style={{
              background: "#ff6683",
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              border: "none",
              height: "40px",
              padding: "0 20px",
              cursor: "pointer",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(255, 102, 131, 0.2)",
              transition: "all 0.3s ease"
            }}
            onClick={handleNavigateHomepage}
            onMouseOver={(e) => e.currentTarget.style.background = "#e05a74"}
            onMouseOut={(e) => e.currentTarget.style.background = "#ff6683"}
          >
            Tiếp tục mua sắm
          </button>
          
          <button
            style={{
              background: "white",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#ff6683",
              border: "1px solid #ff6683",
              height: "40px",
              padding: "0 20px",
              cursor: "pointer",
              borderRadius: "4px",
              transition: "all 0.3s ease"
            }}
            onClick={handleViewOrders}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#fff0f3";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "white";
            }}
          >
            Xem đơn hàng của tôi
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
