import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/Slider1.jpg";
import slider2 from "../../assets/images/Slider2.png";
import slider3 from "../../assets/images/Slider3.jpg";
import slider4 from "../../assets/images/Slider4.jpg";
import slider5 from "../../assets/images/Slider5.jpg";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { retry } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [limit, setLimit] = useState(10);
  const [typeProduct, setTypeProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAllProduct = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
  };

  const {
    isPending,
    data: products,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <Loading isPending={isPending || loading}>
      <div
        style={{
          padding: "0 120px 0px 120px",
          background: "#fdafbc",
          margin: "0 auto",
        }}
      >
        <WrapperTypeProduct>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            TRANG CHỦ
          </span>
          {typeProduct.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        id="container"
        style={{ padding: "0 0 30px 0", height: "fit-content", width: "100%" }}
      >
        <SliderComponent
          arrImages={[slider1, slider2, slider3, slider4, slider5]}
        />
        <div
          style={{
            marginTop: "20px",
            gap: "30px",
            padding: "0 120px",
          }}
        >
          <h1
            style={{
              color: "#ff6683",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            BÔNG LAND ONLINE - THÚ BÔNG ĐẸP VÀ CAO CẤP
          </h1>
        </div>
        <WrapperProducts>
          {products?.data?.map((product) => {
            return (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                sold={product.sold}
                id={product._id}
              />
            );
          })}
        </WrapperProducts>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <WrapperButtonMore
            textButton={isPlaceholderData ? "Load more" : "Xem thêm"}
            type="outline"
            styleButton={{
              border: "1px solid #ff6683",
              color: `${
                products?.total === products?.data?.length ? "#ccc" : "#ff6683"
              }`,
              width: "240px",
              height: "38px",
              borderRadius: "4px",
            }}
            disabled={
              products?.total === products?.data?.length ||
              products?.totalPage === 1
            }
            styleTextButton={{
              fontWeight: 500,
              color: products?.total === products?.data?.length && "#fff",
            }}
            onClick={() => setLimit((prev) => prev + 10)}
          />
        </div>
      </div>
    </Loading>
  );
};
export default HomePage;
