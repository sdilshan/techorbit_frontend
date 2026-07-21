import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../common/session";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import { BlogProvider,useBlog } from "../common/BlogContext";

const EditorContent = () => {
  const { activeTab } = useBlog();

  return activeTab === "editor" ? <BlogEditor /> : <PublishForm />;
};
const Editor = () => {
  const { userAuth } = useContext(SessionContext);

  if (!userAuth.accessToken) {
    return <Navigate to="/signin" replace />;
  }

   return (
    <BlogProvider>
      <EditorContent/>
    </BlogProvider>
  );
};

export default Editor;