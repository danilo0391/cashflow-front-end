import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlusCircle,
	faSave,
	faUndo,
	faList,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import authHeader from "../../services/auth-header";

import axios from "axios";

const API_URL = "https://cashflow-back-end.herokuapp.com/api/users/";

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
		this.userChange = this.userChange.bind(this);
		this.addUser = this.addUser.bind(this);
	}

	initialState = {
		id: "",
		username: "",
		email: "",
		password: "",
	};

	componentDidMount() {
		const userId = +this.props.match.params.id;
		if (userId) {
			this.findUserById(userId);
		}
	}

	//Function to find by id
	findUserById = (userId) => {
		axios
			.get(API_URL + userId, {
				headers: { Authorization: authHeader().Authorization },
			})
			.then((response) => {
				if (response.data != null) {
					this.setState({
						id: response.data.id,
						username: response.data.username,
						email: response.data.email,
						password: response.data.password,
					});
				}
			})
			.catch((error) => {
				console.error("Error - " + error);
			});
	};

	//Function to reset the form
	resetUser = () => {
		this.setState(() => this.initialState);
	};

	//Function do add user
	addUser = (event) => {
		event.preventDefault();

		const user = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		};

		axios
			.post(API_URL, user, {
				headers: { Authorization: authHeader().Authorization },
			})
			.then((response) => {
				if (response.data != null) {
					this.setState({ show: true, method: "post" });
					setTimeout(() => this.setState({ show: false }), 3000);
				} else {
					this.setState({ show: false });
				}
			});

		this.setState(this.initialState);
	};

	//Function to update expense
	updateUser = (event) => {
		event.preventDefault();

		const user = {
			id: this.state.id,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		};

		axios
			.put(API_URL + user.id, user, {
				headers: { Authorization: authHeader().Authorization },
			})
			.then((response) => {
				if (response.data != null) {
					this.setState({ show: true, method: "put" });
					setTimeout(() => this.setState({ show: false }), 3000);
					setTimeout(() => this.userList(), 2000);
				} else {
					this.setState({ show: false });
				}
			});

		this.setState(this.initialState);
	};

	//This function allows to change the values in the form
	userChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	//This function redirects to the list of users
	userList = () => {
		return this.props.history.push("/listUser");
	};

	render() {
		const { username, email, password } = this.state;

		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast
						show={this.state.show}
						message={
							this.state.method
								? "User Updated Successfully."
								: "User Saved Successfully."
						}
						type={"success"}
					/>
				</div>

				<Card className={"border border-ligth bg-light"}>
					<Card.Header>
						{" "}
						<FontAwesomeIcon
							icon={this.state.id ? faEdit : faPlusCircle}
						/>{" "}
						{this.state.id ? "Update User" : "Add New User"}
					</Card.Header>

					<Form
						onReset={this.resetUser}
						onSubmit={this.state.id ? this.updateUser : this.addUser}
						id="userFormId"
					>
						<Card.Body>
							{/* <Form.Row>
								<Form.Group as={Col} controlId="formGridName">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="text"
										name="name"
										value={name}
										onChange={this.userChange}
										className={"bg-ligth"}
										placeholder="Enter first name"
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridSurname">
									<Form.Label>Surname</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="text"
										name="surname"
										value={surname}
										onChange={this.userChange}
										className={"bg-ligth"}
										placeholder="Enter surname"
									/>
								</Form.Group>
							</Form.Row> */}

							<Form.Row>
								<Form.Group as={Col} controlId="formGridUsername">
									<Form.Label>Username</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="text"
										name="username"
										value={username}
										onChange={this.userChange}
										className={"bg-ligth"}
										placeholder="Enter username"
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="email"
										name="email"
										value={email}
										onChange={this.userChange}
										className={"bg-ligth"}
										placeholder="Enter email"
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="password"
										name="password"
										value={password}
										onChange={this.userChange}
										className={"bg-ligth"}
										placeholder="Enter password"
									/>
								</Form.Group>
							</Form.Row>
						</Card.Body>
						<Card.Footer style={{ textAlign: "right" }}>
							<Button size="small" variant="success" type="submit">
								<FontAwesomeIcon icon={faSave} />{" "}
								{this.state.id ? "Update" : "Save"}
							</Button>{" "}
							<Button size="small" variant="info" type="reset">
								<FontAwesomeIcon icon={faUndo} /> Reset
							</Button>{" "}
							<Button
								size="small"
								variant="info"
								type="button"
								onClick={this.userList.bind()}
							>
								<FontAwesomeIcon icon={faList} /> Users List
							</Button>
						</Card.Footer>
					</Form>
				</Card>
			</div>
		);
	}
}
