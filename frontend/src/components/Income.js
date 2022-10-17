import React, { useEffect, useState } from "react";
import Axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Income() {
  const [categories, setCategories] = useState([]);
  const [income, setIncome] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [id_category, setCategory] = useState(0);
  const [titleModal, setTitleModal] = useState("");
  const [editOrNo, setEditOrNo] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const showModalIncome = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const showModalDelete = () => {
    setModalDelete(true);
  };
  const closeModalDelete = () => {
    setModalDelete(false);
  };

  const showTitleModal = () => {
    return titleModal;
  };
  const deleteEntry = (id) => {
    Axios.delete(`http://localhost:8000/operations/${id}`);
  };

  const addEntry = () => {
    if (editOrNo) {
      Axios.put(`http://localhost:8000/operations/${idEdit}`, {
        concept: concept,
        amount: amount,
        date: date,
        id_category: id_category,
      }).then((response) => alert(response));
    } else {
      Axios.post("http://localhost:8000/operations/income", {
        id_user: 2,
        concept: concept,
        amount: amount,
        date: date,
        id_category: id_category,
      });
    }
    closeModal();
  };

  const getCategories = () => {
    Axios.get("http://localhost:8000/categories").then((response) => {
      setCategories(response.data);
    });
  };

  const getIncome = () => {
    Axios.get("http://localhost:8000/operations/income").then((response) => {
      setIncome(response.data);
    });
  };

  useEffect(getIncome, []);
  useEffect(getCategories, []);

  const getRows = () => {
    const rows = income.map((entry) => {
      return (
        <tr>
          <td>{entry.id}</td>
          <td>{entry.concept}</td>
          <td>${entry.amount}</td>
          <td>{entry.date}</td>
          <td>{entry.id_category}</td>
          <td>
            <Button
              onClick={() => {
                showModalIncome();
                setIdEdit(entry.id);
                setTitleModal("Edit entry");
                setEditOrNo(true);
                setConcept(entry.concept);
                setAmount(entry.amount);
                setDate(entry.date);
              }}
              variant="secondary"
              className="mx-1"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                showModalDelete();
                setIdDelete(entry.id);
              }}
              variant="danger"
              className="mx-1"
            >
              Remove
            </Button>
          </td>
        </tr>
      );
    });
    return rows;
  };

  const showCategories = () => {
    const options = categories.map((category) => {
      return (
        <option>
          {category.id} - {category.name}
        </option>
      );
    });
    return options;
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Button
              onClick={() => {
                showModalIncome();
                setEditOrNo(false);
                setTitleModal("New entry");
                setConcept("");
                setAmount(0);
                setDate("");
              }}
              variant="primary"
              className="my-3 mx-1"
            >
              New
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Concept</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>{getRows()}</tbody>
            </table>
          </Col>
        </Row>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{showTitleModal()}</Modal.Title>
          </Modal.Header>

          <Form className="mx-3 my-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Concept</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter concept"
                onChange={(e) => {
                  setConcept(e.target.value);
                }}
                defaultValue={concept}
              />
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                defaultValue={amount}
              />
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                defaultValue={date}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {" "}
                {showCategories()}
              </Form.Control>
            </Form.Group>
          </Form>

          <Modal.Footer>
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
            <Button variant="primary" onClick={addEntry}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modalDelete} onHide={closeModalDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this operation?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalDelete}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={(deleteEntry(idDelete), closeModalDelete)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
