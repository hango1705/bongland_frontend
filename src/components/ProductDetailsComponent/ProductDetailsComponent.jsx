import React, { useEffect, useState } from "react";
import { Image, Row, Col, Tooltip } from "antd";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperDescriptionProduct,
  WrapperQualityProduct,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  ProductImageContainer,
  ThumbnailsContainer,
  WrapperStyleImageSmall,
  RatingContainer,
  ActionsContainer,
  StockInfoContainer,
  ProductDetailsGrid,
  ProfileValue
} from "./style";
import { 
  PlusOutlined, 
  MinusOutlined, 
  ShoppingCartOutlined, 
  ThunderboltOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  HeartOutlined
} from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { StarFilled } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";

const ProductDetailsComponent = ({ idProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [numProduct, setNumProduct] = useState(1);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  const [formData, setFormData] = useState({
    address: "",
    city: ""
  });
    useEffect(() => {
      setFormData({
        address: user?.address?.address || "",
        city: user?.address?.city || ""
      });
    }, [user]);
    const handleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };
  
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order.isSuccessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSuccessOrder]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };
  
  const { isPending, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });
  
  const renderStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <StarFilled
          key={i}
          style={{ fontSize: "14px", color: "rgb(253,216,54)" }}
        />
      );
    }
    return stars;
  };
  
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInStock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInStock: productDetails?.countInStock,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  // Generate sample thumbnail images for demo purposes
  const getProductThumbnails = (mainImage) => {
    if (!mainImage) return [];
    return [
      mainImage,
      mainImage.replace('random', 'random/1'),
      mainImage.replace('random', 'random/2'),
      mainImage.replace('random', 'random/3'),
    ];
  };

  // Get stock status for display
  const getStockStatus = (countInStock) => {
    if (!countInStock || countInStock === 0) {
      return { text: 'Hết hàng', className: 'out-of-stock' };
    } else if (countInStock < 10) {
      return { text: `Còn ${countInStock} sản phẩm`, className: 'low-stock' };
    } else {
      return { text: 'Còn hàng', className: 'in-stock' };
    }
  };

  // Calculate original price if there's a discount
  const calculateOriginalPrice = (price, discount) => {
    if (!discount) return null;
    return Math.round(price / (1 - discount / 100));
  };

  return (
    <Loading isPending={isPending}>
      <ProductDetailsGrid>
        <div className="product-images">
          <ProductImageContainer>
            <Image
              src={productDetails?.image}
              alt={productDetails?.name}
              preview={{ zIndex: 2000 }}
            />
          </ProductImageContainer>
          
          <ThumbnailsContainer>
            {productDetails?.image && getProductThumbnails(productDetails.image).map((img, index) => (
              <WrapperStyleImageSmall
                key={index}
                src={img}
                alt={`${productDetails?.name} thumbnail ${index + 1}`}
                preview={false}
                onClick={() => setSelectedImage(index)}
                style={{ 
                  borderColor: selectedImage === index ? '#ff6683' : 'transparent',
                  opacity: selectedImage === index ? 1 : 0.7
                }}
              />
            ))}
          </ThumbnailsContainer>
        </div>

        <div className="product-info">
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          
          <RatingContainer>
            <span className="rating-number">{productDetails?.rating || 4.8}</span>
            <div className="stars">{renderStars(Math.round(productDetails?.rating || 4.8))}</div>
            <WrapperStyleTextSell>
              Đã bán {productDetails?.sold || 1000}+
            </WrapperStyleTextSell>
          </RatingContainer>

          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productDetails?.price)}
              {productDetails?.discount && (
                <>
                  <span className="original-price">
                    {convertPrice(calculateOriginalPrice(productDetails.price, productDetails.discount))}
                  </span>
                  <span className="discount-badge">-{productDetails.discount}%</span>
                </>
              )}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>

          <StockInfoContainer>
            <div 
              className={`stock-status ${getStockStatus(productDetails?.countInStock).className}`}
            >
              <InfoCircleOutlined style={{ marginRight: '5px' }} />
              {getStockStatus(productDetails?.countInStock).text}
            </div>
          </StockInfoContainer>

          <WrapperDescriptionProduct>
            <div className="description-title">Mô tả sản phẩm</div>
            <div className="description-content">
              {productDetails?.description || 'Sản phẩm gấu bông chất lượng cao, được làm từ chất liệu an toàn, mềm mại, phù hợp làm quà tặng cho người thân và bạn bè.'}
            </div>
          </WrapperDescriptionProduct>

          <WrapperAddressProduct>
            <EnvironmentOutlined />
            <span>Giao đến</span>
              <div className="value-container">
                <ProfileValue>
                  {formData.address && formData.city
                    ? `${formData.address}, ${formData.city}`
                    : "Chưa cập nhật"}
                </ProfileValue>
                {/* <UpdateButton onClick={() => toggleEditMode('address')}>
                  <EditOutlined /> Sửa
                </UpdateButton> */}
              </div>
          </WrapperAddressProduct>

          <div style={{ margin: "15px 0" }}>
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button
                onClick={() => handleChangeCount("decrease", numProduct === 1)}
                disabled={numProduct === 1}
              >
                <MinusOutlined />
              </button>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                max={productDetails?.countInStock}
                min={1}
                value={numProduct}
                size="small"
                controls={false}
              />
              <button
                onClick={() => 
                  handleChangeCount(
                    "increase", 
                    numProduct === productDetails?.countInStock
                  )
                }
                disabled={
                  numProduct === productDetails?.countInStock || 
                  productDetails?.countInStock === 0
                }
              >
                <PlusOutlined />
              </button>
            </WrapperQualityProduct>
            {errorLimitOrder && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                Số lượng sản phẩm đã đạt mức tối đa
              </div>
            )}
          </div>

          <ActionsContainer>
            <button 
              className="add-to-cart"
              onClick={handleAddOrderProduct}
              disabled={productDetails?.countInStock === 0}
            >
              <ShoppingCartOutlined className="icon" />
              Thêm vào giỏ
            </button>
            <button className="buy-now">
              <ThunderboltOutlined className="icon" />
              Mua ngay
            </button>
          </ActionsContainer>

          <div style={{ marginTop: '20px' }}>
            <LikeButtonComponent
              dataHref={
                process.env.REACT_APP_IS_LOCAL
                  ? "https://developers.facebook.com/docs/plugins/"
                  : window.location.href
              }
            />
          </div>
        </div>
      </ProductDetailsGrid>

      <div style={{ padding: '20px 30px' }}>
        <CommentComponent
          dataHref={
            process.env.REACT_APP_IS_LOCAL
              ? "https://developers.facebook.com/docs/plugins/"
              : window.location.href
          }
          width="100%"
        />
      </div>
    </Loading>
  );
};

export default ProductDetailsComponent;
