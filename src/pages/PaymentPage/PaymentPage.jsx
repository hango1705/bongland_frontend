import React, { useEffect, useMemo, useState } from 'react';
import {
  PaymentContainer,
  PaymentContent,
  PaymentHeader,
  PaymentLayout,
  PaymentSection,
  PaymentSectionHeader,
  PaymentSectionContent,
  ShippingInfo,
  SpecialInstructions,
  ShippingMethod,
  ShippingMethodOption,
  PaymentMethod,
  PaymentMethodOption,
  PaymentSummary,
  OrderProducts,
  OrderProduct,
  OrderSummaryInfo,
  CheckoutSteps,
} from './style';
import { Form, Modal, Input, message, Spin } from 'antd';
import { 
  ArrowLeftOutlined, 
  UserOutlined, 
  PhoneOutlined, 
  HomeOutlined, 
  LockOutlined,
  CheckCircleOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  TruckOutlined,
  EnvironmentOutlined,
  CheckOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import Loading from '../../components/LoadingComponent/Loading';
import * as OrderService from '../../services/OrderService';
import * as UserService from '../../services/UserService';
import jwt_decode from 'jwt-decode';
import { useMutationHooks } from '../../hooks/UseMutationHook';
import { resetOrder } from '../../redux/slides/orderSlide';
import { updateUser } from '../../redux/slides/userSlide';
import AddressSelect from '../../components/AddressSelect/AddressSelect';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  
  // States
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [addressData, setAddressData] = useState({
    province: '',
    district: '',
    ward: '',
    provinceName: '',
    districtName: '',
    wardName: '',
  });
  
  // Get user and cart data from Redux store
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const cart = useMemo(() => {
    if (order?.orderItems) {
      return order;
    }
    return null;
  }, [order]);

  // Handle delivery method change
  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Navigate back to cart
  const handleReturnToCart = () => {
    navigate('/cart');
  };

  // Open modal to change address
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
    form.setFieldsValue({
      fullName: user?.name,
      phone: user?.phone,
      address: user?.address,
      province: user?.city?.split(', ')[0] || '',
      district: user?.city?.split(', ')[1] || '',
      ward: user?.city?.split(', ')[2] || '',
    });
  };

  // Handle address select change
  const handleAddressSelectChange = (values) => {
    setAddressData(values);
  };

  // Update user address
  const handleUpdateAddress = (values) => {
    const updatedAddressData = {
      name: values.fullName,
      phone: values.phone,
      address: values.address,
      province: values.province,
      district: values.district,
      ward: values.ward,
      provinceName: values.provinceName,
      districtName: values.districtName,
      wardName: values.wardName,
      city: `${values.wardName}, ${values.districtName}, ${values.provinceName}`,
    };

    updateUserInfo(updatedAddressData);
  };

  // Mutation hook for updating user info
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, access_token, ...rests } = data;
      return UserService.updateUser(id, rests, access_token);
    }
  );

  const { isLoading: isUpdatingAddress, isSuccess: isUpdateSuccess } = mutationUpdate;

  // Update user info with new address data
  const updateUserInfo = async (data) => {
    if (user?.id && user?.access_token) {
      mutationUpdate.mutate({
        id: user?.id,
        ...data,
        access_token: user?.access_token,
      }, {
        onSuccess: () => {
          dispatch(updateUser({ ...user, ...data }));
          setIsOpenModalUpdateInfo(false);
          message.success('Cập nhật thông tin thành công');
        },
        onError: (error) => {
          message.error('Có lỗi xảy ra: ' + error.message);
        }
      });
    }
  };

  // Calculate prices based on delivery method
  const priceMemo = useMemo(() => {
    return order?.orderItems?.reduce((total, item) => {
      return total + (item.price * item.amount);
    }, 0);
  }, [order]);

  const shippingPriceMemo = useMemo(() => {
    if (priceMemo >= 500000) return 0;
    return deliveryMethod === 'express' ? 60000 : 30000;
  }, [deliveryMethod, priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return priceMemo + shippingPriceMemo;
  }, [priceMemo, shippingPriceMemo]);

  // Create order data for submission
  const createOrderData = () => {
    // Check if user is logged in
    if (!user?.id) {
      message.error('Vui lòng đăng nhập để đặt hàng');
      return null;
    }

    // Check if cart is empty
    if (!order?.orderItems || order.orderItems.length === 0) {
      message.error('Giỏ hàng của bạn đang trống');
      return null;
    }

    // Check if shipping info is complete
    if (!user?.name || !user?.phone || !user?.address || !user?.city) {
      message.error('Vui lòng cập nhật đầy đủ thông tin giao hàng');
      return null;
    }

    // Create order data object
    return {
      orderItems: order.orderItems.map(item => ({
        name: item.name,
        amount: item.amount,
        image: item.image,
        price: item.price,
        product: item.product,
        discount: item.discount || 0
      })),
      shippingAddress: {
        fullName: user.name,
        address: user.address,
        city: user.city,
        phone: user.phone,
      },
      paymentMethod,
      deliveryMethod,
      itemsPrice: priceMemo,
      shippingPrice: shippingPriceMemo,
      totalPrice: totalPriceMemo,
      notes: specialInstructions,
      user: user.id,
    };
  };

  // Check if can proceed with order
  const canProceed = useMemo(() => {
    return (
      user?.id && 
      order?.orderItems?.length > 0 && 
      user?.name && 
      user?.phone && 
      user?.address && 
      user?.city
    );
  }, [user, order]);

  // Handle place order
  const handleAddOrder = async () => {
    try {
      setIsProcessingOrder(true);
      
      const orderData = createOrderData();
      if (!orderData) {
        setIsProcessingOrder(false);
        return;
      }

      const res = await OrderService.createOrder(orderData, user?.access_token);
      
      if (res && res.status === 'OK') {
        message.success('Đặt hàng thành công');
        dispatch(resetOrder());
        navigate('/order-success', { 
          state: { 
            orderInfo: res.data,
            paymentMethod: paymentMethod 
          } 
        });
      } else {
        message.error(res?.message || 'Có lỗi xảy ra khi đặt hàng');
      }
    } catch (error) {
      console.error("Order error:", error);
      message.error('Có lỗi xảy ra khi đặt hàng');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  // Check if payment is available (component ready)
  if (!cart?.orderItems) {
    return <Loading />;
  }

  return (
    <PaymentContainer>
      <PaymentContent>
        <PaymentHeader>
          <div className="return-to-cart" onClick={handleReturnToCart}>
            <ArrowLeftOutlined style={{ marginRight: 8 }} /> Quay lại giỏ hàng
          </div>
          <h1>Thanh toán</h1>
        </PaymentHeader>
        
        <CheckoutSteps>
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-text">Giỏ hàng</div>
          </div>
          <div className="step">
            <div className="step-number" style={{ backgroundColor: '#ff6683', color: 'white' }}>2</div>
            <div className="step-text" style={{ color: '#333' }}>Thanh toán</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">Hoàn tất</div>
          </div>
        </CheckoutSteps>
        
        <PaymentLayout>
          <div style={{ flex: 1 }}>
            <PaymentSection>
              <PaymentSectionHeader>
                <UserOutlined className="icon" />
                <div className="title">Thông tin giao hàng</div>
              </PaymentSectionHeader>
              <PaymentSectionContent>
                <ShippingInfo>
                  <div className="shipping-address">
                    <div className="address-header">
                      <div className="title">Thông tin người nhận</div>
                      <div className="edit-button" onClick={handleChangeAddress}>Thay đổi</div>
                    </div>
                    <div className="address-details">
                      <div className="info-item">
                        <div className="label"><UserOutlined /> Họ tên:</div>
                        <div className="value">{user?.name || 'Chưa cập nhật'}</div>
                      </div>
                      <div className="info-item">
                        <div className="label"><PhoneOutlined /> Số điện thoại:</div>
                        <div className="value">{user?.phone || 'Chưa cập nhật'}</div>
                      </div>
                      <div className="info-item">
                        <div className="label"><EnvironmentOutlined /> Địa chỉ:</div>
                        <div className="value">
                          {user?.address ? `${user.address}, ${user.city}` : 'Chưa cập nhật'}
                        </div>
                      </div>
                    </div>
                  </div>
                </ShippingInfo>
                
                <SpecialInstructions>
                  <div className="instructions-label">Ghi chú đơn hàng (tùy chọn)</div>
                  <textarea 
                    placeholder="Nhập ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    maxLength={500}
                  />
                </SpecialInstructions>
              </PaymentSectionContent>
            </PaymentSection>
            
            <PaymentSection>
              <PaymentSectionHeader>
                <TruckOutlined className="icon" />
                <div className="title">Phương thức vận chuyển</div>
              </PaymentSectionHeader>
              <PaymentSectionContent>
                <ShippingMethod>
                  <div className="method-options">
                    <ShippingMethodOption 
                      $selected={deliveryMethod === 'standard'}
                      onClick={() => handleDeliveryMethodChange('standard')}
                    >
                      <div className="method-logo">
                        <img src="https://cdn-icons-png.flaticon.com/512/2721/2721561.png" alt="Standard" />
                      </div>
                      <div className="method-info">
                        <div className="method-name">Giao hàng tiêu chuẩn</div>
                        <div className="method-description">Nhận hàng trong 3-5 ngày</div>
                      </div>
                      <div className="method-price">
                        {priceMemo >= 500000 ? 'Miễn phí' : convertPrice(30000)}
                      </div>
                    </ShippingMethodOption>
                    
                    <ShippingMethodOption 
                      $selected={deliveryMethod === 'express'}
                      onClick={() => handleDeliveryMethodChange('express')}
                    >
                      <div className="method-logo">
                        <img src="https://cdn-icons-png.flaticon.com/512/2518/2518048.png" alt="Fast" />
                      </div>
                      <div className="method-info">
                        <div className="method-name">Giao hàng nhanh</div>
                        <div className="method-description">Nhận hàng trong 1-2 ngày</div>
                      </div>
                      <div className="method-price">
                        {priceMemo >= 500000 ? 'Miễn phí' : convertPrice(60000)}
                      </div>
                    </ShippingMethodOption>
                  </div>
                </ShippingMethod>
              </PaymentSectionContent>
            </PaymentSection>
            
            <PaymentSection>
              <PaymentSectionHeader>
                <CreditCardOutlined className="icon" />
                <div className="title">Phương thức thanh toán</div>
              </PaymentSectionHeader>
              <PaymentSectionContent>
                <PaymentMethod>
                  <div className="payment-options">
                    <PaymentMethodOption 
                      $selected={paymentMethod === 'cod'}
                      onClick={() => handlePaymentMethodChange('cod')}
                    >
                      <div className="payment-logo">
                        <img src="https://cdn-icons-png.flaticon.com/512/1554/1554401.png" alt="COD" />
                      </div>
                      <div className="payment-info">
                        <div className="payment-name">Thanh toán khi nhận hàng</div>
                        <div className="payment-description">Thanh toán bằng tiền mặt khi nhận hàng</div>
                      </div>
                    </PaymentMethodOption>
                    
                    <PaymentMethodOption 
                      $selected={paymentMethod === 'bank'}
                      onClick={() => handlePaymentMethodChange('bank')}
                    >
                      <div className="payment-logo">
                        <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Bank" />
                      </div>
                      <div className="payment-info">
                        <div className="payment-name">Chuyển khoản ngân hàng</div>
                        <div className="payment-description">Thanh toán qua tài khoản ngân hàng</div>
                      </div>
                    </PaymentMethodOption>
                    
                    <PaymentMethodOption 
                      $selected={paymentMethod === 'momo'}
                      onClick={() => handlePaymentMethodChange('momo')}
                    >
                      <div className="payment-logo">
                        <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png" alt="MoMo" />
                      </div>
                      <div className="payment-info">
                        <div className="payment-name">Ví MoMo</div>
                        <div className="payment-description">Thanh toán qua ví điện tử MoMo</div>
                      </div>
                    </PaymentMethodOption>
                  </div>
                </PaymentMethod>
              </PaymentSectionContent>
            </PaymentSection>
          </div>
          
          <PaymentSummary>
            <OrderProducts>
              <div className="summary-title">
                Sản phẩm 
                <span className="items-count">({order?.orderItems?.length || 0} sản phẩm)</span>
              </div>
              <div className="product-list">
                {order?.orderItems?.map((item) => (
                  <OrderProduct key={item.product}>
                    <div className="product-image">
                      <img src={item.image} alt={item.name} />
                      <div className="quantity-badge">{item.amount}</div>
                    </div>
                    <div className="product-details">
                      <div className="product-name">{item.name}</div>
                      <div className="product-price">{convertPrice(item.price)}</div>
                    </div>
                  </OrderProduct>
                ))}
              </div>
            </OrderProducts>
            <OrderSummaryInfo>
              <div className="summary-row">
                <div className="label">Tạm tính</div>
                <div className="value">{convertPrice(priceMemo || 0)}</div>
              </div>
              <div className="summary-row">
                <div className="label">Phí vận chuyển</div>
                <div className="value">
                  {priceMemo >= 500000 
                    ? 'Miễn phí' 
                    : convertPrice(shippingPriceMemo)
                  }
                </div>
              </div>
              <div className="divider"></div>
              <div className="total-row">
                <div className="total-label">Tổng cộng</div>
                <div className="total-value">{convertPrice(totalPriceMemo)}</div>
              </div>
              <button 
                className="order-button" 
                onClick={handleAddOrder}
                disabled={!canProceed || isProcessingOrder}
              >
                {isProcessingOrder ? <Spin size="small" /> : 'Đặt hàng'}
              </button>
              <div className="note">
                Bằng cách đặt hàng, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của Bông Land
              </div>
              <div className="secure-payment">
                <LockOutlined /> Thanh toán an toàn & bảo mật
              </div>
            </OrderSummaryInfo>
          </PaymentSummary>
        </PaymentLayout>

        {/* Modal update user info */}
        <Modal
          title="Cập nhật thông tin giao hàng"
          open={isOpenModalUpdateInfo}
          onCancel={() => setIsOpenModalUpdateInfo(false)}
          onOk={() => form.submit()}
          okText="Cập nhật"
          cancelText="Hủy"
          confirmLoading={isUpdatingAddress}
          width={700}
        >
          <Form
            name="update-address"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={handleUpdateAddress}
            layout="vertical"
          >
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input placeholder="Nhập họ tên người nhận" />
            </Form.Item>
            
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            
            <Form.Item
              label="Địa chỉ chi tiết"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết' }]}
            >
              <Input placeholder="Số nhà, tên đường, khu dân cư..." />
            </Form.Item>
            
            <Form.Item
              label="Tỉnh/Thành phố"
              name="province"
              rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố' }]}
            >
              <Input placeholder="Nhập tỉnh/thành phố" />
            </Form.Item>
            
            <Form.Item
              label="Quận/Huyện"
              name="district"
              rules={[{ required: true, message: 'Vui lòng nhập quận/huyện' }]}
            >
              <Input placeholder="Nhập quận/huyện" />
            </Form.Item>
            
            <Form.Item
              label="Phường/Xã"
              name="ward"
              rules={[{ required: true, message: 'Vui lòng nhập phường/xã' }]}
            >
              <Input placeholder="Nhập phường/xã" />
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
      </PaymentContent>
    </PaymentContainer>
  );
};

export default PaymentPage;
