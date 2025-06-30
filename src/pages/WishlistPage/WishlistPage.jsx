import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Empty, Card, Tooltip, Divider, Input, Pagination, Spin } from 'antd';
import { ShoppingCartOutlined, HeartFilled, DeleteOutlined, ShareAltOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  WishlistContainer,
  WishlistHeader,
  WishlistItem,
  EmptyWishlist,
  WishlistToolbar,
  WishlistPrice,
  WishlistActions,
  StockStatus
} from './style';
import { convertPrice } from '../../utils';

const { Search } = Input;

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // In a real app, you'd fetch this from your Redux store or API
  useEffect(() => {
    // This is mock data
    const mockWishlistItems = [
      {
        id: '1',
        name: 'Gấu Bông Brown',
        image: 'https://picsum.photos/600/400?random=1',
        price: 350000,
        discount: 10,
        inStock: true,
        rating: 4.8
      },
      {
        id: '2',
        name: 'Thú Bông Unicorn',
        image: 'https://picsum.photos/600/400?random=2',
        price: 420000,
        discount: 0,
        inStock: true,
        rating: 4.9
      },
      {
        id: '3',
        name: 'Gấu Bông Stitch',
        image: 'https://picsum.photos/600/400?random=3',
        price: 380000,
        discount: 15,
        inStock: false,
        rating: 4.7
      },
      {
        id: '4',
        name: 'Thú Bông Khủng Long',
        image: 'https://picsum.photos/600/400?random=4',
        price: 450000,
        discount: 0,
        inStock: true,
        rating: 4.6
      },
      {
        id: '5',
        name: 'Gấu Bông Totoro',
        image: 'https://picsum.photos/600/400?random=5',
        price: 520000,
        discount: 5,
        inStock: true,
        rating: 5.0
      }
    ];

    setTimeout(() => {
      setWishlistItems(mockWishlistItems);
      setLoading(false);
    }, 800);
  }, []);

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    // In a real app, you'd dispatch an action to add to cart
    console.log('Added to cart:', item);
    // For demo purposes, let's just remove it from wishlist
    handleRemoveFromWishlist(item.id);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const filteredItems = wishlistItems.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearWishlist = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm yêu thích?')) {
      setWishlistItems([]);
    }
  };

  return (
    <WishlistContainer>
      <WishlistHeader>
        <div className="header-content">
          <h1>Danh Sách Yêu Thích</h1>
          <p>Lưu trữ những sản phẩm bạn yêu thích để mua sau</p>
        </div>
      </WishlistHeader>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Đang tải danh sách yêu thích...</p>
        </div>
      ) : (
        <>
          {wishlistItems.length > 0 ? (
            <>
              <WishlistToolbar>
                <div className="toolbar-left">
                  <Search
                    placeholder="Tìm kiếm sản phẩm"
                    onSearch={handleSearch}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                  />
                </div>
                <div className="toolbar-right">
                  <span className="item-count">{wishlistItems.length} sản phẩm</span>
                  <Button 
                    onClick={handleClearWishlist}
                    icon={<DeleteOutlined />}
                    danger
                  >
                    Xóa tất cả
                  </Button>
                </div>
              </WishlistToolbar>

              <Row gutter={[24, 24]}>
                {paginatedItems.map(item => (
                  <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                    <WishlistItem $inStock={item.inStock}>
                      <div className="item-image" onClick={() => navigate(`/product-details/${item.id}`)}>
                        <img src={item.image} alt={item.name} />
                        {!item.inStock && <StockStatus>Hết hàng</StockStatus>}
                        {item.discount > 0 && <div className="discount-badge">-{item.discount}%</div>}
                      </div>
                      <div className="item-content">
                        <h3 onClick={() => navigate(`/product-details/${item.id}`)}>
                          {item.name}
                        </h3>
                        <WishlistPrice>
                          {item.discount > 0 ? (
                            <>
                              <span className="price">{convertPrice(item.price * (1 - item.discount/100))}</span>
                              <span className="original-price">{convertPrice(item.price)}</span>
                            </>
                          ) : (
                            <span className="price">{convertPrice(item.price)}</span>
                          )}
                        </WishlistPrice>
                        <WishlistActions>
                          <Button 
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                          >
                            Thêm vào giỏ
                          </Button>
                          <div className="action-icons">
                            <Tooltip title="Chia sẻ">
                              <Button 
                                type="text" 
                                icon={<ShareAltOutlined />} 
                                className="action-button"
                              />
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <Button 
                                type="text" 
                                icon={<DeleteOutlined />} 
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="action-button delete"
                              />
                            </Tooltip>
                          </div>
                        </WishlistActions>
                      </div>
                    </WishlistItem>
                  </Col>
                ))}
              </Row>

              {filteredItems.length > itemsPerPage && (
                <div className="pagination-container">
                  <Pagination 
                    current={currentPage}
                    onChange={setCurrentPage}
                    total={filteredItems.length}
                    pageSize={itemsPerPage}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyWishlist>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 120 }}
                description={<span>Bạn chưa có sản phẩm yêu thích nào</span>}
              >
                <Button
                  type="primary"
                  onClick={() => navigate('/products')}
                >
                  Khám phá sản phẩm ngay
                </Button>
              </Empty>
            </EmptyWishlist>
          )}

          <div className="recommendations">
            <Divider>
              <h2>Có Thể Bạn Cũng Thích</h2>
            </Divider>
            <Row gutter={[24, 24]}>
              {Array(4).fill().map((_, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <Card
                    hoverable
                    cover={<img alt={`Recommendation ${index + 1}`} src={`https://source.unsplash.com/random/300x300/?teddy,toy&sig=${index}`} />}
                    onClick={() => navigate(`/product-details/rec-${index + 1}`)}
                  >
                    <Card.Meta 
                      title={`Gấu bông đề xuất ${index + 1}`} 
                      description={convertPrice(250000 + index * 50000)} 
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </WishlistContainer>
  );
};

export default WishlistPage; 