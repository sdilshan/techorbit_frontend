import AnimationWrapper from "../common/page-animation";
import { useBlog } from "../common/BlogContext";
import Tag from "./tags.component";
import { useState } from "react";
import { createBlog } from "../services/blogService";
const PublishForm = () => {
  const [tagError, setTagError] = useState("");

  const characterLimit = 200;
  const MAX_TAGS = 5;
  const { blog, setActiveTab, setBlog } = useBlog();
  const handleClose = () => {
    setActiveTab("editor");
  };

  const handleTitleChange = (e) => {
    setBlog((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    const textarea = e.target;

    setBlog((prev) => ({
      ...prev,
      des: textarea.value,
    }));
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const handleDescriptionKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key !== "Enter" && e.key !== ",") return;

    e.preventDefault();

    const value = e.target.value.trim().replace(/,$/, "");

    if (!value) return;

    if (value.length > 30) return;

    if (blog.tags.length >= MAX_TAGS) return;

    const exists = blog.tags.some(
      (tag) => tag.toLowerCase() === value.toLowerCase(),
    );

    if (exists) {
      e.target.value = "";
      return;
    }

    setBlog((prev) => ({
      ...prev,
      tags: [...prev.tags, value],
    }));

    e.target.value = "";
  };
  const handlePublish = async () => {
  try {
    const response = await createBlog({
      title: blog.title,
      banner: blog.banner,
      des: blog.des,
      content: blog.content,
      tags: blog.tags,
     // author: user._id, // or remove this if using JWT
      draft: false,
    });

    console.log(response);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};
  return (
    <AnimationWrapper>
      <section
        className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4
      "
      >
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleClose}
        >
          <i className="fi fi-br-cross"></i>
        </button>
        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={blog.banner} alt="" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {blog.title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {blog.des}
          </p>
        </div>
        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            className="input-box pl-4 "
            defaultValue={blog.title}
            onChange={handleTitleChange}
          />
          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>
          <textarea
            maxLength={characterLimit}
            value={blog.des}
            onChange={handleDescriptionChange}
            placeholder="Write a short description..."
            className="h-40 resize-none leading-7 input-box"
            onKeyDown={handleDescriptionKeyDown}
          />
          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - blog.des.length} Characters left
          </p>
          <p className="text-dark-grey mb-2 mt-9">
            Topics - (Helps to searching and ranking your blog)
          </p>
          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              className=" sticky input-box bg-white top-0 left-0 pl-4 mb-3 placeholder:opacity-50
            focus:bg-white"
              onKeyDown={(e) => {
                // Show error when trying to type more than 30 characters
                if (
                  e.target.value.length >= 30 &&
                  e.key.length === 1 &&
                  !e.ctrlKey &&
                  !e.metaKey &&
                  !e.altKey
                ) {
                  e.preventDefault();
                  setTagError("Topic cannot exceed 30 characters.");
                  return;
                }

                setTagError("");
                handleTagKeyDown(e);
              }}
              disabled={blog.tags.length >= MAX_TAGS}
            />
            {tagError && <p className="text-red text-sm mb-2">{tagError}</p>}
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <Tag
                  key={index}
                  text={tag}
                  onEdit={(newTag) => {
                    const value = newTag.trim();

                    const exists = blog.tags.some(
                      (tag, i) =>
                        i !== index &&
                        tag.toLowerCase() === value.toLowerCase(),
                    );

                    if (exists) {
                      return null;
                    }

                    setBlog((prev) => ({
                      ...prev,
                      tags: prev.tags.map((tag, i) =>
                        i === index ? value : tag,
                      ),
                    }));

                    return value;
                  }}
                  onRemove={() => {
                    setBlog((prev) => ({
                      ...prev,
                      tags: prev.tags.filter((_, i) => i !== index),
                    }));
                  }}
                />
              ))}
            </div>
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-right"> 
            {MAX_TAGS-blog.tags.length} Tags left
          </p>
          <button className="btn-dark px-8" onClick={handlePublish}>Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  );
};
export default PublishForm;
