import axios from "axios";

const authToken = localStorage.getItem("authToken");

export const fetchAllQuestions = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/qubit/question/all",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    return [];
  }
};

export const fetchQuestionsByTag = async (tag) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/qubit/question/tag/${tag}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching questions with tag ${tag}:`, error);
    return [];
  }
};

export const fetchQuestionsByTitle = async (searchQuery) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/qubit/question/title/${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error searching questions with title ${searchQuery}:`,
      error
    );
    return [];
  }
};

export const fetchAllTags = async () => {
  try {
    const res = await axios.get("http://localhost:8080/qubit/tag/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error:", error.res?.data || error.message);
  }
};

export const createQuestion = async (createQuestionRequest) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/qubit/question/create",
      createQuestionRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error:", error.res?.data || error.message);
  }
};

export const getQuestion = async (questionId) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/qubit/question/${questionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error:", error.res?.data || error.message);
  }
};

export const addAnswer = async (answerRequest) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/qubit/answer/create",
      answerRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error:", error.res?.data || error.message);
  }
};

export const updateQuestion = async (questionId, updateQuestionRequest) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/qubit/question/${questionId}`,
      updateQuestionRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error:", error.res?.data || error.message);
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    await axios.delete(`http://localhost:8080/qubit/question/${questionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    console.error("Error:", error.res?.data || error.message);
  }
};

export const updateUpvotes = async (updateUpvotesRequest) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/qubit/answer/update-upvote",
      updateUpvotesRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error:", error.res?.data || error.message);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/qubit/user/current-user`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/qubit/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export const fetchTopContributors = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/qubit/user/top-contributors`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export const updateAnswer = async (answerId, updateAnswerRequest) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/qubit/answer/${answerId}`,
      updateAnswerRequest,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
