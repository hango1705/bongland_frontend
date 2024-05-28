import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
  };
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(id);
    return res.data;
  };
  const { isPending, data: productDetails } = useQuery({
    queryKey: ["product-details", id],
    queryFn: fetchGetDetailsProduct,
    enabled: !!id,
  });
  return (
    <div style={{ width: "1349px", background: "#efefef", height: "100%" }}>
      <h5
        style={{
          fontSize: "18px",
          height: "1px",
          paddingTop: "10px",
          paddingLeft: "125px",
          marginTop: "10px",
        }}
      >
        <span
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </span>
        {" > "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleNavigateType(productDetails?.type)}
        >
          {productDetails?.type}
        </span>
        {" > "} <span>{productDetails?.name}</span>
      </h5>
      <div style={{ width: "1100px", margin: "30px auto" }}>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
