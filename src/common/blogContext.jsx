import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const BlogContext = createContext();

const initialBlog = {
  title: "",
  banner: "",
  des: "",
  content: [],
  tags: [],
  author: null,
  activity: {
    total_likes: 0,
    total_comments: 0,
    total_reads: 0,
    total_parent_comments: 0,
  },
  comments: [],
  draft: false,
};

export const BlogProvider = ({ children }) => {
  const [blog, setBlog] = useState(initialBlog);
  const [activeTab, setActiveTab] = useState("editor");

  const resetBlog = () => {
    setBlog(initialBlog);
    setActiveTab("editor");
  };

  return (
    <BlogContext.Provider
      value={{
        blog,
        setBlog,
        activeTab,
        setActiveTab,
        resetBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useBlog = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }

  return context;
};