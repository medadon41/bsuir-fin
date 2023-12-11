// LoginPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Logo from './Logo';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import TwoFaAuth from "./TwoFaAuth";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const [showTokenModal, setShowTokenModal] = useState(false);

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
            if(error.response.data.tokenRequired) {
                setShowTokenModal(true)
            }
          });
    };

    const handleTokenSubmit = (token) => {
        const data = {...formData, token: token}

        axios.post('/api/auth/login', data)
            .then(response => {
                if (response.status === 200 && response.headers.authorization) {
                    const token = response.headers.authorization.replace('Bearer ', '');
                    sessionStorage.setItem('token', token);

                    navigate('/profile');
                }

            })
            .catch(error => {
                if(error.response.data.tokenRequired) {
                    setShowTokenModal(true)
                }
            });
        setShowTokenModal(false);
    };

    const handleTokenModalClose = () => {
        setShowTokenModal(false);
    };

    return (
        <Container>
            <Row className="justify-content-center align-items-center vh-100">
                <Col xs={12} md={6}>
                    <Logo />
                    <h2>Вход</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email" >
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
                        <Link to={"/register"}>
                            <p>
                                У меня нет аккаунта
                            </p>
                        </Link>
                        <Button variant="primary" type="submit">
                            Войти
                        </Button>
                    </Form>
                </Col>
            </Row>
            <TwoFaAuth
                show={showTokenModal}
                onHide={handleTokenModalClose}
                onTokenSubmit={handleTokenSubmit}
            />
        </Container>
    );
};

export default LoginPage;