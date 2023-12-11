// TokenModal.jsx
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import moment from 'moment';
import {orangeStyle} from "../style/styles";

export default function TokenModal({ show, onHide, onAddToken }) {
    const [tokenData, setTokenData] = useState({
        localName: '',
        usagesAmount: '',
        activeUntil: '',
        maxAmount: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTokenData({ ...tokenData, [name]: value });
    };

    const handleAddToken = () => {
        const formattedDate = moment(tokenData.activeUntil).format('YYYY-MM-DD');
        onAddToken({ ...tokenData, activeUntil: formattedDate });
        setTokenData({
            localName: '',
            usagesAmount: '',
            activeUntil: '',
            maxAmount: '',
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить токен</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="localName">
                        <Form.Label>Название токена</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название токена"
                            name="localName"
                            value={tokenData.localName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="usagesAmount">
                        <Form.Label>Количество использований</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите количество использований"
                            name="usagesAmount"
                            value={tokenData.usagesAmount}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="activeUntil">
                        <Form.Label>Активен до</Form.Label>
                        <Form.Control
                            type="date"
                            name="activeUntil"
                            value={tokenData.activeUntil}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="maxAmount">
                        <Form.Label>Максимальная сумма транзакции</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите максимальную сумму транзакции"
                            name="maxAmount"
                            value={tokenData.maxAmount}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button style={orangeStyle} variant="primary" onClick={handleAddToken}>
                    Добавить токен
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
