import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function TxConfirmModal ({ show, onHide, onTokenSubmit }) {
    const [signatureType, setSignatureType] = useState(1);
    const [token, setToken] = useState('');

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const handleTokenSubmit = () => {

        onTokenSubmit(token, signatureType);

        setToken('');
        onHide();
    };

    const handleOtherSignatureMethod = () => {
        setSignatureType(+(!Boolean(signatureType)));
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Ввод токена</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="token">
                        <Form.Label>{signatureType ? "Код из 2-FA приложения" : "Токен"}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите токен"
                            value={token}
                            onChange={handleTokenChange}
                        />
                    </Form.Group>
                </Form>
                <p>
                    У меня другой способ подписи.{' '}
                    <a href="#" onClick={handleOtherSignatureMethod}>
                        Выбрать другой способ.
                    </a>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleTokenSubmit}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
