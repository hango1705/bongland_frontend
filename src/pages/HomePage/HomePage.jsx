import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
  SectionTitle,
  FeatureBox,
  FeatureGrid,
  PromoBanner,
  CategoryCard,
  CategoryGrid,
  SectionContainer
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
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Divider, Empty } from "antd";
import { GiftOutlined, HeartOutlined, SafetyOutlined, CustomerServiceOutlined } from "@ant-design/icons";

const HomePage = () => {
  const navigate = useNavigate();
  const searchValue = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchValue, 500);
  const [limit, setLimit] = useState(10);
  const [typeProduct, setTypeProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});

  // Fetch all products initially
  const fetchAllProductsData = async () => {
    setLoading(true);
    try {
      const res = await ProductService.getAllProduct('', 100); // Fetch a large number of products
      if (res?.data) {
        setAllProducts(res.data);
        
        // Set featured products only once
        if (featuredProducts.length === 0) {
          setFeaturedProducts(res.data.slice(0, 4));
        }
        
        // Generate category images from product data
        generateCategoryImages(res.data);
      }
    } catch (error) {
      console.error('Error fetching all products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to get random product images for each category
  const generateCategoryImages = (products) => {
    // Group products by type
    const productsByType = {};
    
    products.forEach(product => {
      if (product.type && product.image) {
        if (!productsByType[product.type]) {
          productsByType[product.type] = [];
        }
        productsByType[product.type].push(product.image);
      }
    });
    
    // Get a random image for each category
    const images = {};
    Object.keys(productsByType).forEach(type => {
      const typeImages = productsByType[type];
      if (typeImages.length > 0) {
        // Get random image from the array
        const randomIndex = Math.floor(Math.random() * typeImages.length);
        images[type] = typeImages[randomIndex];
      }
    });
    
    setCategoryImages(images);
  };

  // Get image for a category, fallback to placeholder if not found
  const getCategoryImage = (category) => {
    if (categoryImages[category]) {
      return categoryImages[category];
    }
    return `https://source.unsplash.com/random/300x300/?${category}`;
  };

  // Filter products based on search term
  useEffect(() => {
    if (allProducts.length > 0) {
      if (searchDebounce?.length > 0) {
        // Filter products by search term (name, description, type)
        const filtered = allProducts.filter(product => {
          const searchLower = searchDebounce.toLowerCase();
          return (
            product.name.toLowerCase().includes(searchLower) ||
            (product.description && product.description.toLowerCase().includes(searchLower)) ||
            (product.type && product.type.toLowerCase().includes(searchLower))
          );
        });
        
        setFilteredProducts(filtered);
      } else {
        // If no search term, show all products up to limit
        setFilteredProducts(allProducts.slice(0, limit));
      }
    }
  }, [searchDebounce, allProducts, limit]);

  useEffect(() => {
    fetchAllProductsData();
  }, []);

  const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllTypeProduct();
      if (res?.status === "OK") {
        setTypeProduct(res?.data);
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const features = [
    { icon: <GiftOutlined />, title: "Miễn Phí Vận Chuyển", description: "Cho đơn hàng từ 500.000đ" },
    { icon: <SafetyOutlined />, title: "Bảo Hành 6 Tháng", description: "Đổi trả dễ dàng" },
    { icon: <HeartOutlined />, title: "Sản Phẩm Chính Hãng", description: "Chất lượng đảm bảo" },
    { icon: <CustomerServiceOutlined />, title: "Hỗ Trợ 24/7", description: "Tư vấn miễn phí" },
  ];

  return (
    <Loading isPending={loading}>
      <div
        id="container"
        style={{ padding: "0 0 50px 0", height: "fit-content", width: "100%" }}
      >
        <SliderComponent
          arrImages={[slider1, slider2, slider3, slider4, slider5]}
        />
        
        {/* Featured Categories Section - Only show if not searching */}
        {!searchDebounce && (
          <SectionContainer>
            <SectionTitle>DANH MỤC NỔI BẬT</SectionTitle>
            <CategoryGrid>
              {typeProduct.slice(0, 4).map((category, index) => (
                <CategoryCard 
                  key={index} 
                  onClick={() => navigate(`/product/${category.toLowerCase().replace(/ /g, "_")}`)}
                >
                  <div className="category-image">
                    <img src={getCategoryImage(category)} alt={category} />
                  </div>
                  <h3>{category}</h3>
                </CategoryCard>
              ))}
            </CategoryGrid>
          </SectionContainer>
        )}
        
        {/* Features Section - Only show if not searching */}
        {!searchDebounce && (
          <SectionContainer style={{ background: "#f8f9fa", padding: "30px 0" }}>
            <FeatureGrid>
              {features.map((feature, index) => (
                <FeatureBox key={index}>
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </FeatureBox>
              ))}
            </FeatureGrid>
          </SectionContainer>
        )}

        {/* Featured Products Section - Only show if not searching */}
        {!searchDebounce && featuredProducts.length > 0 && (
          <SectionContainer>
            <SectionTitle>SẢN PHẨM NỔI BẬT</SectionTitle>
            <WrapperProducts>
              {featuredProducts.map((product) => (
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
                  discount={Math.floor(Math.random() * 30) + 10}
                />
              ))}
            </WrapperProducts>
          </SectionContainer>
        )}

        {/* Main Product Section */}
        <SectionContainer>
          <SectionTitle>
            {searchDebounce ? `KẾT QUẢ TÌM KIẾM: "${searchDebounce}"` : "TẤT CẢ SẢN PHẨM"}
          </SectionTitle>
          <Divider style={{ margin: '20px 0' }} />
          
          {filteredProducts.length > 0 ? (
            <>
              <WrapperProducts>
                {filteredProducts.map((product) => (
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
                ))}
              </WrapperProducts>
              
              {!searchDebounce && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <WrapperButtonMore
                    textButton="Xem thêm"
                    type="outline"
                    styleButton={{
                      border: "1px solid #ff6683",
                      color: filteredProducts.length >= allProducts.length ? "#ccc" : "#ff6683",
                      width: "240px",
                      height: "45px",
                      borderRadius: "24px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    disabled={filteredProducts.length >= allProducts.length}
                    styleTextButton={{
                      fontWeight: 500,
                      color: filteredProducts.length >= allProducts.length && "#fff",
                    }}
                    onClick={() => setLimit((prev) => prev + 10)}
                  />
                </div>
              )}
            </>
          ) : (
            <Empty
              description="Không tìm thấy sản phẩm nào"
              style={{ margin: '40px 0' }}
            />
          )}
        </SectionContainer>

        {/* Promotional Banner - Only show if not searching */}
        {!searchDebounce && (
          <PromoBanner>
            <div className="promo-content">
              <h2>GIẢM GIÁ ĐẶC BIỆT</h2>
              <h3>Lên đến 50% cho thú bông cao cấp</h3>
              <p>Chỉ áp dụng trong tuần này - Số lượng có hạn!</p>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/products')}
                style={{ 
                  background: "#ff6683", 
                  border: "none", 
                  marginTop: "15px",
                  height: "45px",
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                MUA NGAY
              </Button>
            </div>
          </PromoBanner>
        )}
      </div>
    </Loading>
  );
};
export default HomePage;
