import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const AppContent = ({ children }) => {
  return (
    <Content
      style={{
        padding: "24px 48px",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          minHeight: "100%",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default AppContent;