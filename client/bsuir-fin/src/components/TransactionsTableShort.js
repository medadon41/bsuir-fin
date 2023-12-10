import {Button, Card, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {orangeStyle} from "../style/styles";
import NewTxForm from "./NewTxForm";
import axios from "axios";
import Cookies from "js-cookie";

export default function TransactionsTableShort({ transactions }) {
    const [showModal, setShowModal] = useState(false);
    const [newTransaction, setNewTransaction] = useState({ receiverAccount: '', amount: 0 });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const handleAddTransaction = () => {
        const refreshToken = Cookies.get('token');
        const accessToken = sessionStorage.getItem('token')

        const headers = {
            Authorization: accessToken
        }
        const params = {
            refreshToken,
        };

        axios.post('/api/transactions/', {...newTransaction, type: 0}, {
            headers: headers,
            params: refreshToken
        })
          .then(response => {
            // Обработка успешного ответа
            console.log('Transaction added successfully');
            // Закрыть модальное окно
            handleCloseModal();
            // Обновить список транзакций (если необходимо)
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