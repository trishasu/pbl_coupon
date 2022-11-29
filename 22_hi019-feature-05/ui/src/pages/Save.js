import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { Form, Navbar, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import data from "../data";
import axios from "axios";

function Save() {
  let navigate = useNavigate();
  let [coupon, setCoupon] = useState(data);
  let { custId } = useParams();

  useEffect(() => {
    if (custId.length > 0) {
      axios
        .get(`/api/v1/cust/${custId}`)
        .then((response) => {
          setCoupon(response.data);
        })
        .catch(() => console.log("실패함"));
    }
  }, []);

  const handleUpdate = () => {
    if (custId.length > 0) {
      axios
        .put(`/api/v1/cust`, {
          custId,
          custPt: coupon.custPt + 1,
        })
        .then((response) => {
          navigate(`/save/${custId}/finish`);
        })
        .catch(() => console.log("실패함"));
    }
  };

  return (
    <>
      <div class="nav justify-content-end bg-dark">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand>Coupon</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div class="save">
        <div class="text">
          <div class="title">쿠폰 적립</div>
          <div class="explanation">
            현재 보유 쿠폰 <br />
            <br />
            {coupon.custPt} 개
          </div>
          <div class="explanation">
            적립 쿠폰
            <br />
            <br />
            1개
          </div>
        </div>
        <div class="Btn">
          <button
            onClick={() => {
              handleUpdate();
            }}
            type="button"
            class="btn btn-dark"
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}

export default Save;
