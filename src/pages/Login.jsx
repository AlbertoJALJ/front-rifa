import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [English, setEnglish] = useState(false);
  const history = useNavigate();
  const idioma = localStorage.getItem("language");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loggedIn = await axios.post(
        "https://backend-rifa.onrender.com/users/login",
        {
          username,
          password,
        }
      );
      if (loggedIn) {
        localStorage.setItem("token", loggedIn.data.token);
        history("/admin");
      }
    } catch (error) {
      console.log(error);
      alert(
        idioma == "english" ? "Wrong credentials" : "Credenciales incorrectas"
      );
    }
  };
  
  const onChangeLanguage = () => {
    setEnglish(!English);
    if (!English) {
      localStorage.setItem("language", "english");
    } else {
      localStorage.removeItem("language");
    }
  };

  return (
    <Container>
      <img
        src="/logo.webp"
        width="200"
        height="200"
        className="d-inline-block align-top"
        alt="Logo"
      />
      <Form onSubmit={handleSubmit}>
        <h1>{idioma == "english" ? "signin" : "Incio de sesión"}</h1>
        <Form.Group controlId="formUsername">
          <Form.Label>
            {idioma == "english" ? "Username" : "usuario"}
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>
            {idioma == "english" ? "Password" : "Contraseña"}
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Group className="mb-3 mt-3 " controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="English"
              value={English}
              onChange={onChangeLanguage}
              size={"large"}
            />
          </Form.Group>
        </div>

        <Button className="mt-4" variant="primary" type="submit">
          {idioma == "english" ? "GO!" : "Iniciar sesión"}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
