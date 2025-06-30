import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row, Button, Empty, Select } from "antd";
import { WrapperNavbar, WrapperProducts, FilterHeader, ClearFiltersButton, SortSelect, ProductActions, SearchInput, SearchContainer, dropdownStyles } from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { FilterOutlined, ClearOutlined, ShoppingOutlined, AppstoreOutlined, SortAscendingOutlined, SearchOutlined } from "@ant-design/icons";
import { ProductTypeHeader, ProductCount } from "./style";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [typeProduct, setTypeProduct] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { type: typeFromUrl } = useParams(); // Extract type from URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({ page: 0, limit: 100, total: 1 });
  const [currentType, setCurrentType] = useState("");

  // Filter states
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Add a new state for sorting
  const [sortOption, setSortOption] = useState('newest');

  // Add a local search state
  const [searchText, setSearchText] = useState("");

  // Convert URL format to database format
  // e.g., "bo_suu_tap" -> "BỘ SƯU TẬP"
  const formatTypeFromUrl = (urlType) => {
    if (!urlType) return "";
    
    // Replace underscores with spaces
    const typeName = urlType.replace(/_/g, ' ');
    
    // Map common Vietnamese URL-safe strings back to accented characters
    // This is a simplified approach - a more comprehensive solution would be needed for production
    const typeNameFormatted = typeName
      .toUpperCase();
    
    return typeNameFormatted;
  };

  // Fetch products based on type
  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    try {
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setProducts(res?.data);
        setFilteredProducts(res?.data); // Initialize filtered products
      setPaginate({ ...paginate, total: res?.totalPage });
    } else {
        // Handle case with no products
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products by type:", error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTypeProduct = async () => {
    try {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
      }
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  // Determine which type to use (from state or URL)
  useEffect(() => {
    let typeToUse = "";
    
    if (state) {
      // If state is available (navigated from link with state)
      typeToUse = state;
    } else if (typeFromUrl) {
      // If no state but URL param exists
      typeToUse = formatTypeFromUrl(typeFromUrl);
    }
    
    if (typeToUse) {
      setCurrentType(typeToUse);
      fetchProductType(typeToUse, paginate.page, paginate.limit);
    }
  }, [state, typeFromUrl, paginate.page, paginate.limit]);

  // Apply filters whenever filter states or search term changes
  useEffect(() => {
    applyFilters();
  }, [selectedShipping, selectedPrice, selectedRating, searchDebounce, products, sortOption]);

  // Check if any filters are active
  useEffect(() => {
    setHasActiveFilters(
      selectedShipping !== null || 
      selectedPrice !== null || 
      selectedRating !== null ||
      searchDebounce !== ""
    );
  }, [selectedShipping, selectedPrice, selectedRating, searchDebounce]);

  // Apply all filters to the product list
  const applyFilters = () => {
    if (!products.length) return;

    let filtered = [...products];

    // Apply search filter
    if (searchDebounce) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchDebounce.toLowerCase())
      );
    }

    // Apply price filter
    if (selectedPrice) {
      filtered = filtered.filter(product => 
        product.price >= selectedPrice.min && 
        product.price <= selectedPrice.max
      );
    }

    // Apply rating filter
    if (selectedRating) {
      filtered = filtered.filter(product => 
        product.rating >= selectedRating
      );
    }

    // In a real app, shipping filter would be applied based on actual shipping data
    // This is just a simulation
    if (selectedShipping) {
      // For demo purposes, let's say FAST delivers even-id products and GoJek delivers odd-id products
      if (selectedShipping === "FAST") {
        filtered = filtered.filter(product => parseInt(product._id.slice(-1)) % 2 === 0);
      } else if (selectedShipping === "GoJek") {
        filtered = filtered.filter(product => parseInt(product._id.slice(-1)) % 2 !== 0);
      }
    }

    // Apply sorting
    switch(sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // newest
        // Keep default order from API
        break;
    }

    setFilteredProducts(filtered);
  };

  // Filter handlers
  const handleShippingChange = (option) => {
    setSelectedShipping(option);
  };

  const handlePriceChange = (range) => {
    setSelectedPrice(range);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedShipping(null);
    setSelectedPrice(null);
    setSelectedRating(null);
    setFilteredProducts(products);
  };

  // Pagination handler
  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current - 1, limit: pageSize });
  };

  // Navigate to products page
  const goToProductsPage = () => {
    navigate('/products');
  };

  // Custom empty state component
  const EmptyProductsState = () => (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      margin: '100px auto',
      maxWidth: '500px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
    }}>
      <Empty 
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div>
            <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>
              {hasActiveFilters 
                ? 'Không tìm thấy sản phẩm nào phù hợp với bộ lọc' 
                : `Chưa có sản phẩm nào trong danh mục "${currentType}"`}
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              {hasActiveFilters 
                ? 'Vui lòng thử với các bộ lọc khác hoặc xem tất cả sản phẩm.' 
                : 'Bạn có thể xem các sản phẩm khác hoặc quay lại sau.'}
            </p>
          </div>
        }
      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        {hasActiveFilters && (
          <Button 
            icon={<ClearOutlined />}
            onClick={clearAllFilters}
            style={{ borderColor: '#ff6683', color: '#ff6683' }}
          >
            Xóa bộ lọc
          </Button>
        )}
        <Button 
          type="primary" 
          icon={<ShoppingOutlined />}
          onClick={goToProductsPage}
          style={{ background: '#ff6683', borderColor: '#ff6683' }}
        >
          Xem tất cả sản phẩm
        </Button>
      </div>
    </div>
  );

  // Update the handleSortChange function
  const handleSortChange = (value) => {
    console.log("Sort option changed to:", value);
    setSortOption(value);
    
    // Provide immediate sorting feedback
    let sortedProducts = [...filteredProducts];
    
    switch(value) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        // Keep the filtered products in their current order if sorting by newest
        // Or apply a dateCreated sort if you have that field
        break;
    }
    
    setFilteredProducts(sortedProducts);
  };

  // Add a handleSearch function
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    
    // Only filter if we have products to filter
    if (products.length) {
      let filtered = [...products];
      
      // Apply search filter
      if (value) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(value.toLowerCase())
        );
      }
      
      // Apply other filters
      if (selectedPrice) {
        filtered = filtered.filter(product => 
          product.price >= selectedPrice.min && 
          product.price <= selectedPrice.max
        );
      }

      if (selectedRating) {
        filtered = filtered.filter(product => 
          product.rating >= selectedRating
        );
      }

      if (selectedShipping) {
        if (selectedShipping === "FAST") {
          filtered = filtered.filter(product => parseInt(product._id.slice(-1)) % 2 === 0);
        } else if (selectedShipping === "GoJek") {
          filtered = filtered.filter(product => parseInt(product._id.slice(-1)) % 2 !== 0);
        }
      }
      
      // Apply current sort
      switch(sortOption) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // Keep default order
          break;
      }
      
      setFilteredProducts(filtered);
    }
  };

  return (
    <Loading isPending={loading}>
      <ProductTypeHeader>
        <h1>{currentType || 'Sản phẩm'}</h1>
        <p>Khám phá bộ sưu tập đa dạng của chúng tôi</p>
        {filteredProducts.length > 0 && (
          <ProductCount>
            Tìm thấy <span>{filteredProducts.length}</span> sản phẩm
          </ProductCount>
        )}
      </ProductTypeHeader>
      <div style={{ padding: "0 20px" }}>
        <Row gutter={24}>
          <Col span={5}>
            <WrapperNavbar>
              <FilterHeader>
                <div className="title">
                  <FilterOutlined /> Bộ lọc
      </div>
                {hasActiveFilters && (
                  <ClearFiltersButton onClick={clearAllFilters}>
                    <ClearOutlined /> Xóa lọc
                  </ClearFiltersButton>
                )}
              </FilterHeader>
              <NavbarComponent
                onFilterShippingChange={handleShippingChange}
                onFilterPriceChange={handlePriceChange}
                onFilterRatingChange={handleRatingChange}
                selectedShipping={selectedShipping}
                selectedPrice={selectedPrice}
                selectedRating={selectedRating}
              />
            </WrapperNavbar>
          </Col>
          <Col span={19}>
            {filteredProducts.length > 0 ? (
              <>
                <SearchContainer>
                  <SearchInput 
                    placeholder="Tìm kiếm sản phẩm" 
                    prefix={<SearchOutlined />} 
                    value={searchText}
                    onChange={handleSearch}
                    allowClear
                  />
                </SearchContainer>
                <ProductActions>
                  <div className="sort-container">
                    <label><SortAscendingOutlined /> Sắp xếp theo:</label>
                    <SortSelect 
                      defaultValue="newest"
                      value={sortOption}
                      onChange={handleSortChange}
                      style={{ width: 160 }}
                      popupMatchSelectWidth={false}
                      dropdownStyle={dropdownStyles.items}
                      listItemHeight={40}
                      listHeight={200}
                      dropdownClassName="custom-select-dropdown"
                    >
                      <Select.Option 
                        value="newest" 
                        style={sortOption === "newest" ? dropdownStyles.optionSelected : {}}
                        className={sortOption === "newest" ? "custom-option-selected" : ""}
                      >
                        Mới nhất
                      </Select.Option>
                      <Select.Option 
                        value="price-asc"
                        style={sortOption === "price-asc" ? dropdownStyles.optionSelected : {}}
                        className={sortOption === "price-asc" ? "custom-option-selected" : ""}
                      >
                        Giá tăng dần
                      </Select.Option>
                      <Select.Option 
                        value="price-desc"
                        style={sortOption === "price-desc" ? dropdownStyles.optionSelected : {}}
                        className={sortOption === "price-desc" ? "custom-option-selected" : ""}
                      >
                        Giá giảm dần
                      </Select.Option>
                      <Select.Option 
                        value="name-asc"
                        style={sortOption === "name-asc" ? dropdownStyles.optionSelected : {}}
                        className={sortOption === "name-asc" ? "custom-option-selected" : ""}
                      >
                        Tên A-Z
                      </Select.Option>
                      <Select.Option 
                        value="name-desc"
                        style={sortOption === "name-desc" ? dropdownStyles.optionSelected : {}}
                        className={sortOption === "name-desc" ? "custom-option-selected" : ""}
                      >
                        Tên Z-A
                      </Select.Option>
                    </SortSelect>
                  </div>
                  <div>
                    {/* You can add view mode options here if needed */}
                  </div>
                </ProductActions>
              <WrapperProducts>
                  {filteredProducts.map((product) => {
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
                        discount={product.discount}
                      />
                    );
                  })}
              </WrapperProducts>
              </>
            ) : (
              <EmptyProductsState />
            )}
            </Col>
          </Row>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
