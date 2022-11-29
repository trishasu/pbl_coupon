import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { Form, Navbar, Container, Nav } from "react-bootstrap";
import placedata from "../placedata.js";
import data from "../data";
import axios from "axios";

function CustomerMain() {
  let [place] = useState(placedata);
  //const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let { custId } = useParams();
  // let { custPw } = useParams();
  let [coupon, setCoupon] = useState(data);
  // const [loginData, setLoginData] = useState({
  //   id: custId,
  //   pw: custPw,
  // });

  const logout = () => {
    console.log(sessionStorage.getItem("cust"));
    sessionStorage.removeItem("cust");
  };
  // useEffect(() => {
  //   console.log(loginData);
  //   axios
  //     .post(`/api/v1/cust/login`, {
  //       custId: loginData.id,
  //       custPw: loginData.pw,
  //     })
  //     .then((response) => {
  //       setCoupon(response.data);
  //     })
  //     .catch(() => console.log("실패함"));
  //   // .finally(() => setLoading(false));
  // }, []);

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

  return (
    <div className="App">
      <div class="nav justify-content-end bg-dark">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand>보유쿠폰 {coupon.custPt} 개</Navbar.Brand>
            <Navbar.Brand href="/" onClick={(e) => logout(e)}>
              Logout
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {place.map((a, i) => {
                    return <Card key={i} place={place[i]} i={i}></Card>;
                  })}
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-3">
      <img
        className="cafeImage"
        alt="cafeImage"
        src={"/img/cafe" + props.i + ".jpg"}
        width="80%"
      />
      <h4>{props.place.placeTitle}</h4>
      <p>{props.place.placeContent}</p>
      <p>{props.place.placeLocation}</p>
    </div>
  );
}

export default CustomerMain;
