import HomePage from "./HomePage/HomePage";
import CarDetails from "../src/Components/CarDetails";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Registration from "./RegisterPage/RegistrationPage";
import AddCarParse1 from "./AddCarPostPage/AddCar";
import AddCarParse2 from "./AddCarPostPage/AddCarParse2";
import LogIn from "./LogIn";
import { useState } from "react";

function App() {
  const [showLogIng, setShowLogIn] = useState(false);
  function closePopUp() {
    setShowLogIn(false);
  }
  return (
    <>
      <Router>
        <div className="bg-dark">
          <Navbar
            className="nav-bar-main"
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
          >
            <Navbar.Brand href="#home" className="ml-3">
              רכבי יד שנייה
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="pr-3">
                <Link to="/" className="nav-link" data-rb-event-key="/">
                  מודעות שפורסמו
                </Link>
                <Link
                  to="/add-new-car"
                  className="nav-link"
                  data-rb-event-key="/add-new-car"
                >
                  פרסם מודעה חדשה
                </Link>
                <Link to="/" className="nav-link" data-rb-event-key="/">
                  הפרופיל שלי
                </Link>
                <Link to="/" className="nav-link" data-rb-event-key="/">
                  מודעות שפרסמתי
                </Link>
              </Nav>

              <Nav className="mr-auto ">
                <Link className="nav-link" to="/">
                  מודעות שאהבתי{" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#dc3545", fontSize: "20px" }}
                  />
                  <Badge
                    className="count-likes"
                    pill
                    variant="danger"
                    style={{ fontSize: "11px" }}
                  >
                    3
                  </Badge>
                </Link>
                <Link className="nav-link" to="/register">
                  הירשם לאתר
                </Link>

                <Nav.Link
                  onClick={() => {
                    setShowLogIn(true);
                  }}
                >
                  התחבר
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Container>{showLogIng && <LogIn closePopUp={closePopUp} />}</Container>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/:id/car-details">
            <CarDetails />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/add-new-car">
            <AddCarParse1 />
          </Route>
          <Route path="/add-new-car2">
            <AddCarParse2 />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
