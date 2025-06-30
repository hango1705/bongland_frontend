import { Upload } from "antd";
import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f8f9fb;
  min-height: calc(100vh - 150px);
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: #ff6683;
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileSidebar = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .sidebar-actions {
    margin-top: 20px;
    width: 100%;
  }
`;

export const ProfileAvatar = styled.div`
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  
  .avatar-edit-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #ff6683;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid white;
    transition: all 0.3s ease;
    
    span {
      display: none;
    }
    
    &:hover {
      width: auto;
      border-radius: 18px;
      padding: 0 15px;
      
      span {
        display: inline-block;
        margin-left: 5px;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
`;

export const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 25px;
`;

export const UserName = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

export const UserRole = styled.p`
  color: #ff6683;
  font-size: 14px;
  font-weight: 500;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
`;

export const StatsCard = styled.div`
  background-color: ${props => props.$color ? `${props.$color}10` : '#f5f5f5'};
  border-radius: 8px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .stat-icon {
    color: ${props => props.$color || '#666'};
    font-size: 20px;
    margin-bottom: 5px;
  }
  
  .stat-info {
    text-align: center;
  }
  
  .stat-value {
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }
  
  .stat-title {
    font-size: 12px;
    color: #666;
  }
`;

export const ProfileMain = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
  
  .ant-tabs-nav {
    margin-bottom: 25px;
  }
  
  .ant-tabs-tab {
    padding: 12px 16px;
    
    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #ff6683;
      font-weight: 600;
    }
  }
  
  .ant-tabs-ink-bar {
    background-color: #ff6683;
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
    
    p {
      margin: 15px 0;
      color: #666;
      font-size: 16px;
    }
    
    .ant-btn-primary {
      background-color: #ff6683;
      border-color: #ff6683;
      
      &:hover {
        background-color: #e05a74;
        border-color: #e05a74;
      }
    }
  }
`;

export const ProfileSection = styled.section`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProfileSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

export const ProfileFormGroup = styled.div`
  margin-bottom: 25px;
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  .value-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .edit-field {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    
    &.address-edit {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .address-input, .city-input {
      margin-bottom: 10px;
      width: 100%;
    }
    
    .address-actions {
      display: flex;
      gap: 10px;
    }
  }
  
  .save-btn {
    background-color: #ff6683;
    border-color: #ff6683;
    
    &:hover {
      background-color: #e05a74;
      border-color: #e05a74;
    }
  }
`;

export const ProfileLabel = styled.label`
  width: 140px;
  color: #666;
  font-size: 15px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: #ff6683;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const ProfileValue = styled.div`
  color: #333;
  font-size: 15px;
  font-weight: 500;
`;

export const ProfileInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  
  &:focus {
    border-color: #ff6683;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 102, 131, 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const UpdateButton = styled.button`
  background-color: #fff0f3;
  color: #ff6683;
  border: 1px solid #ffd0d9;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    background-color: #ffdde3;
  }
`;

export const AvatarUpload = styled.div`
  margin-top: 20px;
  
  .avatar-uploader {
    .ant-upload.ant-upload-select-picture-card {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border-color: #ff6683;
      background-color: #fff0f3;
      overflow: hidden;
      
      &:hover {
        border-color: #e05a74;
      }
    }
  }
`;

export const OrderHistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    background-color: #f8f9fb;
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
    color: #333;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  
  td {
    padding: 15px;
    border-bottom: 1px solid #eee;
    color: #333;
    font-size: 14px;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  .ant-badge-status-text {
    font-size: 14px;
  }
  
  .ant-btn-primary {
    background-color: #ff6683;
    border-color: #ff6683;
    
    &:hover {
      background-color: #e05a74;
      border-color: #e05a74;
    }
  }
`;

export const AddressCard = styled.div`
  background-color: #f8f9fb;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  
  .address-type {
    font-size: 14px;
    font-weight: 600;
    color: #ff6683;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 8px;
    }
  }
  
  .address-content {
    color: #333;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .address-actions {
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    gap: 10px;
  }
  
  .address-action-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    
    &.edit {
      color: #4a6cf7;
      background-color: #e9efff;
      
      &:hover {
        background-color: #d0e0ff;
      }
    }
    
    &.delete {
      color: #ff6683;
      background-color: #fff0f3;
      
      &:hover {
        background-color: #ffdde3;
      }
    }
  }
`;

export const TabsContainer = styled.div`
  margin-top: 20px;
`;

export const TabContent = styled.div`
  margin-top: 20px;
`;
