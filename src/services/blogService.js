import axios from "axios";

export const createBlog = async (blogData) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post("/create-blog", blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};