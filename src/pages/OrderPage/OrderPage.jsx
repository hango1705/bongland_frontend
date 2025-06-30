import React, { useEffect, useMemo, useState } from "react";
import {
  CartPageContainer,
  CartPageContent,
  CartHeader,
  CartLayout,
  CustomCheckbox,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDelivery,
  WrapperTotal,
  WrapperListOrder,
  WrapperPriceDiscount,
  OrderSummary,
  ShippingInfo,
  PromoCode,
  EmptyCart,
  UserInfoModal
} from "./style";
import { 
  DeleteOutlined, 
  MinusOutlined, 
  PlusOutlined, 
  ShoppingCartOutlined, 
  ArrowLeftOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  TagOutlined,
  CheckOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { Button, Modal, Form, Input, Tooltip, Badge, Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import * as UserService from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepComponent/StepComponent";
import AddressSelect from "../../components/AddressSelect/AddressSelect";

// Function to safely get a string message
const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message && typeof error.message === 'string') return error.message;
  if (error?.response?.data?.message && typeof error.response.data.message === 'string') return error.response.data.message;
  // If it's an object, try to stringify it (might not be ideal, but better than crashing)
  if (typeof error === 'object' && error !== null) {
    try {
      return JSON.stringify(error);
    } catch (e) {
      // Ignore stringify errors
    }
  }
  return "Đã có lỗi không xác định xảy ra.";
};

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [addressData, setAddressData] = useState({});
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Check if cart is empty
  const isCartEmpty = !order?.orderItems?.length;

  // Set all items checked by default
  useEffect(() => {
    if (order?.orderItems?.length > 0) {
      const newListChecked = [];
      order.orderItems.forEach((item) => {
        newListChecked.push(item.product);
      });
      setListChecked(newListChecked);
    }
  }, [order?.orderItems]);

  // Item checkbox change
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  // Increase/decrease item quantity
  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  // Check/uncheck all items
  const handleOnChangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  // Delete single item
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  // Handle selected items
  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  // Sync user details with form
  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  // Update state when modal opens
  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address?.address || "",
      });
      
      // Set initial address data for the dropdown
      setAddressData({
        provinceCode: user?.address?.provinceCode || null,
        districtCode: user?.address?.districtCode || null,
        wardCode: user?.address?.wardCode || null,
        province: user?.address?.province || "",
        district: user?.address?.district || "",
        ward: user?.address?.ward || "",
      });
    }
  }, [isOpenModalUpdateInfo, user]);

  // Open shipping info modal
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  // Calculate subtotal
  const priceMemo = useMemo(() => {
    const items = Array.isArray(order?.orderItemSelected) ? order.orderItemSelected : [];
    const result = items.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  // Calculate discount
  const discountPriceMemo = useMemo(() => {
    if (priceMemo > 100000) {
      return (Number(priceMemo) * 10) / 100;
    } else {
      return 0;
    }
  }, [priceMemo]);

  // Calculate tax
  const taxPriceMemo = useMemo(() => {
    return (priceMemo * 5) / 100;
  }, [priceMemo]);

  // Calculate shipping cost
  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 200000 && priceMemo < 500000) {
      return 10000;
    } else if (order?.orderItemSelected?.length === 0 || priceMemo >= 500000) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo, order?.orderItemSelected?.length]);

  // Calculate total
  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) -
      Number(discountPriceMemo) +
      Number(deliveryPriceMemo) +
      Number(taxPriceMemo)
    );
  }, [priceMemo, discountPriceMemo, deliveryPriceMemo, taxPriceMemo]);

  // Delete selected items
  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  // Navigate to payment page
  const handleCheckout = () => {
    if (!order?.orderItemSelected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };

  // User info update mutation
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return UserService.updateUser(id, { ...rests }, token);
  });

  const { isLoading } = mutationUpdate;

  // Cancel info update
  const handleCancelUpdate = () => {
    setStateUserDetails({ name: "", phone: "", address: "" });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  // Handle address selection change
  const handleAddressSelectChange = (data) => {
    setAddressData(data);
  };

  // Save user info update
  const handleUpdateInfoUser = async () => {
    const { name, address, phone } = stateUserDetails;
    
    if (!name || !address || !phone) {
      message.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    if (!addressData.province || !addressData.district || !addressData.ward) {
      message.error("Vui lòng chọn đầy đủ Tỉnh/Thành, Quận/Huyện, và Phường/Xã");
      return;
    }
    
    setIsUpdatingAddress(true);
    
    try {
      // Use the correct names from addressData
      const updatedAddressData = {
        address: String(address || ""),
        province: String(addressData.provinceName || ""),
        district: String(addressData.districtName || ""),
        ward: String(addressData.wardName || ""),
        provinceCode: String(addressData.province || ""),
        districtCode: String(addressData.district || ""),
        wardCode: String(addressData.ward || ""),
        city: `${addressData.wardName || ""}, ${addressData.districtName || ""}, ${addressData.provinceName || ""}`
      };
      
      // Update user info payload for API
      const updateData = {
        name: String(name || ""),
        phone: String(phone || ""),
        address: updatedAddressData
      };
      
      const res = await UserService.updateUser(
        user?.id, 
        updateData, 
        user?.access_token
      );
      
      if (res && res.status === "OK") {
        // Update Redux state with the corrected address data
        dispatch(updateUser({ 
          ...user, 
          name: String(name || ""), 
          phone: String(phone || ""), 
          address: updatedAddressData
        }));
        
        setIsOpenModalUpdateInfo(false);
        message.success("Cập nhật thông tin thành công");
      } else {
        message.error(getErrorMessage(res) || "Cập nhật thông tin thất bại");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      message.error(getErrorMessage(error) || "Đã có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setIsUpdatingAddress(false);
    }
  };

  // Update user details state
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Apply promo code
  const handleApplyPromoCode = () => {
    if (promoCode) {
      message.info(`Mã ${promoCode} không hợp lệ hoặc đã hết hạn`);
      setPromoCode("");
    }
  };

  // Continue shopping
  const handleContinueShopping = () => {
    navigate("/products");
  };

  // Shipping info steps
  const itemDelivery = [
    { title: "20.000đ", description: "Dưới 200.000đ" },
    { title: "10.000đ", description: "Từ 200.000đ đến dưới 500.000đ" },
    { title: "Miễn phí", description: "Trên 500.000đ" },
  ];

  // Get current shipping step
  const getCurrentStep = () => {
    if (priceMemo === 0 || order.orderItemSelected.length === 0) {
      return 0;
    } else if (priceMemo >= 500000) {
      return 3;
    } else if (priceMemo >= 200000) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <CartPageContainer>
      <CartPageContent>
        <CartHeader>
          <h1>Giỏ hàng</h1>
          <div className="continue-shopping" onClick={handleContinueShopping}>
            <ArrowLeftOutlined /> Tiếp tục mua sắm
          </div>
        </CartHeader>

        {isCartEmpty ? (
          <EmptyCart>
            <div className="empty-icon">
              <ShoppingCartOutlined />
            </div>
            <h3>Giỏ hàng của bạn đang trống</h3>
            <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Button 
              type="primary" 
              size="large"
              onClick={handleContinueShopping}
              style={{ 
                background: "#ff6683", 
                borderColor: "#ff6683" 
              }}
            >
              Khám phá sản phẩm
            </Button>
          </EmptyCart>
        ) : (
          <CartLayout>
            <WrapperLeft>
              <WrapperStyleHeaderDelivery>
                <div className="delivery-header">
                  Phí giao hàng
                </div>
                <StepComponent
                  items={itemDelivery}
                  current={getCurrentStep()}
                />
              </WrapperStyleHeaderDelivery>

              <WrapperStyleHeader>
                <div>
                  <CustomCheckbox
                    onChange={handleOnChangeCheckAll}
                    checked={listChecked?.length === order?.orderItems?.length}
                  />
                </div>
                <span className="product-col">Sản phẩm</span>
                <span className="price-col">Đơn giá</span>
                <span className="quantity-col">Số lượng</span>
                <div style={{ cursor: "pointer" }} onClick={handleRemoveAllOrder}>
                  <DeleteOutlined style={{ color: listChecked?.length > 0 ? "#ff6683" : "#ccc" }} />
                </div>
              </WrapperStyleHeader>

              <WrapperListOrder>
                {order?.orderItems?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.product}>
                      <div>
                        <CustomCheckbox
                          onChange={onChange}
                          value={order?.product}
                          checked={listChecked.includes(order?.product)}
                        />
                      </div>
                      <div className="product-info">
                        <img
                          src={order?.image}
                          alt={order?.name}
                        />
                        <div className="product-details">
                          <div className="product-name">{order?.name}</div>
                          <div className="product-type">{order?.type}</div>
                        </div>
                      </div>
                      <div className="product-price">
                        {convertPrice(order?.price)}
                        {order?.discount > 0 && (
                          <WrapperPriceDiscount>
                            {convertPrice(order?.price * (1 + order?.discount/100))}
                          </WrapperPriceDiscount>
                        )}
                      </div>
                      <WrapperCountOrder>
                        <div 
                          className={`count-button ${order?.amount <= 1 ? 'disabled' : ''}`}
                          onClick={() => handleChangeCount("decrease", order?.product)}
                        >
                          <MinusOutlined />
                        </div>
                        <input 
                          className="count-input"
                          value={order?.amount}
                          readOnly
                        />
                        <div 
                          className={`count-button ${order?.amount >= order?.countInStock ? 'disabled' : ''}`}
                          onClick={() => handleChangeCount(
                            "increase", 
                            order?.product, 
                            order?.amount === order?.countInStock
                          )}
                        >
                          <PlusOutlined />
                        </div>
                      </WrapperCountOrder>
                      <div 
                        className="delete-button"
                        onClick={() => handleDeleteOrder(order?.product)}
                      >
                        <DeleteOutlined />
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperListOrder>
            </WrapperLeft>

            <WrapperRight>
              {user?.name && user?.address && (
                <ShippingInfo>
                  <div className="info-header">
                    <div className="title">
                      <InfoCircleOutlined /> Thông tin giao hàng
                    </div>
                    <div className="edit-button" onClick={handleChangeAddress}>
                      Chỉnh sửa
                    </div>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-label">
                      <UserOutlined /> Người nhận:
                    </div>
                    <div className="info-value">{user?.name || "Chưa cập nhật"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">
                      <PhoneOutlined /> Số điện thoại:
                    </div>
                    <div className="info-value">{user?.phone || "Chưa cập nhật"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">
                      <EnvironmentOutlined /> Địa chỉ:
                    </div>
                    <div className="info-value">
                      {user?.address?.address ? (
                        <>
                          {user?.address?.address}
                          {user?.address?.ward && `, ${user?.address?.ward}`}
                          {user?.address?.district && `, ${user?.address?.district}`}
                          {user?.address?.province && `, ${user?.address?.province}`}
                        </>
                      ) : (
                        "Chưa cập nhật"
                      )}
                    </div>
                  </div>
                </ShippingInfo>
              )}

              <PromoCode>
                <div className="promo-header">
                  <TagOutlined /> Mã giảm giá
                </div>
                <div className="promo-input">
                  <input 
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button onClick={handleApplyPromoCode}>Áp dụng</button>
                </div>
              </PromoCode>

              <OrderSummary>
                <WrapperInfo>
                  <div className="summary-title">Thông tin đơn hàng</div>
                  <div className="summary-row">
                    <div className="label">Tạm tính:</div>
                    <div className="value">{convertPrice(priceMemo)}</div>
                  </div>
                  <div className="summary-row discount">
                    <div className="label">Giảm giá:</div>
                    <div className="value">- {convertPrice(discountPriceMemo)}</div>
                  </div>
                  <div className="summary-row">
                    <div className="label">
                      Phí giao hàng:
                      <Tooltip title="Miễn phí giao hàng cho đơn hàng từ 500.000đ">
                        <QuestionCircleOutlined style={{ marginLeft: '5px' }} />
                      </Tooltip>
                    </div>
                    <div className="value">
                      {deliveryPriceMemo === 0 && priceMemo >= 500000 ? (
                        <span className="free-shipping-badge">Miễn phí</span>
                      ) : (
                        convertPrice(deliveryPriceMemo)
                      )}
                    </div>
                  </div>
                  <div className="summary-row">
                    <div className="label">VAT (5%):</div>
                    <div className="value">{convertPrice(taxPriceMemo)}</div>
                  </div>
                  
                  <div className="shipping-method">
                    <div className="method-title">Phương thức vận chuyển:</div>
                    <div className="method-options">
                      <div className="method-option selected">
                        <div className="radio-button"></div>
                        <div className="method-details">
                          <div className="method-name">Giao hàng tiêu chuẩn</div>
                          <div className="method-time">Nhận hàng trong 2-3 ngày</div>
                        </div>
                        <div className="method-price">
                          {priceMemo >= 500000 ? 'Miễn phí' : convertPrice(deliveryPriceMemo)}
                        </div>
                      </div>
                      <div className="method-option disabled">
                        <div className="radio-button"></div>
                        <div className="method-details">
                          <div className="method-name">Giao hàng nhanh</div>
                          <div className="method-time">Nhận hàng trong 24h</div>
                        </div>
                        <div className="method-price">+30.000đ</div>
                      </div>
                    </div>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <div className="total-row">
                    <div className="total-label">Tổng tiền:</div>
                    <div className="total-value">{convertPrice(totalPriceMemo)}</div>
                  </div>
                  {priceMemo >= 500000 && (
                    <div className="shipping-badge">
                      <CheckOutlined /> Bạn được miễn phí vận chuyển
                    </div>
                  )}
                  <button 
                    className="checkout-button"
                    onClick={handleCheckout}
                    disabled={order?.orderItemSelected?.length === 0}
                  >
                    Mua hàng <CreditCardOutlined />
                  </button>
                  <div className="note">
                    (Đã bao gồm VAT nếu có)
                  </div>
                </WrapperTotal>
              </OrderSummary>
            </WrapperRight>
          </CartLayout>
        )}

        <Modal
          title="Cập nhật thông tin giao hàng"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancelUpdate}
          footer={[
            <Button key="back" onClick={handleCancelUpdate}>
              Hủy bỏ
            </Button>,
            <Button
              key="submit"
              type="primary"
              style={{ background: "#ff6683", borderColor: "#ff6683" }}
              onClick={handleUpdateInfoUser}
              loading={isUpdatingAddress}
            >
              Lưu thông tin
            </Button>,
          ]}
          width={700}
        >
          <Form
            name="update-shipping"
            layout="vertical"
            initialValues={{
              name: stateUserDetails.name,
              phone: stateUserDetails.phone,
              address: stateUserDetails.address,
            }}
          >
            <Form.Item
              label="Họ tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input
                name="name"
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                placeholder="Nhập họ tên người nhận"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            
            <Form.Item
              label="Số điện thoại"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            >
              <Input
                name="phone"
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                placeholder="Nhập số điện thoại"
                prefix={<PhoneOutlined />}
              />
            </Form.Item>
            
            <Form.Item
              label="Địa chỉ chi tiết"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ chi tiết" }]}
            >
              <Input
                name="address"
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                placeholder="Số nhà, tên đường, khu dân cư..."
                prefix={<EnvironmentOutlined />}
              />
            </Form.Item>
            
            <Form.Item
              label="Chọn địa chỉ"
              required
              extra="Vui lòng chọn đầy đủ Tỉnh/Thành, Quận/Huyện, và Phường/Xã"
            >
              <AddressSelect 
                onChange={handleAddressSelectChange} 
                defaultValues={addressData}
              />
            </Form.Item>
          </Form>
        </Modal>
      </CartPageContent>
    </CartPageContainer>
  );
};

export default OrderPage;
