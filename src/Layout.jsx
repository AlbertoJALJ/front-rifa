/* eslint-disable react/prop-types */
import { Container, Nav, Navbar } from "react-bootstrap";

const Layout = (props) => {
  return (
    <div>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/logo.webp"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto "></Nav>
            <Nav>
              <Nav.Link href="/admin">Ingresar</Nav.Link>
            </Nav>
            {localStorage.getItem("token") && (
              <Nav>
                <Nav.Link
                  href="/"
                  onClick={() => localStorage.removeItem("token")}
                >
                  Salir
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
