import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const CreateUser = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [showTicket, setShowTicket] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (localStorage.getItem("registrado")) {
      alert("Ya te registraste");
    }

    try {
      const response = await axios.post("http://localhost:3000/users/", {
        nombre_completo: fullName,
        telefono: phone,
        correo: email,
      });

      const { numero } = response.data;

      setTicketNumber(numero);
      setShowTicket(true);
      localStorage.setItem("registrado", "true");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintTicket = () => {
    // Lógica para imprimir el boleto usando la API nativa del navegador
    window.print();
  };

  return (
    <div>
      {!showTicket ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFullName">
            <Form.Label>Nombre completo:</Form.Label>
            <Form.Control
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Enviar
          </Button>
        </Form>
      ) : (
        <div>
          <p>Tu número de boleto asignado es: {ticketNumber}</p>
          <Button variant="primary" onClick={handlePrintTicket}>
            Imprimir Boleto
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateUser;
