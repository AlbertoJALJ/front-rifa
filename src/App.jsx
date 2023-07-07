import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import CreateUser from "./pages/CreateUser";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<CreateUser />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
