import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Row, 
  Col, 
  Card, 
  Select, 
  notification, 
  Collapse,
  Divider 
} from 'antd';
import { 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined,
  SendOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { 
  ContactContainer, 
  ContactHeader, 
  ContactWrapper,
  ContactInfo,
  StoreLocation,
  ContactFormWrapper,
  FaqSection
} from './style';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = values => {
    setSubmitting(true);
    
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      setSubmitting(false);
      notification.success({
        message: 'Gửi thư thành công',
        description: 'Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ trong thời gian sớm nhất.',
      });
      form.resetFields();
    }, 1500);
  };

  const storeLocations = [
    {
      id: 1,
      name: 'Cửa hàng Quận 3',
      address: '125 Nguyễn Đình Chiểu, Phường 6, Quận 3, TP. Hồ Chí Minh',
      phone: '(028) 1234 5678',
      hours: 'Thứ 2 - Chủ nhật: 8:00 - 21:00',
      image: 'https://picsum.photos/600/400?random=1'
    },
    {
      id: 2,
      name: 'Cửa hàng Quận 7',
      address: '155 Nguyễn Lương Bằng, Phú Mỹ, Quận 7, TP. Hồ Chí Minh',
      phone: '(028) 8765 4321',
      hours: 'Thứ 2 - Chủ nhật: 9:00 - 22:00',
      image: 'https://picsum.photos/600/400?random=2'
    },
    {
      id: 3,
      name: 'Cửa hàng Hà Nội',
      address: '65 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội',
      phone: '(024) 9876 5432',
      hours: 'Thứ 2 - Chủ nhật: 8:30 - 21:30',
      image: 'https://picsum.photos/600/400?random=3'
    }
  ];

  const faqs = [
    {
      question: 'Làm thế nào để đặt hàng trên website?',
      answer: 'Để đặt hàng trên website, bạn chỉ cần chọn sản phẩm muốn mua, thêm vào giỏ hàng và tiến hành thanh toán. Website của chúng tôi hỗ trợ nhiều phương thức thanh toán khác nhau để phù hợp với nhu cầu của bạn.'
    },
    {
      question: 'Các phương thức thanh toán nào được chấp nhận?',
      answer: 'Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay, VNPay) và thanh toán khi nhận hàng (COD).'
    },
    {
      question: 'Thời gian giao hàng là bao lâu?',
      answer: 'Thời gian giao hàng thông thường là 2-5 ngày làm việc đối với khu vực nội thành và 5-7 ngày làm việc đối với khu vực ngoại thành hoặc tỉnh thành khác.'
    },
    {
      question: 'Chính sách đổi trả như thế nào?',
      answer: 'Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi do nhà sản xuất hoặc bị hư hỏng trong quá trình vận chuyển. Sản phẩm đổi trả phải còn nguyên tem, nhãn và chưa có dấu hiệu đã qua sử dụng.'
    },
    {
      question: 'Có được kiểm tra hàng trước khi nhận không?',
      answer: 'Có, bạn được kiểm tra sản phẩm trước khi nhận hàng và thanh toán. Tuy nhiên, vui lòng không mở sản phẩm nếu không có ý định mua.'
    }
  ];

  return (
    <ContactContainer>
      <ContactHeader>
        <div className="header-content">
          <h1>Liên Hệ Với Chúng Tôi</h1>
          <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
        </div>
      </ContactHeader>

      <ContactWrapper>
        <Row gutter={[40, 40]}>
          <Col xs={24} lg={10}>
            <ContactInfo>
              <h2>Thông Tin Liên Hệ</h2>
              <div className="info-item">
                <EnvironmentOutlined />
                <div>
                  <h3>Địa Chỉ</h3>
                  <p>125 Nguyễn Đình Chiểu, Phường 6, Quận 3, TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="info-item">
                <PhoneOutlined />
                <div>
                  <h3>Điện Thoại</h3>
                  <p>(+84) 28 1234 5678</p>
                </div>
              </div>
              <div className="info-item">
                <MailOutlined />
                <div>
                  <h3>Email</h3>
                  <p>info@bongland.com</p>
                </div>
              </div>
              <div className="info-item">
                <ClockCircleOutlined />
                <div>
                  <h3>Giờ Làm Việc</h3>
                  <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                  <p>Thứ 7 - Chủ Nhật: 9:00 - 17:00</p>
                </div>
              </div>
              <div className="social-links">
                <h3>Kết Nối Với Chúng Tôi</h3>
                <div className="social-icons">
                  <a href="#" className="facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="youtube">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="#" className="tiktok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </ContactInfo>
          </Col>
          
          <Col xs={24} lg={14}>
            <ContactFormWrapper>
              <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
              <p>Hãy điền đầy đủ thông tin bên dưới, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</p>
              
              <Form 
                form={form}
                layout="vertical" 
                onFinish={handleFormSubmit}
                className="contact-form"
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                      <Input placeholder="Nhập họ và tên của bạn" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <Input placeholder="Nhập email của bạn" size="large" />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                      <Input placeholder="Nhập số điện thoại của bạn" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="subject"
                      label="Chủ đề"
                      rules={[{ required: true, message: 'Vui lòng chọn chủ đề!' }]}
                    >
                      <Select placeholder="Chọn chủ đề" size="large">
                        <Option value="inquiry">Thông tin sản phẩm</Option>
                        <Option value="order">Đơn hàng</Option>
                        <Option value="support">Hỗ trợ kỹ thuật</Option>
                        <Option value="feedback">Góp ý, phản hồi</Option>
                        <Option value="other">Khác</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="message"
                  label="Nội dung"
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn!' }]}
                >
                  <TextArea 
                    rows={6} 
                    placeholder="Nhập nội dung tin nhắn của bạn" 
                    size="large"
                  />
                </Form.Item>
                
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SendOutlined />}
                    loading={submitting}
                    size="large"
                  >
                    Gửi tin nhắn
                  </Button>
                </Form.Item>
              </Form>
            </ContactFormWrapper>
          </Col>
        </Row>
      </ContactWrapper>

      <div className="store-locations">
        <h2>Hệ Thống Cửa Hàng</h2>
        <Row gutter={[24, 24]}>
          {storeLocations.map(store => (
            <Col xs={24} md={8} key={store.id}>
              <StoreLocation>
                <div className="store-image">
                  <img src={store.image} alt={store.name} />
                </div>
                <div className="store-info">
                  <h3>{store.name}</h3>
                  <div className="info-detail">
                    <EnvironmentOutlined />
                    <p>{store.address}</p>
                  </div>
                  <div className="info-detail">
                    <PhoneOutlined />
                    <p>{store.phone}</p>
                  </div>
                  <div className="info-detail">
                    <ClockCircleOutlined />
                    <p>{store.hours}</p>
                  </div>
                </div>
              </StoreLocation>
            </Col>
          ))}
        </Row>
      </div>

      <FaqSection>
        <h2>Câu Hỏi Thường Gặp</h2>
        <p className="faq-intro">Dưới đây là một số câu hỏi thường gặp từ khách hàng của chúng tôi</p>
        
        <Collapse 
          expandIconPosition="end"
          className="faq-collapse"
        >
          {faqs.map((faq, index) => (
            <Panel 
              header={
                <div className="faq-question">
                  <QuestionCircleOutlined />
                  <span>{faq.question}</span>
                </div>
              } 
              key={index}
            >
              <p>{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
        
        <Divider />
        
        <div className="faq-more">
          <h3>Bạn không tìm thấy câu trả lời?</h3>
          <p>Liên hệ với chúng tôi qua số điện thoại hoặc gửi email để được hỗ trợ</p>
          <Button type="primary" size="large" icon={<MailOutlined />}>
            Gửi Email Ngay
          </Button>
        </div>
      </FaqSection>

      <div className="map-container">
        <h2>Bản Đồ</h2>
        <div className="google-map">
          <img 
            src="https://picsum.photos/600/400?random=4" 
            alt="Map" 
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <div className="map-overlay">
            <p>Bản đồ chỉ mang tính chất minh họa</p>
            <p>Vui lòng liên hệ để biết thêm chi tiết</p>
          </div>
        </div>
      </div>
    </ContactContainer>
  );
};

export default ContactPage; 