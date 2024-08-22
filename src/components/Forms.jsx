import { useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Forms() {
  const [data, setData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    image: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [card, setCard] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const { email, username, firstName, lastName, image, password } = data;

  const handleData = (e) => {
    // console.log(e.target.id);
    setData({ ...data, [e.target.id]: e.target.value });
  };

  // console.log(data.username.trim().length >= 3);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    const urlRegex = /^(https?:\/\/)?([^\s@]+)\/([^\s@]*)$/;

    if (
      emailRegex.test(email) &&
      data.username.trim().length >= 3 &&
      data.firstName.trim().length >= 3 &&
      data.lastName.trim().length >= 3 &&
      urlRegex.test(image) &&
      data.password.length >= 8
    ) {
      setCard([...card, data]);
      setData({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        image: "",
        password: "",
      });
    }
  };

  const handleMouseOver = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    const urlRegex = /^(https?:\/\/)?([^\s@]+)\/([^\s@]*)$/;
    if (
      !emailRegex.test(email) ||
      data.username.trim().length < 3 ||
      data.firstName.trim().length < 3 ||
      data.lastName.trim().length < 3 ||
      !urlRegex.test(image) ||
      data.password.length < 8
    ) {
      setDisabled(true);
    }
  };

  const handleMouseLeave = () => {
    setDisabled(false);
  };

  return (
    <Container className="my-5">
      <h1>Form Validation</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleData}
            id="email"
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={handleData}
            id="username"
            name="username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={handleData}
            id="firstName"
            name="firstName"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={handleData}
            id="lastName"
            name="lastName"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter Image Url"
            value={image}
            onChange={handleData}
            id="image"
            name="image"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <div className=" d-flex">
            <Form.Control
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handleData}
              id="password"
              name="password"
            />
            <Button variant="dark" onClick={() => setShow(!show)}>
              Show/Hidden
            </Button>
          </div>
        </Form.Group>
        <div className="text-center" onMouseLeave={handleMouseLeave}>
          <Button
            variant="primary"
            type="submit"
            onMouseOver={handleMouseOver}
            disabled={disabled}
          >
            Submit
          </Button>
        </div>
      </Form>
      <div className="d-flex flex-wrap justify-content-center mt-3">
        {card.map((card, index) => (
          <Card
            key={index}
            style={{ width: "18rem" }}
            className="m-2 text-center"
          >
            <Card.Img variant="top" className="p-3" src={card.image} />
            <Card.Body>
              <Card.Title>{card.username}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{card.firstName}</ListGroup.Item>
              <ListGroup.Item>{card.lastName}</ListGroup.Item>
              <ListGroup.Item>{card.email}</ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default Forms;
