import React from "react";
import { Layout } from "antd";
import AppHeader from "./layouts/AppHeader";
import AppContent from "./layouts/AppContent";
import { AuthProvider } from "./hooks/use-auth-client";
import ArticleList from "./components/ArticleList";
import "antd/dist/reset.css";

function App() {
  return (
    <AuthProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <AppContent>
          <ArticleList />
        </AppContent>
      </Layout>
    </AuthProvider>
  );
}

export default App;
