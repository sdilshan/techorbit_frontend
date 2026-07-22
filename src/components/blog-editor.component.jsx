import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { useBlog } from "../common/BlogContext";
import { uploadImage } from "../services/aws";
import { toast } from "react-hot-toast";
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
const BlogEditor = () => {
  const { blog, setBlog, setActiveTab } = useBlog();
  const editorRef = useRef(null);
  const initialContent = useRef(blog.content || { blocks: [] });

  useEffect(() => {
    editorRef.current = new EditorJS({
      holder: "textEditor",
      data: initialContent.current,
      tools,
      placeholder: "Let's start your story",
    });

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const imageUrl = await toast.promise(uploadImage(file), {
        loading: "Uploading image...",
        success: "Image uploaded successfully!",
        error: "Image upload failed!",
      });

      setBlog((prev) => ({
        ...prev,
        banner: imageUrl,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (e) => {
    const textarea = e.target;

    setBlog((prev) => ({
      ...prev,
      title: textarea.value,
    }));

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handlePublish = async () => {
    try {
      if (!blog.banner) {
        return toast.error("Please upload a banner image.");
      }

      if (!blog.title.trim()) {
        return toast.error("Please enter a blog title.");
      }

      const content = await editorRef.current.save();

      if (!content.blocks.length) {
        return toast.error("Please write some content.");
      }

      setBlog((prev) => ({
        ...prev,
        content,
      }));

      setActiveTab("publish");
      console.log({
        ...blog,
        content,
      });

      // Navigate to publish page or send to API here
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {blog.title || "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublish}>
            Publish
          </button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="reletive aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label>
                <img src={blog.banner || defaultBanner} className="z-20" />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, jpeg"
                  hidden
                  onChange={handleBannerUpload}
                ></input>
              </label>
            </div>
            <textarea
              value={blog.title}
              onChange={handleTitleChange}
              rows={1}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full
              outline-none resize-none mt-10 leading-tight
              placeholder:opacity-40 overflow-hidden"
            />

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};
export default BlogEditor;
