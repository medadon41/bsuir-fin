// TokenReceivedModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TokenReceivedModal = ({ show, onHide, token }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Токен успешно создан</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Внимание: Это единственный раз, когда вы видите этот токен. Он не подлежит восстановлению в случае утраты.</p>
                <p>Ваш токен: <b>{token}</b></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TokenReceivedModal;