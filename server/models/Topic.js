const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  leetcodeLink: String,
  youtubeLink: String,
  articleLink: String,
  level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subTopics: [subTopicSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("topic", topicSchema);
