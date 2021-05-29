import React, { useState } from 'react';
import { Columns, Notification, Button, Form, Icon } from 'react-bulma-components';

function setEmailToStorage(email) {
    localStorage.setItem('userEmail', email);
    console.log(email);
}

function setPasswordToStorage(password) {
    localStorage.setItem('userPassword', password);
    console.log(password);
}


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitForm = async () => {
        setEmailToStorage(email);
        setPasswordToStorage(password);
    }
    return (
        <Columns>
            <Columns.Column>

                <form>
                    <Form.Field>
                        <Form.Label>Email</Form.Label>
                        <Form.Control>
                            <Form.Input
                                color="danger"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Icon align="left" size="small">
                                <i className="fas fa-envelope" />
                            </Icon>
                            <Icon align="right" size="small">
                                <i className="fas fa-exclamation-triangle" />
                            </Icon>
                        </Form.Control>
                        <Form.Help color="danger">This email is invalid</Form.Help>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input
                                color="danger"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Control>
                        <Button onSubmit={submitForm} color="link">Submit</Button>

                    </Form.Control>

                </form>

            </Columns.Column>
            <Columns.Column>
                <Notification color="primary">Second Column</Notification>
            </Columns.Column>
            <Columns.Column>
                <Notification color="primary">Third Column</Notification>
            </Columns.Column>
            <Columns.Column>
                <Notification color="primary">Fourth Column</Notification>
            </Columns.Column>
        </Columns>
    );
}

export default Login;