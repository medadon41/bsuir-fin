import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function TwoFaAuth ({ show, onHide, onTokenSubmit }) {
    const [token, setToken] = useState('');

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const handleTokenSubmit = () => {
        // Передаем введенный токен обратно в родительский компонент
        onTokenSubmit(token);
        // Очищаем поле ввода токена
        setToken('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Ввод токена</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="token">
                        <Form.Label>Код из 2-FA приложения</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите токен"
                            value={token}
                            onChange={handleTokenChange}
                        />
                    </Form.Group>
                </Form>
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
