import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Home() {
  const [operations, setOperations] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const getIncome = () => {
    const url = "http://localhost:8000/operations/income";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setIncome(data));
  };
  const getExpenses = () => {
    const url = "http://localhost:8000/operations/expenses";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setExpenses(data));
  };

  const getOperations = () => {
    const url = "http://localhost:8000/operations";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setOperations(data));
  };

  useEffect(getOperations, []);
  useEffect(getIncome, []);
  useEffect(getExpenses, []);

  const getTotal = () => {
    let total = [];
    let totalExpenses = 0;
    let totalIncome = 0;

    for (let i = 0; i < expenses.length; i++) {
      totalExpenses += expenses[i].amount;
    }
    for (let i = 0; i < income.length; i++) {
      totalIncome += income[i].amount;
    }

    total.push(totalIncome - totalExpenses);

    return total;
  };

  const getRows = () => {
    const rows = operations.map((operation) => {
      return (
        <tr>
          <td>{operation.id}</td>
          <td>{operation.concept}</td>
          <td>${operation.amount}</td>
          <td>{operation.date}</td>
          <td>{operation.id_category}</td>
          <td>{operation.type}</td>
        </tr>
      );
    });

    let rowDef = [];
    let counter = 0;

    while (counter < 11) {
      rowDef.push(rows[rows.length - counter]);
      counter++;
    }

    return rowDef;
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-center my-5">CURRENT BALANCE</h2>
            <h2 className="text-center my-5">{getTotal()}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="text-center my-5">LAST TEN OPERATIONS</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Concept</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>{getRows()}</tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
