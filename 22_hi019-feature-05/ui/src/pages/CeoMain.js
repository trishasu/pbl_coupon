import React from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Form, Navbar, Container, Nav } from "react-bootstrap";
import data from "../data";
import axios from "axios";

function CeoMain() {
  const navigate = useNavigate();
  const [checkId, setcheckId] = useState("");
  let { ceoId } = useParams();
  // const [coupon] = useState(data);
  // const message = "다시 입력해주세요";
  console.log(checkId);
  const custhandleLogin = () => {
    if (checkId.length > 0) {
      axios
        .get(`/api/v1/cust/${checkId}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.custPt >= 10) {
            navigate(`/use/${checkId}`);
          } else {
            navigate(`/save/${checkId}`);
          }
        })
        .catch(() => alert("적립할 수 없는 번호입니다"));
    }
  };
  const logout = () => {
    console.log(sessionStorage.getItem("ceotb"));
    sessionStorage.removeItem("ceotb");
  };

  const adminClick = (e) => {
    navigate(`/admin/${ceoId}`);
  };

  return (
    <>
      <div class="nav justify-content-end bg-dark">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand onClick={(e) => adminClick(e)}>Admin</Navbar.Brand>
            <Navbar.Brand onClick={(e) => logout(e)} href="/">
              Logout
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className="title">쿠폰 적립</div>
      <div className="explanation">쿠폰 적립을 위해 번호를 입력해 주세요</div>
      <div className="phoneNumber">
        <input
          onChange={(e) => setcheckId(e.target.value)}
          type="text"
          size="40"
        />
      </div>
      <div className="Btn">
        <button
          onClick={custhandleLogin}
          type="button"
          className="btn btn-dark"
          disabled={checkId.length <= 0}
        >
          확인
        </button>
      </div>
    </>
  );
}

// function idCheck(props) {
//   var checkId = props.checkId;
//   console.log(props.coupon[0].id);

//   switch (checkId) {
//     case props.coupon[0].id:
//       return props.navigate("/choose");
//     case props.coupon[1].id:
//       return props.navigate("/choose");
//     default:
//       return alert(props.message);
//   }
// }

export default CeoMain;
