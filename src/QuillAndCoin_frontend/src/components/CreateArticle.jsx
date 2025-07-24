import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useAuth } from "../hooks/use-auth-client";

const CreateArticle = (props) => {
  const { actor } = useAuth();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    const res = await actor.createArticle(values.title, values.content);
    setLoading(false);
    if (res.err) {
      console.log(res.err);
      message.error("Error creating article!");
      return;
    }
    message.success("Article created successfully!");
    form.resetFields();
    props.onArticleCreated();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title" }]}>
        <Input placeholder="Enter your article title" />
      </Form.Item>
      <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please enter content" }]}>
        <Input.TextArea rows={8} placeholder="Write your article content..." />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Publish Article
      </Button>
    </Form>
  );
};

export default CreateArticle;