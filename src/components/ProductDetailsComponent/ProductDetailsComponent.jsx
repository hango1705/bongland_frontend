import { Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import imageProduct from "../../assets/images/teddy-socola-2-500x500.webp";
import imageProductSmall from "../../assets/images/teddy-socola-10-100x100.webp";
import {
  WrapperAddressProduct,
  WrapperColImage,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperDescriptionProduct,
  WrapperQualityProduct,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
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
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const onChange = (value) => {
    setNumProduct(Number(value));
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
          style={{ fontSize: "12px", color: "rgb(253,216,54)" }}
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
  return (
    <Loading isPending={isPending}>
      <Row style={{ padding: "16px", background: "#fff" }}>
        <Col span={11} style={{ border: "3px solid #e5e5e5" }}>
          <Image
            src={productDetails?.image}
            alt="image product"
            preview={false}
          />
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            <WrapperColImage span={4}>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt="image product small"
                preview={false}
              />
            </WrapperColImage>
            <WrapperColImage span={4}>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt="image product small"
                preview={false}
              />
            </WrapperColImage>
            <WrapperColImage span={4}>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt="image product small"
                preview={false}
              />
            </WrapperColImage>
            <WrapperColImage span={4}>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt="image product small"
                preview={false}
              />
            </WrapperColImage>
            <WrapperColImage span={4}>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt="image product small"
                preview={false}
              />
            </WrapperColImage>
          </Row>
        </Col>
        <Col span={13}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div style={{ marginLeft: "10px" }}>
            <span style={{ marginRight: "5px" }}>{productDetails?.rating}</span>
            {renderStars(productDetails?.rating)}
            <WrapperStyleTextSell>
              | Đã bán {productDetails?.sold || 1000}+
            </WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productDetails?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperDescriptionProduct>
            <div style={{ fontSize: "20px", marginBottom: "10px" }}>
              Mô tả sản phẩm
            </div>
            {productDetails?.description}
          </WrapperDescriptionProduct>
          <WrapperAddressProduct>
            <span>Giao đến</span>
            <span className="address">{user?.address}</span>
            <span className="change-address">Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <LikeButtonComponent
            dataHref={
              process.env.REACT_APP_IS_LOCAL
                ? "https://developers.facebook.com/docs/plugins/"
                : window.location.href
            }
          />
          <div
            style={{
              margin: "10px 0 20px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div style={{ margin: "6px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("decrease", numProduct === 1)}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                max={productDetails?.countInStock}
                min={1}
                value={numProduct}
                size="small"
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleChangeCount(
                    "increase",
                    numProduct === productDetails?.countInStock
                  )
                }
              >
                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ padding: "10px" }}>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              onClick={handleAddOrderProduct}
              textButton={"Chọn mua"}
              styleTextButton={{ color: "#fff" }}
            />
            {errorLimitOrder && (
              <div style={{ color: "red" }}>San pham het hang</div>
            )}
          </div>
        </Col>
        <CommentComponent
          dataHref={
            process.env.REACT_APP_IS_LOCAL
              ? "https://developers.facebook.com/docs/plugins/comments#configurator"
              : window.location.href
          }
          width="1080"
        />
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
