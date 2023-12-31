import {Button, Form, Modal} from "react-bootstrap";
import {orangeStyle} from "../style/styles";
import {useState} from "react";
import SignatureModal from "./SignModal";
import axios from "axios";
import TxConfirmModal from "./TxConfirmModal";

export default function NewTxForm({ show, handleClose, handleAddTransaction, newTransaction, handleInputChange }) {
    const [showTokenModal, setShowTokenModal] = useState(false);

    const handleTokenModalClose = () => {
        setShowTokenModal(false);
    };

    const handleTokenModalOpen = () => {
        setShowTokenModal(true);
    };

    const handleTxSubmit = (token, type) => {
        setShowTokenModal(true);
        handleAddTransaction(token, type)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новую транзакцию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="receiverAccount">
                        <Form.Label>Получатель</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите получателя"
                            name="receiverAccount"
                            value={newTransaction.receiverAccount}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="amount">
                        <Form.Label>Сумма</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите сумму"
                            name="amount"
                            value={newTransaction.amount}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button style={orangeStyle} variant="primary" onClick={handleTokenModalOpen}>
                    Отправить
                </Button>
                <TxConfirmModal
                    show={showTokenModal}
                    onHide={handleTokenModalClose}
                    onTokenSubmit={handleTxSubmit}
                />
            </Modal.Footer>
        </Modal>
    );
}