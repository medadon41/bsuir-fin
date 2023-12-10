import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import {orangeStyle} from "../style/styles";

export default function CreditsSection({ loans }) {
    return (
        <Card className="mb-3">
            <Card.Header style={orangeStyle} className="d-flex justify-content-between align-items-center">
                Информация о кредитах
                <Link to="/new-credit">
                    <Button variant="light">Оформить</Button>
                </Link>
            </Card.Header>
            <Card.Body>
                <Row>
                    {loans.map(l =>
                        <Col>
                            <Card>
                                <Card.Header>Кредит №{loans.indexOf(l) + 1}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        Сумма кредита: {l.amount} BYN
                                    </Card.Text>
                                    <Card.Text>
                                        Выплачено: {l.amountRepaid}
                                    </Card.Text>
                                    <Card.Text>
                                        До: {l.dateExpire}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
}