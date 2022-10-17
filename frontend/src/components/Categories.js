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
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [editOrNo, setEditOrNo] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const showModalCategories = () => {
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
  const deleteCategory = (id) => {
    Axios.delete(`http://localhost:8000/categories/${id}`);
  };

  const addCategory = () => {
    if (editOrNo) {
      Axios.put(`http://localhost:8000/categories/${idEdit}`, {
        name: name,
      }).then((response) => alert(response));
    } else {
      Axios.post("http://localhost:8000/categories", {
        name: name,
      }).then((response) => alert(response));
    }
    closeModal();
  };

  const getCategories = () => {
    Axios.get("http://localhost:8000/categories").then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(getCategories, []);

  const getRows = () => {
    const rows = categories.map((category) => {
      return (
        <tr>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <Button
              onClick={() => {
                showModalCategories();
                setIdEdit(category.id);
                setTitleModal("Edit category");
                setEditOrNo(true);
                setName(category.name);
              }}
              variant="secondary"
              className="mx-1"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                showModalDelete();
                setIdDelete(category.id);
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

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Button
              onClick={() => {
                showModalCategories();
                setEditOrNo(false);
                setTitleModal("New category");
                setName("");
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
                  <th>Name</th>
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                defaultValue={name}
              />
            </Form.Group>
          </Form>

          <Modal.Footer>
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
            <Button variant="primary" onClick={addCategory}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modalDelete} onHide={closeModalDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this category?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalDelete}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={(deleteCategory(idDelete), closeModalDelete)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
