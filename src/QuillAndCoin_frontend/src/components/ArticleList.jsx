import React, { useEffect, useState } from "react";
import {
  List,
  Button,
  Input,
  message,
  Card,
  Typography,
  Modal,
  Space,
} from "antd";
import CreateArticle from "./CreateArticle";
import { QuillAndCoin_backend as backend } from "../../../declarations/QuillAndCoin_backend";
import {
  ClockCircleOutlined,
  UserOutlined,
  DollarCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useAuth } from "../hooks/use-auth-client";

const { Title, Text } = Typography;
const ArticleList = () => {
  const { isAuthenticated, identity, login, ledgerActor } = useAuth();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [rewardAmount, setRewardAmount] = useState(null);
  const [balance, setBalance] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    const res = await backend.getArticles();
    setLoading(false);
    if (res.err) {
      console.log(res.err);
      message.error("Error fetching articles");
      return;
    }
    setArticles(res.ok);
  };

  const getBalance = async () => {
    const balance = await ledgerActor.icrc1_balance_of({
      owner: identity.getPrincipal(),
      subaccount: [],
    });
    setBalance(Number(balance) / 100_000_000);
  };

  const handleReward = async () => {
    if (!rewardAmount) {
      message.error("Please enter reward amount.");
      return;
    }
    try {
      const transferArgs = {
        to: {
          owner: selectedArticle.author,
          subaccount: [],
        },
        amount: BigInt(100_000_000 * rewardAmount),
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
      };
      const result = await ledgerActor.icrc1_transfer(transferArgs);
      console.log("Transfer Result:", result);
      setRewardAmount(null);
      setSelectedArticle(null);
      setIsRewardModalOpen(false);
      message.success("Reward sent successfully!");
    } catch (error) {
      console.log(error);
      message.error("Error sending reward!");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const renderDate = (article) => {
    return `Published: ${new Date(
      Number(article.created_at) / 1_000_000
    ).toLocaleString()}`;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Title level={2}>✍️ Quill & Coin</Title>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            if (!isAuthenticated) {
              login();
              return;
            }
            setIsCreateModalOpen(true);
          }}
        >
          Write Article
        </Button>
      </div>
      <List
        loading={loading}
        dataSource={articles}
        renderItem={(article) => (
          <List.Item key={article.id}>
            <Card
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0px 4px 16px rgba(0,0,0,0.08)",
                marginBottom: "16px",
              }}
            >
              <Title level={3} style={{ marginTop: 0, color: "#1890ff" }}>
                {article.title}
              </Title>
              <Text style={{ whiteSpace: "pre-wrap", display: "block", marginBottom: "16px" }}>
                {article.content}
              </Text>
              <div
                style={{ marginBottom: "8px", color: "#666", fontSize: "14px" }}
              >
                <Space>
                  <UserOutlined />
                  {`Author: ${article.author.toString()}`}
                </Space>
              </div>
              <div
                style={{ marginBottom: "16px", color: "#666", fontSize: "14px" }}
              >
                <Space>
                  <ClockCircleOutlined />
                  {renderDate(article)}
                </Space>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  type="primary"
                  icon={<DollarCircleOutlined />}
                  onClick={() => {
                    if (!isAuthenticated) {
                      login();
                      return;
                    }
                    getBalance();
                    setSelectedArticle(article);
                    setIsRewardModalOpen(true);
                  }}
                >
                  Reward Author
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="✍️ Write New Article"
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={null}
        width={800}
      >
        <CreateArticle
          onArticleCreated={() => {
            setIsCreateModalOpen(false);
            fetchArticles();
          }}
        />
      </Modal>
      <Modal
        title="💰 Reward Author"
        open={isRewardModalOpen}
        onCancel={() => {
          setRewardAmount(null);
          setSelectedArticle(null);
          setIsRewardModalOpen(false);
        }}
        onOk={handleReward}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <Text>Reward Amount (ICP)</Text>
          <Text>Balance: {balance} ICP</Text>
        </div>
        <Input
          type="number"
          placeholder="Enter reward amount"
          value={rewardAmount}
          onChange={(e) => setRewardAmount(e.target.value)}
          step="0.01"
          min="0"
        />
      </Modal>
    </div>
  );
};

export default ArticleList;