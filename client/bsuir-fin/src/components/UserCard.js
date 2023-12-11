import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";
import {orangeStyle} from "../style/styles";
import {Link} from "react-router-dom";

export default function UserCard({ user }) {
    return (
        <Card className="my-3">
            <Card.Header style={orangeStyle} className="d-flex justify-content-between align-items-center">
                Профиль пользователя
                <Link to="/settings">
                    <Button variant="light">Настройки</Button>
                </Link>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{user.surname} {user.name} {user.middleName}</Card.Title>
                        <Card.Text>
                            Номер банковского счета: {user.publicId}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text className="text-end">
                            Баланс: {user.mainBalance} BYN
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}