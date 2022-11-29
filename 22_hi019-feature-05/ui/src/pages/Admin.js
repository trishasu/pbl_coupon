import React from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Navbar, Container, Nav } from "react-bootstrap";
import admindata from "../admindata";
import data from "../data";
import axios from "axios";

function Admin() {
  const navigate = useNavigate();
  const [admin] = useState(admindata);
  let { ceoId } = useParams();
  let [coupon, setCoupon] = useState(data);
  console.log(ceoId);
  useEffect(() => {
    if (ceoId.length > 0) {
      axios
        .get(`/api/v1/ceotb/${ceoId}`)
        .then((response) => {
          setCoupon(response.data);
          console.log(response.data);
        })
        .catch(() => console.log("실패함"));
    }
  }, []);

  const ceomainClick = (e) => {
    navigate(`/ceomain/${ceoId}`);
  };

  return (
    <>
      <div class="nav justify-content-end bg-dark">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand onClick={(e) => ceomainClick(e)}>Coupon</Navbar.Brand>
            <Navbar.Brand href="/">Logout</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className="use">
        <div className="text">
          <div className="title">코인 내역 확인</div>
          <div className="explanation">
            현재 보유 코인 <br />
            <br />
            {coupon.ceoPt} 개
          </div>
        </div>
        <div className="Btn">
          <button onClick={() => {}} type="button" className="btn btn-dark">
            코인충전
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin;
