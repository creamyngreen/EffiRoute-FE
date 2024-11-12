import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import { MdSupervisorAccount } from "react-icons/md";
import { MdEmojiTransportation } from "react-icons/md";
import { MdOutlineManageHistory } from "react-icons/md";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "../../assets/Home/Logo/Logo.png";
import { Link, Routes, Route } from "react-router-dom";
import Supplier from "../../Pages/Admin/Supplier/Supplier";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "white" }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <LuLayoutDashboard />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <MdManageAccounts />,
              label: "Account",

            },
            {
              key: "3",
              icon: <MdSupervisorAccount />,
              label: "Supplier",

            },
            {
              key: "4",
              icon: <MdEmojiTransportation />,
              label: "Vehicle",
            },
            {
              key: "5",
              icon: <MdOutlineManageHistory />,
              label: "Supplier",
            },
            {
              key: "6",
              icon: <MdOutlineManageHistory />,
              label: "Audit log",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex items-center">
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
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-8 sm:h-12" alt="Logo" />
            </a>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
