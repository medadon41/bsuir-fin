// LoginPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Logo from './Logo';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/auth/login', formData)
          .then(response => {

              if (response.status === 200 && response.headers.authorization) {
                  const token = response.headers.authorization.replace('Bearer ', '');
                  sessionStorage.setItem('token', token);

                  navigate('/profile');
              }

          })
          .catch(error => {
            console.error('Error logging in:', error);
          });
    };

    return (
        <Container>
            <Row className="justify-content-center align-items-center vh-100">
                <Col xs={12} md={6}>
                    <Logo />
                    <h2>Вход</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите email"
                                name="login"
                                value={formData.login}
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
                            Войти
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;