import React, {useEffect, useState} from 'react';
import {Container, Card, Table, Col, Row, Button} from 'react-bootstrap';
import CreditsSection from "./CreditsSection";
import {Link} from "react-router-dom";
import UserCard from "./UserCard";
import TransactionsTableShort from "./TransactionsTableShort";
import Logo from "./Logo";
import axios from "axios";
import Cookies from 'js-cookie';

const UserProfile = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const apiURL = '/api/users/info'; // Замените на фактический URL
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
                if (response.data === "") {
                    const refreshUrl = "/api/auth/refresh"
                    axios.post(refreshUrl, {headers, params})
                        .then(r => {
                            const token = response.headers.authorization.replace('Bearer ', '');
                            sessionStorage.setItem('token', token);
                            console.log("Refreshing token")
                        })
                }
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <Container>
            <Logo/>
            <UserCard user={userData}/>
            <TransactionsTableShort transactions={userData.transaction ?? []} userData={userData}/>
            <CreditsSection loans={userData.loans ?? []}/>
        </Container>
    );
};


export default UserProfile;
