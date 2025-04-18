import React from "react";
import {
  Layout,
  Typography,
  Collapse,
  Table,
  Checkbox,
  Tag,
  message,
  Spin,
} from "antd";
import { UpOutlined } from "@ant-design/icons";
import { useTopicContext } from "../context/TopicContext";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const Topics = () => {
  const { topics, loading, updateSubtopicStatus } = useTopicContext();

  const getColumns = (topicId) => [
    {
      title: "",
      dataIndex: "isDone",
      key: "isDone",
      width: 50,
      render: (isDone, record) => (
        <Checkbox
          checked={isDone}
          onChange={() => updateSubtopicStatus(topicId, record._id, isDone)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "LeetCode Link",
      dataIndex: "leetcodeLink",
      key: "leetcodeLink",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noreferrer">
            Practice
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "YouTube Link",
      dataIndex: "youtubeLink",
      key: "youtubeLink",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noreferrer">
            Watch
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Article Link",
      dataIndex: "articleLink",
      key: "articleLink",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noreferrer">
            Read
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level) => {
        let color =
          level === "Easy" ? "green" : level === "Medium" ? "orange" : "red";
        return <Tag color={color}>{level}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "isDone",
      key: "status",
      render: (isDone) => {
        let color = isDone ? "green" : "volcano";
        return <Tag color={color}>{isDone ? "Done" : "Pending"}</Tag>;
      },
    },
  ];

  const calculateTopicStatus = (topic) => {
    if (!topic.subTopics || topic.subTopics.length === 0) {
      return "Pending";
    }

    const completedCount = topic.subTopics.filter(
      (subtopic) => subtopic.isDone
    ).length;
    const totalCount = topic.subTopics.length;

    if (completedCount === totalCount) {
      return "Completed";
    } else {
      return "Pending";
    }
  };

  const customExpandIcon = (props) => {
    const topic = topics.find((t) => t._id === props.panelKey);
    const status = topic ? calculateTopicStatus(topic) : "Pending";
    const statusColor = status === "Completed" ? "green" : "volcano";

    return (
      <div className="custom-collapse-header">
        <div className="topic-header">
          <span className="topic-name">{topic ? topic.name : ""}</span>
          <Tag color={statusColor} className="topic-status">
            {status}
          </Tag>
        </div>
        <UpOutlined rotate={props.isActive ? 0 : 180} className="expand-icon" />
      </div>
    );
  };

  if (loading) {
    return (
      <Layout className="layout">
        <Content className="topics-content" style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" tip="Loading topics..." />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="layout">
      <Content className="topics-content">
        <div className="topics-container">
          <div className="topics-header">
            <Title level={2}>Topics</Title>
            <Text>Explore these exciting topics!</Text>
          </div>

          <Collapse
            className="topics-collapse"
            expandIcon={customExpandIcon}
          >
            {topics.map((topic) => (
              <Panel key={topic._id} header={null} className="topic-panel">
                <div className="subtopics-section">
                  <Title level={3} className="subtopics-title">
                    Sub Topics
                  </Title>
                  {topic.subTopics && topic.subTopics.length > 0 ? (
                    <Table
                      columns={getColumns(topic._id)}
                      dataSource={topic.subTopics}
                      rowKey="_id"
                      pagination={false}
                      rowClassName="subtopic-row"
                    />
                  ) : (
                    <div className="no-subtopics">
                      <Text>No subtopics available for this topic.</Text>
                    </div>
                  )}
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      </Content>
      <Footer className="footer">© 2024 Dashboard. All Rights Reserved.</Footer>
    </Layout>
  );
};

export default Topics;