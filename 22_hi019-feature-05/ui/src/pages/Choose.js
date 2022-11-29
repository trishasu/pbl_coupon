import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Form, Navbar, Container, Nav } from "react-bootstrap";

function Choose(props) {
  let navigate = useNavigate();
  return (
    <>
      <div class="nav justify-content-end bg-dark">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="/checkpw">Admin</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className="chooseBtn">
        <div className="btn2">
          <button
            onClick={() => {
              navigate("/save");
            }}
            type="button"
            class="btn btn-dark"
            size="big"
          >
            쿠폰적립
          </button>
        </div>
        <div className="btn2">
          <button
            onClick={() => {
              navigate("/use");
            }}
            type="button"
            class="btn btn-dark"
            size="big"
          >
            쿠폰사용
          </button>
        </div>
      </div>
    </>
  );
}

export default Choose;
