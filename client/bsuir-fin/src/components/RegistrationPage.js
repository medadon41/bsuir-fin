import React, { useState } from 'react';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import axios from "axios";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        middleName: '',
        email: '',
        password: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/auth/signup', formData)
          .then(response => {
              if (response.status === 200) {
                  navigate('/login');
              }
          })
          .catch(error => {
            console.error('Error registering user:', error);
          });
    };

    return (
        <Container>
            <Row className="justify-content-center align-items-center vh-100">
                <Col xs={12} md={6}>
                    <Logo />
                    <h2>Регистрация</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="surname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите фамилию"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="middleName">
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите отчество"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Зарегистрироваться
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationPage;