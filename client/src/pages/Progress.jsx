import React from "react";
import { Layout, Typography } from "antd";
import { useTopicContext } from "../context/TopicContext";

const { Content } = Layout;
const { Title, Text } = Typography;

const Progress = () => {
  const { progressStats } = useTopicContext();

  return (
    <Layout className="layout">
      <Content className="progress-content">
        <div className="progress-container">
          <Title level={2}>Progress Reports</Title>
          <Text className="progress-item">
            Easy: {progressStats.easy.percentage}%
          </Text>
          <br />
          <Text className="progress-item">
            Medium: {progressStats.medium.percentage}%
          </Text>
          <br />
          <Text className="progress-item">
            Hard: {progressStats.hard.percentage}%
          </Text>
        </div>
      </Content>
    </Layout>
  );
};

export default Progress;