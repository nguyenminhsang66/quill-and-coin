import React from "react";
import { Layout, Button, Space, Typography } from "antd";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/use-auth-client";

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const { isAuthenticated, principal, login, logout } = useAuth();

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#001529",
        padding: "0 24px",
      }}
    >
      <div style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
        ✍️ Quill & Coin
      </div>
      <Space>
        {isAuthenticated ? (
          <>
            <Space>
              <UserOutlined style={{ color: "white" }} />
              <Text style={{ color: "white" }}>
                {principal?.slice(0, 8)}...{principal?.slice(-8)}
              </Text>
            </Space>
            <Button 
              type="primary" 
              icon={<LogoutOutlined />} 
              onClick={logout}
              ghost
            >
              Logout
            </Button>
          </>
        ) : (
          <Button 
            type="primary" 
            icon={<LoginOutlined />} 
            onClick={login}
          >
            Login
          </Button>
        )}
      </Space>
    </Header>
  );
};

export default AppHeader;