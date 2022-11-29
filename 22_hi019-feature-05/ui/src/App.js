import React, { useState, useEffect, useLayoutEffect } from "react";
import { Form, Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import CeoMain from "./pages/CeoMain";
import CustomerMain from "./pages/CustomerMain";
import Choose from "./pages/Choose";
import Save from "./pages/Save";
import SaveFin from "./pages/SaveFin";
import Use from "./pages/Use";
import UseFin from "./pages/UseFin";
// import data from "./data";
import Admin from "./pages/Admin";
import Checkpw from "./pages/Checkpw";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    id: "",
    pw: "",
  });
  let { custId } = useParams();

  const custhandleLogin = () => {
    console.log(loginData);
    axios
      .post("/api/v1/cust/login", {
        custId: loginData.id,
        custPw: loginData.pw,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.custId);
        navigate(`/customermain/${response.data.custId}`);
        sessionStorage.setItem("cust", JSON.stringify(response.data));
        // console.log(sessionStorage.getItem("cust"));
        // sessionStorage.removeItem("cust")
      })
      .catch(() => alert("로그인에 실패하였습니다"));
  };

  const ceohandleLogin = () => {
    console.log(loginData);
    axios
      .post("/api/v1/ceotb/login", {
        ceoId: loginData.id,
        ceoPw: loginData.pw,
      })
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("ceotb", JSON.stringify(response.data));
        // console.log(sessionStorage.getItem("ceotb"));
        // sessionStorage.removeItem("ceotb")
        navigate(`/ceomain/${response.data.ceoId}`);
      })
      .catch(() => alert("로그인에 실패하였습니다"));
  };

  // const custhandleLogin = () => {
  //   axios
  //     .post("/api/v1/ceo/login", {
  //       custId: "a-ceo",
  //       custPw: "12345",
  //     })
  //     .then((response) => {
  //       console.log(response.data);

  //       if (response.data.ceoPt >= 10) {
  //         navigate("/use");
  //       } else {
  //         navigate("/save");
  //       }
  //     });
  // };

  const handleInput = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* <div className="nav justify-content-end bg-dark">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="/">LogOut</Navbar.Brand>
          </Container>
        </Navbar>
      </div> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div class="nav justify-content-end bg-dark">
                <Navbar expand="lg" variant="dark" bg="dark">
                  <Container>
                    <Navbar.Brand>Coupon</Navbar.Brand>
                  </Container>
                </Navbar>
              </div>
              <div className="text">
                <div className="title">로그인</div>
                <div className="explanation">
                  아이디
                  <br />
                  <br />
                  <input
                    name="id"
                    type="text"
                    size="20"
                    onChange={(e) => handleInput(e)}
                  />
                  <br />
                  <br />
                  비밀번호
                  <br />
                  <br />
                  <input
                    name="pw"
                    type="password"
                    size="20"
                    onChange={(e) => handleInput(e)}
                  />
                  <br />
                  <br />
                </div>
              </div>

              <div className="Btn">
                <button
                  onClick={() => {
                    ceohandleLogin();
                  }}
                  type="button"
                  className="btn btn-dark"
                  disabled={loginData.id.length <= 0 || loginData.pw <= 0}
                >
                  사장님로그인
                </button>
                <button
                  onClick={() => {
                    custhandleLogin();
                  }}
                  type="button"
                  className="btn btn-dark"
                  disabled={loginData.id.length <= 0 || loginData.pw <= 0}
                >
                  사용자로그인
                </button>
              </div>
            </>
          }
        />
        <Route path="/ceomain/:ceoId" element={<CeoMain />} />
        <Route path="/customermain/:custId" element={<CustomerMain />} />
        <Route path="/checkpw" element={<Checkpw />} />
        <Route path="/admin/:ceoId" element={<Admin />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/save/:custId" element={<Save />} />
        <Route path="/save/:custId/finish" element={<SaveFin />} />
        <Route path="/use/:custId" element={<Use />} />
        <Route path="/use/:custId/finish" element={<UseFin />} />
        <Route path="*" element={<div>404error</div>} />
      </Routes>
    </>
  );
}

export default App;
