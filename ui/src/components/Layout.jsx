import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AppBar } from "./AppBar";
import { Homepage } from "./Homepage";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { MyProfile } from "./MyProfile";
import { EditProfile } from "./EditProfile";
import { CreateQuestion } from "./CreateQuestion";
import { QuestionComponent } from "./QuestionComponent";
import { EditQuestion } from "./EditQuestion";
import { Profile } from "./Profile";

export const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <AppBar />
      )}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/question/:questionId" element={<QuestionComponent />} />
        <Route path="/edit-question/:questionId" element={<EditQuestion />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </>
  );
};
