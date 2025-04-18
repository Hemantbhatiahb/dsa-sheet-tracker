// src/context/TopicContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { getTopics, getSolvedProblems, updateSubtopicCheck } from "../api/topics";
import { useSelector } from "react-redux";
import { message } from "antd";

const TopicContext = createContext();

export const TopicProvider = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const [topics, setTopics] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressStats, setProgressStats] = useState({
    easy: { solved: 0, total: 0, percentage: 0 },
    medium: { solved: 0, total: 0, percentage: 0 },
    hard: { solved: 0, total: 0, percentage: 0 },
    overall: { solved: 0, total: 0, percentage: 0 },
  });

  useEffect(() => {
    if (user) {
      fetchTopics();
    }
  }, [user]);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const [topicsRes, solvedRes] = await Promise.all([
        getTopics(),
        getSolvedProblems(user._id),
      ]);

      if (topicsRes.success && solvedRes.success) {
        const solvedSet = new Set(
          solvedRes.data.map((item) => `${item.topicId}-${item.problemId}`)
        );

        const enrichedTopics = topicsRes.data.map((topic) => {
          const updatedSubTopics = topic.subTopics.map((sub) => ({
            ...sub,
            isDone: solvedSet.has(`${topic._id}-${sub._id}`),
          }));
          return { ...topic, subTopics: updatedSubTopics };
        });

        setTopics(enrichedTopics);
        setSolvedProblems(solvedRes.data);
        calculateProgress(enrichedTopics);
      } else {
        message.error("Failed to fetch topics");
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      message.error("Failed to load topics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (topicsData) => {
    const stats = {
      easy: { solved: 0, total: 0, percentage: 0 },
      medium: { solved: 0, total: 0, percentage: 0 },
      hard: { solved: 0, total: 0, percentage: 0 },
      overall: { solved: 0, total: 0, percentage: 0 },
    };

    topicsData.forEach((topic) => {
      topic.subTopics.forEach((subtopic) => {
        const level = subtopic.level ? subtopic.level.toLowerCase() : "medium";

        if (level === "easy" || level === "medium" || level === "hard") {
          stats[level].total += 1;
          stats.overall.total += 1;

          if (subtopic.isDone) {
            stats[level].solved += 1;
            stats.overall.solved += 1;
          }
        }
      });
    });

    // Calculate percentages
    Object.keys(stats).forEach((level) => {
      if (stats[level].total > 0) {
        stats[level].percentage = Math.round(
          (stats[level].solved / stats[level].total) * 100
        );
      }
    });

    setProgressStats(stats);
  };

  const updateSubtopicStatus = async (topicId, subtopicId, currentStatus) => {
    try {
      const response = await updateSubtopicCheck(topicId, subtopicId, user._id);

      if (response.success) {
        const key = `${topicId}-${subtopicId}`;
        const newSolvedSet = new Set(
          solvedProblems.map((item) => `${item.topicId}-${item.problemId}`)
        );

        if (currentStatus) {
          newSolvedSet.delete(key);
        } else {
          newSolvedSet.add(key);
        }

        const updatedSolvedArray = Array.from(newSolvedSet).map((entry) => {
          const [tId, pId] = entry.split("-");
          return { topicId: tId, problemId: pId };
        });

        const updatedTopics = topics.map((topic) => {
          const updatedSubTopics = topic.subTopics.map((sub) => ({
            ...sub,
            isDone: newSolvedSet.has(`${topic._id}-${sub._id}`),
          }));
          return { ...topic, subTopics: updatedSubTopics };
        });

        setSolvedProblems(updatedSolvedArray);
        setTopics(updatedTopics);
        calculateProgress(updatedTopics);

        message.success(
          `Marked as ${!currentStatus ? "completed" : "pending"}`
        );
      } else {
        message.error("Failed to update subtopic status");
      }
    } catch (error) {
      console.error("Error updating subtopic:", error);
      message.error("Failed to update subtopic. Please try again.");
    }
  };

  const value = {
    topics,
    loading,
    solvedProblems,
    progressStats,
    fetchTopics,
    updateSubtopicStatus,
  };

  return (
    <TopicContext.Provider value={value}>{children}</TopicContext.Provider>
  );
};

export const useTopicContext = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("useTopicContext must be used within a TopicProvider");
  }
  return context;
};
