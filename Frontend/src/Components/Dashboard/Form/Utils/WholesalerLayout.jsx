import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RobotFilled,

} from '@ant-design/icons';

import { Button, Layout, Menu, theme } from 'antd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { DashboardCustomize } from '@mui/icons-material';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import UserProfileMenu from '../UserProfile';
import { NotificationMenu } from './Notifications';
import { SettingsMenu } from './Setting';
const { Header, Sider, Content } = Layout;
const Wholesalerlayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [openProfile, setOpenProfile] = useState(false)

  const navigate = useNavigate()
  const location = useLocation();
  const wholesalerMenu = [
    {
      key: "/Dashboard/Wholesaler",
      icon: <DashboardCustomize />,
      label: "Dashboard",
    },
    {
      key: "/Dashboard/Wholesaler/Inventory",
      icon: <Inventory2Icon  />,
      label: "Inventory",
    },
    {
      key: "/Dashboard/Wholesaler/Alert",
      icon: <Inventory2Icon />,
      label: "Actionable",
    },
    {
      key: "/Dashboard/Wholesaler/AiAgent",
      icon: <RobotFilled />,
      label: "AI Agent",
    }, {
      key: "/Dashboard/Wholesaler/TempelateDesigner",
      icon: <RobotFilled />,
      label: "TempelateDesigner"
    },
    {
      key: "/Dashboard/Wholesaler/Retailors",
      icon: <StoreIcon />,
      label: "Retailors",
    },{
      key: "/Dashboard/Wholesaler/OrdersOverview",
      icon: <ListAltIcon />,
      label: "OrdersOverview",
    },
    {
      key: "/Dashboard/Wholesaler/Connectcourier",
      icon: <LocalShippingIcon />,
      label: "CourierList", 
    },
  ];
                             
  return (
    <>                            
      <Layout className='min-h-screen'>
        <Sider trigger={null} collapsible collapsed={collapsed} >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"                     
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            selectedKeys={[location.pathname]}
            items={wholesalerMenu}
            onClick={(e) => {
              navigate(e.key)
            }}
          />                          
        </Sider>                  
        <Layout>
          <Header
            style={{ background: colorBgContainer }}
            className="flex justify-between items-center px-4"
          >
            {/* LEFT SIDE */}
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
                                                  
            {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
     
       <NotificationMenu />
       <SettingsMenu />
     
       <UserProfileMenu
         username="Wholesaler"
         role="Admin"
       />
     
     </div>
          </Header>
          <Content className="p-6 h-screen overflow-auto bg-gray-50"
          >   
            <Outlet />
          </Content>
        </Layout>
      </Layout>


    </>
  )
}

export default Wholesalerlayout