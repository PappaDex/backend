import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../constants";

export default function NavBarEdunova() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg" className="bg-dark">
        <Container>
          <Navbar.Brand
            className="ruka"
            onClick={() => navigate(RouteNames.HOME)}
          >
            <img src="/logo.png" alt="Logo" className="logo-navbar" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: "#00ff00" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="d-flex w-100 justify-content-between"
              style={{ paddingBottom: "20px" }}
            >
              <NavDropdown
                title={<span className="dropdown-title">Zbirka</span>}
              >
                <NavDropdown.Item onClick={() => navigate(RouteNames.PREGLED)}>
                  Pregled igara
                              </NavDropdown.Item>
                              <NavDropdown.Item onClick={() => navigate(RouteNames.ZANROVI)}>
                                  Zanrovi
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(RouteNames.DODAJ)}>
                  Dodavanje igara
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={<span className="dropdown-title">Dodatno</span>}
              >
                <NavDropdown.Item
                  onClick={() => navigate(RouteNames.O_STRANICI)}
                >
                  O Stranici
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => window.open("https://swagger.io")}
                  target="_blank"
                >
                  Swagger
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
