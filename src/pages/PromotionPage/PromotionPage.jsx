import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag, Button, Divider, Typography } from 'antd';
import { ShoppingOutlined, ClockCircleOutlined, TagOutlined, PercentageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { 
  PromotionContainer, 
  PromotionHeader, 
  PromotionCard, 
  DiscountTag,
  PromotionGrid,
  PromotionBanner
} from './style';

const { Title, Text } = Typography;

const PromotionPage = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app, you would fetch promotions from your backend
  useEffect(() => {
    // Mock data - replace with actual API call in production
    const mockPromotions = [
      {
        id: 1,
        title: 'Giảm giá mùa hè',
        description: 'Giảm đến 40% cho tất cả thú bông mùa hè.',
        discount: '40%',
        code: 'SUMMER40',
        validUntil: '31/07/2024',
        imageUrl: 'https://picsum.photos/600/400?random=1',
        category: 'Mùa hè'
      },
      {
        id: 2,
        title: 'Ưu đãi thành viên mới',
        description: 'Giảm 20% cho đơn hàng đầu tiên khi đăng ký tài khoản.',
        discount: '20%',
        code: 'NEWMEMBER20',
        validUntil: '31/12/2024',
        imageUrl: 'https://picsum.photos/600/400?random=2',
        category: 'Thành viên'
      },
      {
        id: 3,
        title: 'Mua 2 tặng 1',
        description: 'Mua 2 sản phẩm từ danh mục gấu bông cao cấp và nhận 1 sản phẩm miễn phí.',
        discount: 'Mua 2 tặng 1',
        code: 'BUY2GET1',
        validUntil: '15/08/2024',
        imageUrl: 'https://picsum.photos/600/400?random=3',
        category: 'Combo'
      },
      {
        id: 4,
        title: 'Flash Sale cuối tuần',
        description: 'Giảm sốc 50% cho một số sản phẩm chọn lọc vào cuối tuần.',
        discount: '50%',
        code: 'FLASH50',
        validUntil: '30/06/2024',
        imageUrl: 'https://picsum.photos/600/400?random=4',
        category: 'Flash Sale'
      },
      {
        id: 5,
        title: 'Miễn phí vận chuyển',
        description: 'Miễn phí vận chuyển cho đơn hàng trên 500.000đ.',
        discount: 'Miễn phí vận chuyển',
        code: 'FREESHIP',
        validUntil: '31/12/2024',
        imageUrl: 'https://picsum.photos/600/400?random=5',
        category: 'Vận chuyển'
      },
      {
        id: 6,
        title: 'Ưu đãi sinh nhật',
        description: 'Giảm 30% cho đơn hàng trong tháng sinh nhật của bạn.',
        discount: '30%',
        code: 'BIRTHDAY30',
        validUntil: 'Thường xuyên',
        imageUrl: 'https://picsum.photos/600/400?random=6',
        category: 'Sinh nhật'
      }
    ];

    setTimeout(() => {
      setPromotions(mockPromotions);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <PromotionContainer>
      <PromotionBanner>
        <div className="banner-content">
          <h1>Ưu Đãi Đặc Biệt</h1>
          <p>Khám phá các chương trình khuyến mãi độc quyền từ Bông Land</p>
        </div>
      </PromotionBanner>

      <PromotionHeader>
        <Title level={2}>Ưu Đãi Đang Diễn Ra</Title>
        <Text>Sử dụng mã khuyến mãi khi thanh toán để nhận ưu đãi</Text>
      </PromotionHeader>

      <PromotionGrid loading={loading}>
        {promotions.map(promo => (
          <PromotionCard key={promo.id}>
            <div className="promo-image">
              <img src={promo.imageUrl} alt={promo.title} />
              <DiscountTag>{promo.discount}</DiscountTag>
              <Tag color="#f50" className="category-tag">{promo.category}</Tag>
            </div>
            <div className="promo-content">
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              <div className="promo-meta">
                <div className="promo-code">
                  <TagOutlined /> Mã: <span>{promo.code}</span>
                </div>
                <div className="promo-validity">
                  <ClockCircleOutlined /> Có hiệu lực đến: {promo.validUntil}
                </div>
              </div>
              <Button 
                type="primary" 
                icon={<ShoppingOutlined />}
                onClick={() => navigate('/products')}
              >
                Mua sắm ngay
              </Button>
            </div>
          </PromotionCard>
        ))}
      </PromotionGrid>

      <Divider />

      <div className="promotion-faq">
        <Title level={3}>Câu Hỏi Thường Gặp</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Làm thế nào để sử dụng mã giảm giá?">
              <p>Khi thanh toán, nhập mã giảm giá vào ô "Mã khuyến mãi" và nhấn "Áp dụng" để nhận ưu đãi.</p>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Tôi có thể sử dụng nhiều mã giảm giá cùng lúc không?">
              <p>Mỗi đơn hàng chỉ có thể áp dụng một mã giảm giá. Vui lòng chọn mã có giá trị ưu đãi cao nhất.</p>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Mã giảm giá đã hết hạn có thể sử dụng không?">
              <p>Không, mã giảm giá chỉ có hiệu lực trong thời gian quy định. Vui lòng kiểm tra ngày hết hạn.</p>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Tôi có thể kết hợp ưu đãi với chương trình khác không?">
              <p>Một số khuyến mãi có thể không kết hợp được với các chương trình ưu đãi khác. Chi tiết sẽ được ghi rõ trong điều kiện của từng khuyến mãi.</p>
            </Card>
          </Col>
        </Row>
      </div>
    </PromotionContainer>
  );
};

export default PromotionPage; 