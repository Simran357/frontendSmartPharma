import React, { useContext, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RobotFilled,
} from '@ant-design/icons';

import { Button, Layout, Menu, theme } from 'antd';
import {
  DashboardCustomize,
  Inventory2,
  SubjectOutlined,
} from '@mui/icons-material';

import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import UserProfileMenu from '../UserProfile';
import { SettingsMenu } from './Setting';
import { NotificationMenu } from './Notifications';
import axiosInstance from '../../Form/Utils/AxiosInstance';
import { contextProvide } from '../../Form/Utils/Context/CommonContext';

const { Header, Sider, Content } = Layout;

const Retailerlayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);

  const { auth } = useContext(contextProvide);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/registerroute/getSingleRetailor/${auth}`);

        setUserData(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (auth) {
      fetchUser();
    } 
  }, [auth]);

  console.log("user",userData)

  const items = [
    {
      key: "/Dashboard/Retailer",
      icon: <DashboardCustomize />,
      label: "Retailer",
    },
    {
      key: "/Dashboard/Retailer/Order",
      icon: <SubjectOutlined />,
      label: "Wholesaler",
    },
    {
      key: "/Dashboard/Retailer/Inventory",
      icon: <Inventory2 />,
      label: "Inventory",
    },
    {
      key: "/Dashboard/Retailer/AiAgent",
      icon: <RobotFilled />,
      label: "AI Agent",
    },
    {
      key: "/Dashboard/Retailer/ReturnInvoice",
      icon: <AssignmentReturnIcon />,
      label: "Return Invoice",
    },
    {
      key: "/Dashboard/Retailer/InvoicePurchaseScan",
      icon: <DocumentScannerIcon />,
      label: "OCR System",
    },
    {
      key: "/Dashboard/Retailer/RetailerOrderHistory",
      icon: <DocumentScannerIcon />,
      label: "Order History",
    }
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>

      <Layout>
        <Header
          style={{ background: colorBgContainer }}
          className="flex justify-between items-center px-4"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="flex items-center gap-3">
            <NotificationMenu />
            <SettingsMenu />

            <UserProfileMenu
              username={
                userData?.username ||
                userData?.email ||
                "User"
              }
              role={userData?.role || "Retailer"}
            />     
          </div>
        </Header>

        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Retailerlayout;