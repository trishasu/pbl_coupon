import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "../data.js";
import { Form, Navbar, Container, Nav } from "react-bootstrap";

function Checkpw() {
  let navigate = useNavigate();
  return (
    <>
      <div class="nav justify-content-end bg-dark">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container><Navbar.Brand>Coupon</Navbar.Brand></Container>
        </Navbar>
      </div>
      <div class="text">
        <div class="title">비밀번호를 입력하세요</div>
        <div class="explanation">
          비밀번호
          <br />
          <br />
          <input type="text" size="20" />
          <br />
          <br />
        </div>
      </div>

      <div class="Btn">
        <button
          onClick={() => {
            navigate("/admin");
          }}
          type="button"
          class="btn btn-dark"
        >
          확인
        </button>
      </div>
    </>
  );
}

export default Checkpw;
