import {Button, Card, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {orangeStyle} from "../style/styles";
import NewTxForm from "./NewTxForm";
import axios from "axios";
import Cookies from "js-cookie";

export default function TransactionsTableShort({ transactions, userData }) {
    const [showModal, setShowModal] = useState(false);
    const [newTransaction, setNewTransaction] = useState({ receiverAccount: '', amount: 0 });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const handleAddTransaction = (token, type) => {
        const refreshToken = Cookies.get('token');
        const accessToken = sessionStorage.getItem('token')

        const headers = {
            Authorization: accessToken
        }
        const params = {
            refreshToken,
        };

        console.log({...newTransaction, confirmation: +type, token: token})

        axios.post('/api/transactions/', {...newTransaction, confirmation: +type, token: token}, {
            headers: headers,
            params: params
        })
          .then(response => {
            console.log('Transaction added successfully');
            handleCloseModal();
            // updateTransactionList();
          })
          .catch(error => {
            console.error('Error adding transaction:', error);
          });
    };

    return (
        <Card className="my-3">
            <Card.Header style={orangeStyle} className="d-flex justify-content-between align-items-center">
                Последние транзакции
                <Button variant="light" onClick={handleShowModal}>Отправить</Button>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Тип</th>
                        <th>Сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map(tx => {
                        return (
                        <tr>
                            <td>
                                {tx.type === 0 ? "Перевод" : "Платеж за кредит"}
                            </td>
                            <td>
                                {tx.amount}
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Card.Body>
            <NewTxForm
                show={showModal}
                handleClose={handleCloseModal}
                handleAddTransaction={handleAddTransaction}
                newTransaction={newTransaction}
                handleInputChange={handleInputChange}
            />
        </Card>
    );
}