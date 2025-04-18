const express = require("express");
const {
  getAllTopics,
  getSolvedProblems,
  updateUserSolvedSubtopic,
} = require("../controllers/topicController");
const topicRouter = express.Router();

// Get all topics
topicRouter.get("/", getAllTopics);

// Toggle subtopic's isDone
topicRouter.put("/:topicId/subtopics/:subtopicId/check", updateUserSolvedSubtopic);

topicRouter.get('/solvedProblems/:userId', getSolvedProblems)

module.exports = topicRouter;
