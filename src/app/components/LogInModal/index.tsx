import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NutanixApiClient from 'nutanixApi/nutanixApiClient';

interface ILogInModalState {
    username: string | null;
    password: string | null;
    nutanixUrl: string | null;

    showModal: boolean;

    tempUsername: string;
    tempPassword: string;
    tempNutanixUrl: string;
}

export class LogInModal extends React.Component<{}, ILogInModalState> {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('Username'),
            password: localStorage.getItem('Password'),
            nutanixUrl: localStorage.getItem('NutanixApiUrl'),

            showModal: false,

            tempUsername: '',
            tempPassword: '',
            tempNutanixUrl: '',
        };
    }

    handleClose = () => this.setState({ showModal: false });

    handleShow = () =>
        this.setState({
            showModal: true,
            tempUsername: '',
            tempPassword: '',
            tempNutanixUrl: '',
        });

    loggedIn = () => this.state.username && this.state.password;

    logOut() {
        localStorage.removeItem('Username');
        localStorage.removeItem('Password');
        localStorage.removeItem('NutanixApiUrl');
        this.setState({ username: null, password: null, nutanixUrl: null });
        NutanixApiClient.setCredentials('', '', '');
        window.location.reload();
    }

    logIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.state.tempUsername.length === 0) return;
        if (this.state.tempPassword.length === 0) return;
        if (this.state.tempNutanixUrl.length === 0) return;

        localStorage.setItem('Username', this.state.tempUsername);
        localStorage.setItem('Password', this.state.tempPassword);
        localStorage.setItem('NutanixApiUrl', this.state.tempNutanixUrl);
        NutanixApiClient.setCredentials(
            this.state.tempUsername,
            this.state.tempPassword,
            this.state.tempNutanixUrl,
        );
        window.location.reload();
        this.setState({
            username: this.state.tempUsername,
            password: this.state.tempPassword,
            nutanixUrl: this.state.tempNutanixUrl,
            tempUsername: '',
            tempPassword: '',
            tempNutanixUrl: '',
            showModal: false,
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <Button
                    variant={this.loggedIn() ? 'danger' : 'primary'}
                    onClick={() => {
                        this.loggedIn() ? this.logOut() : this.handleShow();
                    }}
                >
                    {this.loggedIn() ? 'Logout' : 'Login'}
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={event => this.logIn(event)}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    required={true}
                                    autoFocus
                                    onChange={event =>
                                        this.setState({
                                            tempUsername: event.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required={true}
                                    onChange={event =>
                                        this.setState({
                                            tempPassword: event.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="nutanixApiUrl"
                            >
                                <Form.Label>Nutanix API URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    required={true}
                                    onChange={event =>
                                        this.setState({
                                            tempNutanixUrl: event.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Button
                                variant="secondary"
                                onClick={this.handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                className="float-end"
                            >
                                Login
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
