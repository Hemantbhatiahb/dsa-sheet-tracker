import { axiosInstance } from ".";

export const getTopics = async () => {
  try {
    const response = await axiosInstance.get("/api/topics");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSubtopicCheck = async (topicId, subtopicId, userId) => {
  try {
    const response = await axiosInstance.put(
      `/api/topics/${topicId}/subtopics/${subtopicId}/check`,
      { userId: userId }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getSolvedProblems = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/topics/solvedProblems/${userId}`,);
    return response.data;
  } catch (error) {
    throw error;
  }
};
