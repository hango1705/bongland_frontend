import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Spin } from "antd";
import { 
  ProductDetailsContainer, 
  ProductDetailsBreadcrumb, 
  ProductDetailsContent,
  RelatedProductsSection,
  SectionTitle
} from "./style";
import CardComponent from "../../components/CardComponent/CardComponent";

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

  // Mock related products - in a real app, you would fetch these from the API
  const relatedProducts = [
    {
      id: "1",
      name: "Gấu Bông Teddy Brown",
      price: 250000,
      image: "https://source.unsplash.com/random/400x400/?teddy,bear",
      rating: 4.5,
      sold: 200,
      countInStock: 50,
    },
    {
      id: "2",
      name: "Gấu Bông Panda",
      price: 320000,
      image: "https://source.unsplash.com/random/400x400/?panda,toy",
      rating: 4.8,
      sold: 300,
      countInStock: 30,
      discount: 10,
    },
    {
      id: "3",
      name: "Thú Bông Pikachu",
      price: 180000,
      image: "https://source.unsplash.com/random/400x400/?yellow,toy",
      rating: 4.7,
      sold: 500,
      countInStock: 20,
      discount: 15,
    },
    {
      id: "4",
      name: "Gấu Bông Stitch",
      price: 280000,
      image: "https://source.unsplash.com/random/400x400/?blue,plush",
      rating: 4.9,
      sold: 400,
      countInStock: 15,
    },
  ];

  return (
    <ProductDetailsContainer>
      <ProductDetailsBreadcrumb>
        <Breadcrumb
          items={[
            {
              title: (
                <span onClick={() => navigate("/")} className="breadcrumb-link">
                  <HomeOutlined /> Trang chủ
                </span>
              ),
            },
            {
              title: productDetails?.type && (
                <span 
                  onClick={() => handleNavigateType(productDetails?.type)} 
                  className="breadcrumb-link"
                >
                  {productDetails?.type}
                </span>
              ),
            },
            {
              title: <span className="breadcrumb-current">{productDetails?.name}</span>,
            },
          ]}
          separator={<RightOutlined />}
        />
      </ProductDetailsBreadcrumb>

      <ProductDetailsContent>
        {isPending ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <ProductDetailsComponent idProduct={id} />
        )}
      </ProductDetailsContent>

      <RelatedProductsSection>
        <SectionTitle>Sản phẩm tương tự</SectionTitle>
        <div className="related-products-grid">
          {relatedProducts.map((product) => (
            <CardComponent
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              sold={product.sold}
              countInStock={product.countInStock}
              discount={product.discount}
              type={productDetails?.type}
            />
          ))}
        </div>
      </RelatedProductsSection>
    </ProductDetailsContainer>
  );
};

export default ProductDetailsPage;
