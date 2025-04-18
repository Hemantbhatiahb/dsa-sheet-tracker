const Topic = require("../models/Topic");
const User = require("../models/User");
const mongoose = require("mongoose");

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json({ data: topics, status: 200, success: true });
  } catch (err) {
    console.error("Error fetching topics:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateUserSolvedSubtopic = async (req, res) => {
  const { topicId, subtopicId } = req.params;
  const {userId} = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(topicId) ||
    !mongoose.Types.ObjectId.isValid(subtopicId)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid topic or subtopic ID format.", success: false });
  }
  try {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res
        .status(404)
        .json({ error: "Topic not found.", success: false });
    }

    const subtopic = topic.subTopics.id(subtopicId);
    if (!subtopic) {
      return res.status(404).json({
        error: "Subtopic not found within the topic.",
        success: false,
      });
    }

    const user = await User.findById(userId)

    const index = user.solvedProblems.findIndex(
      (sp) => sp.topicId.toString() === topicId && sp.problemId.toString() === subtopicId
    );


    if (index > -1) {
      // Already solved → toggle off (remove)
      user.solvedProblems.splice(index, 1);
    } else {
      // Not yet solved → add
      user.solvedProblems.push({ topicId, problemId: subtopicId });
    }
    
    await user.save();
    res.status(200).json({
      message: "success",
      solvedProblems: user.solvedProblems,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSolvedProblems = async (req, res) => {
  try {
    const {userId} = req.params
    const user = await User.findById(userId);
    
    if(!user) {
      throw new Error('Failed to fetch user')
    } 
    res.status(200).json({
      message: "success",
      data: user.solvedProblems,
      success: true,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTopics,
  updateUserSolvedSubtopic,
  getSolvedProblems
};
