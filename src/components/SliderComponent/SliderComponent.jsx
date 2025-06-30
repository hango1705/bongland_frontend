import React, { useEffect } from "react";
import Slider from "react-slick";
import { Image, Button } from "antd";
import { LeftOutlined, RightOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { SliderContainer, SlideContent, SlideOverlay, SlideHeading, SlideDescription, CustomArrow, SlideButton } from "./style";
import { useNavigate } from "react-router-dom";

const SliderComponent = ({ arrImages }) => {
  const navigate = useNavigate();
  
  // Ensure cleanup of any event listeners on unmount
  useEffect(() => {
    return () => {
      // Clean up any possible event listeners
      const handleMouseMoveEvents = document.querySelectorAll('mousemove');
      if (handleMouseMoveEvents.length > 0) {
        handleMouseMoveEvents.forEach(event => {
          document.removeEventListener('mousemove', event);
        });
      }
    };
  }, []);
  
  // Sample slide data - in a real app, this would come from your backend
  const slideData = [
    {
      title: "Thú bông đẹp và cao cấp",
      description: "Bộ sưu tập mới nhất với nhiều mẫu mã đa dạng",
      buttonText: "Mua sắm ngay",
      link: "/products"
    },
    {
      title: "Ưu đãi đặc biệt",
      description: "Giảm đến 30% cho thành viên mới",
      buttonText: "Khám phá",
      link: "/promotion"
    },
    {
      title: "Giao hàng miễn phí",
      description: "Cho đơn hàng từ 500.000đ",
      buttonText: "Xem thêm",
      link: "/products"
    },
    {
      title: "Quà tặng ý nghĩa",
      description: "Những món quà dành cho người thân yêu",
      buttonText: "Tìm hiểu thêm",
      link: "/products"
    },
    {
      title: "Thú bông chất lượng cao",
      description: "Sản phẩm được lựa chọn kỹ càng, an toàn cho trẻ em",
      buttonText: "Mua ngay",
      link: "/products"
    }
  ];

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <CustomArrow className={className} onClick={onClick} $position="right">
        <RightOutlined />
      </CustomArrow>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <CustomArrow className={className} onClick={onClick} $position="left">
        <LeftOutlined />
      </CustomArrow>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots custom-dots",
    onSwipe: (direction) => {
      // Make sure this doesn't cause any issues
      try {
        console.log("Swiped:", direction);
      } catch (error) {
        console.error("Error in slider swipe:", error);
      }
    }
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {arrImages.map((image, index) => {
          const slide = slideData[index % slideData.length];
          return (
            <div key={image} className="slide-item">
              <Image
                src={image}
                alt={`slider-${index}`}
                preview={false}
                width="100%"
                height="500px"
                style={{ objectFit: "cover" }}
              />
              <SlideOverlay>
                <SlideContent>
                  <SlideHeading>{slide.title}</SlideHeading>
                  <SlideDescription>{slide.description}</SlideDescription>
                  <SlideButton 
                    type="primary" 
                    size="large"
                    onClick={() => navigate(slide.link)}
                  >
                    {slide.buttonText} <ArrowRightOutlined />
                  </SlideButton>
                </SlideContent>
              </SlideOverlay>
            </div>
          );
        })}
      </Slider>
    </SliderContainer>
  );
};

export default SliderComponent;
