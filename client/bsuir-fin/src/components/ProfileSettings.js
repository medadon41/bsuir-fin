import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Form, Button, Modal, CardBody} from 'react-bootstrap';
import Logo from './Logo';
import TokenModal from './TokenModal';
import {orangeStyle} from "../style/styles";
import Cookies from "js-cookie";
import axios from "axios";
import TokenReceivedModal from "./TokenAlert";
import {Link} from "react-router-dom";
import '../style/profilesettings.css';
export default function ProfileSettings() {
    const [userData, setUserData] = useState({})
    const [loginData, setLoginData] = useState({
        currentPassword: '',
        newLogin: '',
        newPassword: '',
    });

    const [twoFactorAuth, setTwoFactorAuth] = useState({
        enable2FA: userData.is2faEnabled,
        verificationCode: '',
    });

    const [confirmationTokens, setConfirmationTokens] = useState([]);
    const [showTokenModal, setShowTokenModal] = useState(false);

    const [tokenReceivedModal, setTokenReceivedModal] = useState(false);
    const [lastReceivedToken, setLastReceivedToken] = useState('');
    const [qrData, setQrData] = useState({qrCode: '', key: ''})

    const handleUpdateLoginInfo = (e) => {
        e.preventDefault();
        // Логика для обновления логина/пароля на сервере
        console.log('Updating login information:', loginData);
    };
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleDisableToken = (e) => {
        const { value } = e.target

        const refreshToken = Cookies.get('token');
        const accessToken = sessionStorage.getItem('token')

        const headers = {
            Authorization: accessToken
        }
        const params = {
            refreshToken,
        };

        const apiURL = `/api/tokens/${value}/deactivate`

        axios.get(apiURL, {headers, params})
            .then(response => {
                const createdToken = response.data;

                setLastReceivedToken(createdToken);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }

    const handleTwoFactorAuthChange = (e) => {
        const { name, value } = e.target;
        setTwoFactorAuth({ ...twoFactorAuth, [name]: value });
    };

    const handleToggle2FA = () => {
        const refreshToken = Cookies.get('token');
        const accessToken = sessionStorage.getItem('token')

        const headers = {
            Authorization: accessToken
        }
        const params = {
            refreshToken,
        };

        setTwoFactorAuth({ enable2FA: !twoFactorAuth.enable2FA, verificationCode: '' });

        const apiURL = "/api/auth/generate"
        axios.get(apiURL, {headers, params})
            .then(response => {
                const res = response.data;

                setQrData({qrCode: res.qrLink, key: res.key})
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const handleAddToken = (tokenData) => {
        const refreshToken = Cookies.get('token');
        const accessToken = sessionStorage.getItem('token')

        const headers = {
            Authorization: accessToken
        }
        const params = {
            refreshToken,
        };

        setConfirmationTokens([...confirmationTokens, tokenData]);

        const apiURL = '/api/tokens';
        let res = null

        axios.post(apiURL, tokenData, {headers, params})
            .then(response => {
                //setUserData(response.data);
                //setConfirmationTokens(response.data.tokens)

                const createdToken = res.data.originalToken;
                setConfirmationTokens([...confirmationTokens, response.data.token])

                setLastReceivedToken(createdToken);
                setTokenReceivedModal(true);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const handleAdd2FA = () => {
        const refreshToken = Cookies.get('token');
        const accessToken = sessionStorage.getItem('token')

        const headers = {
            Authorization: accessToken
        }
        const params = {
            refreshToken,
        };

        const apiURL = '/api/auth/activate';
        const authData = {
            key: qrData.key,
            code: twoFactorAuth.verificationCode
        }

        axios.post(apiURL, authData, {headers, params})
            .then(response => {
                setUserData(response.data);

            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }
    const handleShowTokenModal = () => {
        setShowTokenModal(true);
    };

    const handleCloseTokenModal = () => {
        setShowTokenModal(false);
    };

    const handleTokenReceivedModalClose = () => {
        setTokenReceivedModal(false);
    };

    useEffect(() => {
        const apiURL = '/api/users/info';
        const refreshToken = Cookies.get('token');
        const accessToken = sessionStorage.getItem('token')

        const headers = {
            Authorization: accessToken
        }
        const params = {
            refreshToken,
        };

        axios.get(apiURL, {headers, params})
            .then(response => {
                setUserData(response.data);
                console.log(response.data);
                setConfirmationTokens(response.data.tokens)
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <Container>
            <Row className="justify-content-center align-items-center vh-100">
                <Col xs={12} md={6}>
                    <Link to={"../profile"}>
                        <Logo />
                    </Link>
                    <h2>Настройки пользователя</h2>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Данные</Card.Title>
                            <Form onSubmit={handleUpdateLoginInfo}>
                                <Form.Group controlId="currentPassword">
                                    <Form.Label>Текущий пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Введите текущий пароль"
                                        name="currentPassword"
                                        value={loginData.currentPassword}
                                        onChange={handleLoginChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="newLogin">
                                    <Form.Label>Новый логин</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите новый логин"
                                        name="newLogin"
                                        value={loginData.newLogin}
                                        onChange={handleLoginChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="newPassword">
                                    <Form.Label>Новый пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Введите новый пароль"
                                        name="newPassword"
                                        value={loginData.newPassword}
                                        onChange={handleLoginChange}
                                    />
                                </Form.Group>
                                <Button style={orangeStyle} variant="primary" type="submit">
                                    Обновить данные
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Двухфакторная аутентификация</Card.Title>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="enable2FA"
                                    label={twoFactorAuth.enable2FA ? "Включить двухфакторную аутентификацию" : "Включена"}
                                    name="enable2FA"
                                    checked={twoFactorAuth.enable2FA}
                                    onChange={handleToggle2FA}
                                    disabled={userData.is2faEnabled}
                                    custom className="custom-switch"
                                />
                                {twoFactorAuth.enable2FA && (
                                    <Form.Group controlId="verificationCode">
                                        <img src={qrData.qrCode}/>
                                        <Form.Label>Код подтверждения</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Введите код подтверждения"
                                            name="verificationCode"
                                            value={twoFactorAuth.verificationCode}
                                            onChange={handleTwoFactorAuthChange}
                                        />
                                        <Button style={orangeStyle} variant="primary" onClick={handleAdd2FA}>
                                            Проверить
                                        </Button>
                                    </Form.Group>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Создание токенов подтверждения */}
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Токены подтверждения</Card.Title>
                            <Button style={orangeStyle} variant="primary" onClick={handleShowTokenModal}>
                                Добавить токен
                            </Button>
                            <Row>
                                {confirmationTokens.map(t => (
                                    <Col>
                                        <Card key={t.id} className="mt-3">
                                            <Card.Body>
                                                <Card.Title>{t.localName}</Card.Title>
                                                <Card.Text>Количество использований: {t.usagesLeft}</Card.Text>
                                                <Card.Text>Активен до: {t.activeUntil}</Card.Text>
                                                <Card.Text>Максимальная сумма транзакции: {t.maxAmount}</Card.Text>
                                                <Card.Text>Статус: {t.tokenStatus === 1 ? "Активен" : "Не активен"}</Card.Text>
                                            </Card.Body>
                                            {t.tokenStatus === 1 &&
                                                <Button value={t.id} style={orangeStyle} variant="primary" onClick={handleDisableToken}>
                                                    Отключить
                                                </Button>
                                            }
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>

                    <TokenModal show={showTokenModal} onHide={handleCloseTokenModal} onAddToken={handleAddToken} />
                    <TokenReceivedModal show={tokenReceivedModal} onHide={handleTokenReceivedModalClose} token={lastReceivedToken} />
                </Col>
            </Row>
        </Container>
    );
};