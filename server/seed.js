const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Topic = require("./models/Topic"); // adjust if needed

mongoose
  .connect(
    "mongodb+srv://hemant:RpY5383zQyF8nQPe@cluster0.v0s5q.mongodb.net/dsa-sheet?retryWrites=true&w=majority&appName=Cluster0",
    {
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("MongoDB connected");

    await Topic.deleteMany(); // optional: clears existing data

    const sampleTopics = [
      {
        name: "Algorithms",
        subTopics: [
          {
            name: "Two Sum",
            youtubeLink: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
            leetcodeLink: "https://leetcode.com/problems/two-sum/",
            codeforcesLink: "",
            articleLink: "https://www.geeksforgeeks.org/two-sum-problem/",
            level: "Easy",
          },
          {
            name: "Best Time to Buy and Sell Stock",
            youtubeLink: "https://www.youtube.com/watch?v=1pkOgXD63yU",
            leetcodeLink:
              "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            codeforcesLink: "",
            articleLink: "https://www.geeksforgeeks.org/stock-buy-sell/",
            level: "Easy",
          },
          {
            name: 'Reverse Linked List',
            youtubeLink: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
            leetcodeLink: 'https://leetcode.com/problems/reverse-linked-list/',
            codeforcesLink: '',
            articleLink: 'https://www.geeksforgeeks.org/reverse-a-linked-list/',
            level: 'Medium'
          },
          {
            name: 'Merge Two Sorted Lists',
            youtubeLink: 'https://www.youtube.com/watch?v=XIdigk956u0',
            leetcodeLink: 'https://leetcode.com/problems/merge-two-sorted-lists/',
            codeforcesLink: '',
            articleLink: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/',
            level: 'Medium'
          },
          {
            name: 'LRU Cache',
            youtubeLink: 'https://www.youtube.com/watch?v=7ABFKPK2hD4',
            leetcodeLink: 'https://leetcode.com/problems/lru-cache/',
            codeforcesLink: '',
            articleLink: 'https://www.geeksforgeeks.org/lru-cache-implementation/',
            level: 'Hard'
          },
          {
            name: 'Binary Tree Level Order Traversal',
            youtubeLink: 'https://www.youtube.com/watch?v=6ZnyEApgFYg',
            leetcodeLink: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
            codeforcesLink: '',
            articleLink: 'https://www.geeksforgeeks.org/level-order-tree-traversal/',
            level: 'Hard'
          },
          {
            name: 'Serialize and Deserialize Binary Tree',
            youtubeLink: 'https://www.youtube.com/watch?v=suj1ro8TIVY',
            leetcodeLink: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
            codeforcesLink: '',
            articleLink: 'https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/',
            level: 'Hard'
          }
        ],
      },
      {
        name: "Data Structures",
        subTopics: [
          {
            name: "Longest Palindromic Substring",
            youtubeLink: "https://www.youtube.com/watch?v=XYQecbcd6_c",
            leetcodeLink:
              "https://leetcode.com/problems/longest-palindromic-substring/",
            codeforcesLink: "",
            articleLink:
              "https://www.geeksforgeeks.org/longest-palindromic-substring/",
            level: "Easy",
          },
          {
            name: 'Number of Islands',
            youtubeLink: 'https://www.youtube.com/watch?v=pV2kpPD66nE',
            leetcodeLink: 'https://leetcode.com/problems/number-of-islands/',
            codeforcesLink: '',
            articleLink: 'https://www.geeksforgeeks.org/find-number-of-islands/',
            level: 'Easy'
          },
          {
            name: 'Course Schedule',
            youtubeLink: 'https://www.youtube.com/watch?v=kXy0ABd1vwo',
            leetcodeLink: 'https://leetcode.com/problems/course-schedule/',
            codeforcesLink: '',
            articleLink: 'https://www.geeksforgeeks.org/find-whether-it-is-possible-to-finish-all-tasks-or-not-from-given-dependencies/',
            level: 'Medium'
          },
          {
            name: 'Word Ladder',
            youtubeLink: 'https://www.youtube.com/watch?v=h9iTnkgv05E',
            leetcodeLink: 'https://leetcode.com/problems/word-ladder/',
            codeforcesLink: '',
            articleLink: 'https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/',
            level: 'Hard'
          }
        ],
      },
      {
        name: "Databases",
        subTopics: [],
      },
      {
        name: "Machine Learnings",
        subTopics: [],
      },
      {
        name: "Operating Systems",
        subTopics: [],
      },
    ];

    await Topic.insertMany(sampleTopics);
    console.log("Sample topics added!");
    process.exit();
  })
  .catch((err) => {
    console.error("DB error:", err);
    process.exit(1);
  });

//
