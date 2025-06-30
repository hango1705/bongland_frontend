import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Pagination, Select, Spin, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';
import CardComponent from '../../components/CardComponent/CardComponent';
import Loading from '../../components/LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';
import {
  ProductsContainer,
  ProductsHeader,
  ProductsGrid,
  FilterSection,
  SortSelect
} from './style';

const { Search } = Input;
const { Option } = Select;

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [allProducts, setAllProducts] = useState([]); // Store all products for client-side filtering
  const searchValue = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchValue, 500);

  // Fetch all products without any filters
  const fetchAllProducts = async () => {
    try {
      const res = await ProductService.getAllProduct('', 1000); // Fetch a large number of products
      if (res?.data) {
        setAllProducts(res.data);
      }
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  // Fetch filtered products based on search term
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // If we have a search term, filter client-side
      if (searchDebounce?.length > 0 && allProducts.length > 0) {
        const filtered = allProducts.filter(product => {
          const searchLower = searchDebounce.toLowerCase();
          return (
            product.name.toLowerCase().includes(searchLower) ||
            (product.description && product.description.toLowerCase().includes(searchLower)) ||
            (product.type && product.type.toLowerCase().includes(searchLower))
          );
        });
        
        setProducts(filtered);
        setTotalProducts(filtered.length);
      } else {
        // If no search term or no cached products, fetch from server
        const res = await ProductService.getAllProduct(searchDebounce, pageSize);
        if (res?.data) {
          setProducts(res.data);
          setTotalProducts(res.total);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products once on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Apply sorting whenever products array or sortBy value changes
  useEffect(() => {
    if (products.length > 0) {
      const sortedProducts = [...products];
      
      switch(sortBy) {
        case 'price-asc':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          sortedProducts.sort((a, b) => {
            // Ensure proper alphabetical comparison 
            return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
          });
          break;
        case 'name-desc':
          sortedProducts.sort((a, b) => {
            // Ensure proper alphabetical comparison
            return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' });
          });
          break;
        default: // newest
          // Keep default order from API
          break;
      }
      
      setDisplayProducts(sortedProducts);
    } else {
      setDisplayProducts([]);
    }
  }, [products, sortBy]);

  // Fetch products whenever search term changes
  useEffect(() => {
    fetchProducts();
  }, [searchDebounce, currentPage, pageSize, allProducts.length]);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Function to handle search input changes
  const handleSearch = (value) => {
    dispatch(searchProduct(value));
  };

  return (
    <ProductsContainer>
      <ProductsHeader>
        <div className="header-content">
          <h1>Tất Cả Sản Phẩm</h1>
          <p>Khám phá bộ sưu tập thú bông đa dạng của chúng tôi</p>
        </div>
      </ProductsHeader>

      <FilterSection>
        <div className="filter-left">
          <Search 
            placeholder="Tìm kiếm sản phẩm" 
            style={{ width: 300 }}
            allowClear
            defaultValue={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
        <div className="filter-right">
          <SortSelect
            defaultValue="newest"
            value={sortBy}
            onChange={handleSortChange}
            style={{ width: 200 }}
          >
            <Option value="newest">Mới nhất</Option>
            <Option value="price-asc">Giá tăng dần</Option>
            <Option value="price-desc">Giá giảm dần</Option>
            <Option value="name-asc">Tên A-Z</Option>
            <Option value="name-desc">Tên Z-A</Option>
          </SortSelect>
        </div>
      </FilterSection>

      <Loading isPending={loading}>
        {displayProducts.length > 0 ? (
          <>
            <ProductsGrid>
              {displayProducts.map((product) => (
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
            </ProductsGrid>

            <div className="pagination-container">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalProducts}
                onChange={handlePageChange}
                showSizeChanger
                showTotal={(total) => `Tổng ${total} sản phẩm`}
              />
            </div>
          </>
        ) : (
          <Empty
            description="Không tìm thấy sản phẩm nào"
            style={{ margin: '40px 0' }}
          />
        )}
      </Loading>
    </ProductsContainer>
  );
};

export default ProductsPage;
