import { BrowserRouter, Routes } from "react-router";
import "./App.css";
import { Layout } from "./components/Layout";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
