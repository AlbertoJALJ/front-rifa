import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

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
      console.log(loggedIn);
      if (loggedIn) {
        localStorage.setItem("token", loggedIn.data.token);
        history("/admin");
      }
    } catch (error) {
      console.log(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Iniciar sesión
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
