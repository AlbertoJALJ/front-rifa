import { useEffect, useState } from "react";
import axios from "axios";
import { Button, ListGroup, Table } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const history = useNavigate();
  const idioma = localStorage.getItem("language");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      history("/login");
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://backend-rifa.onrender.com/users/"
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();

    const interval = setInterval(fetchUsers, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClearDatabase = async () => {
    setLoading(true);
    const cleared = await axios.get(
      "https://backend-rifa.onrender.com/users/clear"
    );
    console.log(cleared);
    if (cleared.data) {
      setLoading(false);
      alert("Borrado correctamente");
      setUsers([]);
    }
  };

  if (isMobile) {
    return (
      <div>
        <img
          src="/logo.webp"
          width="200"
          height="200"
          className="d-inline-block align-top"
          alt="Logo"
        />
        <h1>
          {idioma === "english" ? "Assistants list" : "Lista de participantes"}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button onClick={() => window.print()} className="mb-3 mr-5">
            {idioma === "english" ? "Save" : "Guardar"}
          </Button>
          <Button
            variant="danger"
            onClick={() => onClearDatabase()}
            className="mb-3"
          >
            {Loading
              ? idioma == "english"
                ? "cleaning"
                : "Limpiado"
              : idioma === "english"
              ? "clear participants"
              : "Limpiar participantes"}
          </Button>
        </div>
        <ListGroup>
          {users.map((user, index) => (
            <ListGroup.Item key={user._id}>
              <strong># :</strong> {index}
              <br />
              <strong>{idioma == "english" ? "Name" : "Nombre"}:</strong>{" "}
              {user.nombre_completo}
              <br />
              <strong>
                {idioma == "english" ? "Phone" : "Teléfono"}:
              </strong>{" "}
              {user.telefono}
              <br />
              <strong>{idioma == "english" ? "email" : "Correo"}:</strong>{" "}
              {user.correo}
              <br />
              <strong>{idioma == "english" ? "Ticket" : "Boleto"}:</strong>{" "}
              {user.numero_boleto}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
  return (
    <div>
      <img
        src="/logo.webp"
        width="200"
        height="200"
        className="d-inline-block align-top"
        alt="Logo"
      />
      <h1>
        {idioma === "english" ? "Assistants list" : "Lista de participantes"}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button onClick={() => window.print()} className="mb-3 mr-5">
          {idioma === "english" ? "Save" : "Guardar"}
        </Button>
        <Button
          variant="danger"
          onClick={() => onClearDatabase()}
          className="mb-3"
        >
          {Loading
            ? idioma == "english"
              ? "cleaning"
              : "Limpiado"
            : idioma === "english"
            ? "clear participants"
            : "Limpiar participantes"}
        </Button>
      </div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>{idioma == "english" ? "Name" : "Nombre"}</th>
            <th>{idioma == "english" ? "Phone" : "Teléfono"}</th>
            <th>{idioma == "english" ? "Phone" : "Teléfono"}:</th>
            <th>{idioma == "english" ? "Ticket" : "Boleto"}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index}</td>
              <td>{user.nombre_completo}</td>
              <td>{user.telefono}</td>
              <td>{user.correo}</td>
              <td>{user.numero_boleto}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
