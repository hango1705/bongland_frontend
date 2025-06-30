import React from 'react';
import { Row, Col, Card, Avatar, Divider, Timeline } from 'antd';
import { 
  ShopOutlined, 
  HeartOutlined, 
  TeamOutlined, 
  TrophyOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import {
  AboutContainer,
  AboutHero,
  AboutSection,
  ValueCard,
  TeamMember,
  SocialLinks,
  StatsCounter,
  MilestoneSection
} from './style';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      position: "Nhà sáng lập & CEO",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Với hơn 10 năm kinh nghiệm trong ngành đồ chơi và quà tặng. Anh A đã xây dựng Bông Land từ một cửa hàng nhỏ thành thương hiệu được yêu thích."
    },
    {
      name: "Trần Thị B",
      position: "Giám đốc sản phẩm",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Chị B là người có con mắt nhìn xa trông rộng trong việc lựa chọn và phát triển sản phẩm mới, luôn đảm bảo tiêu chuẩn chất lượng cao nhất."
    },
    {
      name: "Lê Văn C",
      position: "Giám đốc marketing",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      bio: "Anh C với nhiều năm kinh nghiệm trong lĩnh vực digital marketing, là người đứng sau những chiến dịch quảng bá thành công của Bông Land."
    },
    {
      name: "Phạm Thị D",
      position: "Trưởng phòng CSKH",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      bio: "Chị D luôn đặt sự hài lòng của khách hàng lên hàng đầu, là người dẫn dắt đội ngũ chăm sóc khách hàng tận tâm của Bông Land."
    }
  ];

  const companyValues = [
    {
      icon: <HeartOutlined />,
      title: "Chất lượng",
      description: "Chúng tôi cam kết mang đến những sản phẩm với chất lượng tốt nhất, an toàn và đáng tin cậy."
    },
    {
      icon: <ShopOutlined />,
      title: "Đa dạng",
      description: "Bộ sưu tập thú bông phong phú, đa dạng về kích thước, mẫu mã để đáp ứng mọi nhu cầu."
    },
    {
      icon: <TeamOutlined />,
      title: "Tận tâm",
      description: "Đội ngũ nhân viên luôn sẵn sàng hỗ trợ, tư vấn và mang đến trải nghiệm mua sắm tốt nhất."
    },
    {
      icon: <TrophyOutlined />,
      title: "Sáng tạo",
      description: "Liên tục cập nhật xu hướng và phát triển sản phẩm mới, độc đáo và khác biệt."
    }
  ];

  return (
    <AboutContainer>
      <AboutHero>
        <div className="hero-content">
          <h1>Về Bông Land</h1>
          <p>Nơi mỗi thú bông đều chứa đựng những câu chuyện và tình cảm</p>
        </div>
      </AboutHero>

      <AboutSection>
        <h2>Câu chuyện của chúng tôi</h2>
        <Row gutter={[40, 40]}>
          <Col xs={24} md={12}>
            <div className="about-image">
              <img src="https://picsum.photos/600/400?random=8" alt="Bông Land Store" />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="about-content">
              <p>Bông Land được thành lập vào năm 2018 với niềm đam mê về thú bông và mong muốn mang niềm vui, hạnh phúc đến với mọi người thông qua những sản phẩm chất lượng và ý nghĩa.</p>
              <p>Từ một cửa hàng nhỏ chỉ với vài chục sản phẩm, đến nay Bông Land đã phát triển thành một thương hiệu uy tín với hàng nghìn mẫu thú bông đa dạng, từ những chú gấu bông truyền thống đến các nhân vật hoạt hình được yêu thích.</p>
              <p>Với phương châm "Mang yêu thương vào từng sản phẩm", chúng tôi luôn chú trọng đến chất lượng, độ an toàn và tính thẩm mỹ của sản phẩm, để mỗi món quà từ Bông Land đều trở thành người bạn đồng hành đáng yêu trong cuộc sống của bạn.</p>
            </div>
          </Col>
        </Row>
      </AboutSection>

      <AboutSection className="values-section">
        <h2>Giá trị cốt lõi</h2>
        <Row gutter={[24, 24]}>
          {companyValues.map((value, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <ValueCard>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </ValueCard>
            </Col>
          ))}
        </Row>
      </AboutSection>

      <MilestoneSection>
        <h2>Hành trình phát triển</h2>
        <Timeline 
          mode="alternate" 
          items={[
            { 
              label: '2018', 
              children: 'Thành lập cửa hàng Bông Land đầu tiên tại TPHCM.',
              color: 'var(--primary-color)'
            },
            { 
              label: '2019', 
              children: 'Mở rộng danh mục sản phẩm và ra mắt website thương mại điện tử.',
              color: 'var(--primary-color)'
            },
            { 
              label: '2020', 
              children: 'Thành lập xưởng sản xuất riêng và cho ra mắt dòng sản phẩm độc quyền.',
              color: 'var(--primary-color)'
            },
            { 
              label: '2021', 
              children: 'Mở thêm 3 chi nhánh mới tại Hà Nội, Đà Nẵng và Cần Thơ.',
              color: 'var(--primary-color)'
            },
            { 
              label: '2022', 
              children: 'Đạt mốc 100.000 khách hàng thân thiết và nhận giải thưởng "Thương hiệu được yêu thích".',
              color: 'var(--primary-color)'
            },
            { 
              label: '2023', 
              children: 'Mở rộng thị trường xuất khẩu và phát triển chuỗi cửa hàng toàn quốc.',
              color: 'var(--primary-color)'
            }
          ]}
        />
      </MilestoneSection>

      <AboutSection className="stats-section">
        <Row gutter={[24, 24]} justify="center">
          <Col xs={12} md={6}>
            <StatsCounter>
              <div className="stats-number">5+</div>
              <div className="stats-title">Năm kinh nghiệm</div>
            </StatsCounter>
          </Col>
          <Col xs={12} md={6}>
            <StatsCounter>
              <div className="stats-number">10+</div>
              <div className="stats-title">Cửa hàng</div>
            </StatsCounter>
          </Col>
          <Col xs={12} md={6}>
            <StatsCounter>
              <div className="stats-number">5,000+</div>
              <div className="stats-title">Sản phẩm</div>
            </StatsCounter>
          </Col>
          <Col xs={12} md={6}>
            <StatsCounter>
              <div className="stats-number">100,000+</div>
              <div className="stats-title">Khách hàng</div>
            </StatsCounter>
          </Col>
        </Row>
      </AboutSection>

      <AboutSection>
        <h2>Đội ngũ của chúng tôi</h2>
        <Row gutter={[30, 30]}>
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <TeamMember>
                <Avatar src={member.avatar} size={100} />
                <h3>{member.name}</h3>
                <div className="position">{member.position}</div>
                <p>{member.bio}</p>
                <SocialLinks>
                  <a href="#"><FacebookOutlined /></a>
                  <a href="#"><InstagramOutlined /></a>
                  <a href="#"><MailOutlined /></a>
                </SocialLinks>
              </TeamMember>
            </Col>
          ))}
        </Row>
      </AboutSection>

      <AboutSection className="contact-section">
        <h2>Liên hệ với chúng tôi</h2>
        <Row gutter={[40, 40]}>
          <Col xs={24} md={12}>
            <div className="contact-info">
              <div className="contact-item">
                <EnvironmentOutlined />
                <div>
                  <h4>Địa chỉ</h4>
                  <p>125 Nguyễn Đình Chiểu, Phường 6, Quận 3, TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="contact-item">
                <PhoneOutlined />
                <div>
                  <h4>Số điện thoại</h4>
                  <p>(+84) 28 1234 5678</p>
                </div>
              </div>
              <div className="contact-item">
                <MailOutlined />
                <div>
                  <h4>Email</h4>
                  <p>info@bongland.com</p>
                </div>
              </div>
              <div className="social-networks">
                <h4>Kết nối với chúng tôi</h4>
                <div className="social-icons">
                  <a href="#"><FacebookOutlined /></a>
                  <a href="#"><InstagramOutlined /></a>
                  <a href="#"><YoutubeOutlined /></a>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="map-container">
              <img src="https://picsum.photos/600/400?random=9" alt="Map" />
              <div className="map-overlay">
                <p>Bản đồ chỉ mang tính chất minh họa</p>
                <p>Vui lòng liên hệ để biết thêm chi tiết</p>
              </div>
            </div>
          </Col>
        </Row>
      </AboutSection>
    </AboutContainer>
  );
};

export default AboutPage; 