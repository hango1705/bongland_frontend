import styled from "styled-components";

export const AboutContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

export const AboutHero = styled.div`
  height: 400px;
  background-image: linear-gradient(to right, rgba(255, 102, 131, 0.8), rgba(253, 175, 188, 0.8)), 
                    url('https://source.unsplash.com/random/1600x900/?teddy,toy');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  
  .hero-content {
    text-align: center;
    color: white;
    padding: 0 20px;
    
    h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    p {
      font-size: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
  }
`;

export const AboutSection = styled.section`
  padding: 0 20px;
  margin-bottom: 80px;
  
  h2 {
    text-align: center;
    font-size: 32px;
    color: var(--text-color);
    position: relative;
    margin-bottom: 40px;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: var(--primary-color);
    }
  }
  
  .about-image {
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  
  .about-content {
    p {
      font-size: 16px;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 20px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  &.values-section {
    background-color: var(--bg-light);
    padding: 60px 20px;
    margin: 0 0 80px;
  }
  
  &.stats-section {
    background-color: var(--primary-color);
    padding: 60px 20px;
    margin: 0 0 80px;
    
    h2 {
      color: white;
      
      &:after {
        background-color: white;
      }
    }
  }
  
  &.contact-section {
    .contact-info {
      .contact-item {
        display: flex;
        margin-bottom: 30px;
        
        .anticon {
          font-size: 24px;
          color: var(--primary-color);
          margin-right: 20px;
          margin-top: 5px;
        }
        
        h4 {
          margin: 0 0 5px;
          font-size: 18px;
          color: var(--text-color);
        }
        
        p {
          margin: 0;
          color: var(--text-light);
        }
      }
      
      .social-networks {
        h4 {
          margin: 0 0 15px;
          font-size: 18px;
          color: var(--text-color);
        }
        
        .social-icons {
          display: flex;
          gap: 15px;
          
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 50%;
            font-size: 20px;
            transition: all 0.3s ease;
            
            &:hover {
              background-color: var(--primary-dark);
              transform: translateY(-3px);
            }
          }
        }
      }
    }
    
    .map-container {
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      
      img {
        width: 100%;
        display: block;
      }
      
      .map-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 15px;
        text-align: center;
        
        p {
          margin: 0;
          font-size: 14px;
          
          &:first-child {
            font-weight: 600;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
`;

export const ValueCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(255, 102, 131, 0.2);
  }
  
  .value-icon {
    font-size: 40px;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 20px;
    color: var(--text-color);
    margin-bottom: 15px;
  }
  
  p {
    color: var(--text-light);
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }
`;

export const MilestoneSection = styled.section`
  padding: 60px 20px;
  margin-bottom: 80px;
  background-color: var(--bg-light);
  
  h2 {
    text-align: center;
    font-size: 32px;
    color: var(--text-color);
    position: relative;
    margin-bottom: 50px;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: var(--primary-color);
    }
  }
  
  .ant-timeline {
    max-width: 1000px;
    margin: 0 auto;
    
    .ant-timeline-item-label {
      font-weight: 700;
      color: var(--primary-color);
    }
    
    .ant-timeline-item-content {
      font-size: 16px;
      color: var(--text-light);
    }
  }
`;

export const StatsCounter = styled.div`
  text-align: center;
  color: white;
  
  .stats-number {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 2px;
      background-color: white;
    }
  }
  
  .stats-title {
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const TeamMember = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  padding: 30px 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(255, 102, 131, 0.2);
  }
  
  .ant-avatar {
    margin-bottom: 20px;
    border: 4px solid var(--primary-light);
  }
  
  h3 {
    font-size: 18px;
    color: var(--text-color);
    margin-bottom: 5px;
  }
  
  .position {
    color: var(--primary-color);
    font-size: 14px;
    margin-bottom: 15px;
    font-weight: 500;
  }
  
  p {
    color: var(--text-light);
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f5f5f5;
    color: var(--text-light);
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--primary-color);
      color: white;
      transform: translateY(-3px);
    }
  }
`; 