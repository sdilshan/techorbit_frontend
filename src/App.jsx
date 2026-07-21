import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./routes/PublicRoute";
import Editor from "./pages/editor.pages";

const App = () => {
    return (
        <>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
       < Routes>
       <Route path="/editor" element={<Editor/>}/>
       <Route path="/" element={<Navbar/>}>
            <Route path="signin" element={<PublicRoute><UserAuthForm type="sign-in"/></PublicRoute>}/>
            <Route path="signup" element={<PublicRoute><UserAuthForm type="sign-up"/></PublicRoute>}/>
       </Route>
       </Routes>
       </>
    )
}
export default App;