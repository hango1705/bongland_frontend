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
import { orderConstant } from "../../constant";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;
  const handleNavigateHomepage = () => {
    navigate("/");
  };
  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      {/* <Loading isPending={isLoadingAddOrder}> */}
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "10px",
            marginLeft: "5px",
            paddingTop: "10px",
          }}
        >
          Đặt hàng thành công!
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Label>Phương thức giao hàng</Label>
                <WrapperValue>
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {orderConstant.delivery[state?.delivery]}
                  </span>{" "}
                  Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Label>Phương thức thanh toán</Label>
                <WrapperValue>
                  {orderConstant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.name}>
                    <div
                      style={{
                        width: "500px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <img
                        src={order.image}
                        alt="ảnh"
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          fontSize: "13px",
                          width: "260px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          Giá tiền: {convertPrice(order?.price)}
                        </span>
                      </span>
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          Số lượng: {order?.amount}
                        </span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfo>
            <div
              style={{
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Tổng tiền: {convertPrice(state?.totalPriceMemo)}
              </span>
            </div>
          </WrapperContainer>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button
            style={{
              background: "#f48ea1",
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              border: "none",
              height: "35px",
              width: "180px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={() => handleNavigateHomepage()}
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
      {/* </Loading> */}
    </div>
  );
};
export default OrderSuccess;
