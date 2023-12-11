import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function SignatureModal ({ show, onHide, onSign }) {
    const [signatureData, setSignatureData] = useState({
        signature: '',
        signatureType: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignatureData({ ...signatureData, [name]: value });
    };

    const handleSign = () => {
        // Логика для обработки подписи
        onSign(signatureData.signature, signatureData.signatureType);
        // Очистка формы
        setSignatureData({
            signature: '',
            signatureType: 0,
        });
        onHide();
    };

    const handleOtherSignatureMethod = () => {
        setSignatureData({signature: signatureData.signature, signatureType: +(!Boolean(signatureData.signatureType))});
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Подтверждение доступа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="signature">
                        <Form.Label>{signatureData.signatureType === 0 ? "Код 2FA-приложения" : "Токен"}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Код"
                            name="signature"
                            value={signatureData.signature}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <p>
                        У меня другой способ подписи.{' '}
                        <a href="#" onClick={handleOtherSignatureMethod}>
                            Выбрать другой способ.
                        </a>
                    </p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleSign}>
                    Подписать
                </Button>
            </Modal.Footer>
        </Modal>
    );
};