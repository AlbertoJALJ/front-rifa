import { useEffect, useState } from "react";
import axios from "axios";
import { Button, ListGroup, Table } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const history = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      history("/login");
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://backend-rifa.onrender.com//users/"
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

  if (isMobile) {
    return (
      <div>
        <Button onClick={() => window.print()} className="mb-3">
          Guardar
        </Button>
        <ListGroup>
          {users.map((user, index) => (
            <ListGroup.Item key={user._id}>
              <strong># :</strong> {index}
              <br />
              <strong>Nombre:</strong> {user.nombre_completo}
              <br />
              <strong>Teléfono:</strong> {user.telefono}
              <br />
              <strong>Correo:</strong> {user.correo}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={() => window.print()} className="mb-3">
        Guardar
      </Button>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Boleto</th>
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
