import {Card, Col, Row} from "react-bootstrap";
import React from "react";
import {orangeStyle} from "../style/styles";

export default function UserCard({ user }) {
    return (
        <Card className="my-3">
            <Card.Header style={orangeStyle}>Профиль пользователя</Card.Header>
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
                {/* Дополнительная информация о пользователе может быть добавлена здесь */}
            </Card.Body>
        </Card>
    )
}