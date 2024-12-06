import  { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import AddUser from "./AddUser";
import { BASE_URL } from "../App";
import EditUser from "./EditUser";

const AllUsers = () => {
  const [usersList, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    fetch(`${BASE_URL}users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };
  const deleteUser = async (id) => {
    await fetch(`${BASE_URL}users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };
  return (
    <div
      style={{
        background: "linear-gradient(to right, #67B26F, #4ca2cd)",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Row className="justify-content-md-center">
        <Col md={12} style={{ padding: "0 80px" }}>
          <h3 className="text-center mb-4 text-white">User List</h3>
          <AddUser getUsers={getUsers} />
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Place</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.place}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EditUser user={user} getUsers={getUsers} />

                      <Button
                        variant="danger"
                        //   style={{ marginTop: "-65px" }}
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default AllUsers;
