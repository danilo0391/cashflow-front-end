import React, { Component } from "react";
import { ButtonGroup, Card, Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUsers, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import MyToast from "../MyToast";

import axios from "axios";
import authHeader from "../../services/auth-header";

// const API_URL = "http://localhost:8080/api/users/";
const API_URL = "https://cashflow-back-end.herokuapp.com/api/users/";

export default class UsersComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			currentPage: 1, // importante variavel para settar pagina 1;
			usersPerPage: 5 // quantidade de usuarios que sera mostrado por pagina;
		};
	}

	componentDidMount() {
		this.findAllUsers();
	}

	findAllUsers() {
		axios.get(API_URL, {
			headers: { Authorization: authHeader().Authorization },
		})
			.then(response => response.data)
			.then((data) => {
				this.setState({ users: data });
			})
	};

	deleteUser = (userId) => {
		axios.delete(API_URL + userId, {
			headers: { Authorization: authHeader().Authorization },
		})
			.then(response => {
				if (response.data != null) {
					this.setState({ show: true });
					setTimeout(() => this.setState({ show: false }), 3000);
					this.setState({
						users: this.state.users.filter(user => user.id !== userId)
					});
				} else {
					this.setState({ show: false });
				}
			})
	};

	// Funcao para mudar a pagina
	changePage = event => {
		this.setState({
			[event.target.name]: parseInt(event.target.value)
		});
	};

	// Funcao que faz voltar para a primeira pagina da lista
	firstPage = () => {
		if (this.state.currentPage > 1) {
			this.setState({
				currentPage: 1
			});
		}
	};

	// Funcao que volta para pagina anterior
	prevPage = () => {
		if (this.state.currentPage > 1) {
			this.setState({
				currentPage: this.state.currentPage - 1
			});
		}
	};

	// Funcao que faz ir para a ultima pagina da lista
	lasttPage = () => { // This fuction is not working
		if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
			this.setState({
				currentPage: Math.ceil(this.state.users.length / this.state.usersPerPage)
			});
		}
	};

	// Funcao que faz ir para a pagina seguinte
	nextPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
			this.setState({
				currentPage: this.state.currentPage + 1
			});
		}
	};

	render() {
		const { users, currentPage, usersPerPage } = this.state;
		const lastIndex = currentPage * usersPerPage;
		const firstIndex = lastIndex - usersPerPage;
		const currentUsers = users.slice(firstIndex, lastIndex);
		const totalPages = Math.ceil(users.length / usersPerPage);

		const pageNumCss = {
			width: "45px",
			border: "1px solid",
			textAlign: "center",
			fontWeight: "bold"
		}


		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast show={this.state.show} message={"User Deleted Successfully."} type={"danger"} />
				</div>

				<Card className={"border border-ligth bg-light"}>
					<Card.Header><FontAwesomeIcon icon={faUsers} /> Users List</Card.Header>
					<Card.Body>
						<div>
							<Table bordered hover striped variant="ligth">
								<tbody>
									<tr>
										<th>ID</th>
										<th>Username</th>
										<th>Email</th>
										<th>Password</th>
										<th>Actions</th>
									</tr>
								</tbody>
								<tbody>
									{
										users.length === 0 ?
											<tr aling="center">
												<td colSpan="6">No Users Available</td>
											</tr> :
											currentUsers.map((users, index) => (
												<tr key={index}>
													<td> {users.id}</td>
													<td> {users.username} </td>
													<td> {users.email} </td>
													<td> {users.password} </td>
													<td>
														<ButtonGroup>
															<Link to={"editUser/" + users.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit} /></Link>{" "}
															<Button size="sm" variant="outline-danger" onClick={this.deleteUser.bind(this, users.id)}><FontAwesomeIcon icon={faTrash} /></Button>
														</ButtonGroup>
													</td>
												</tr>
											))}
								</tbody>
							</Table>
						</div>
					</Card.Body>
					<Card.Footer>
						<div style={{ "float": "left" }}>
							Showing Page {currentPage} of {totalPages}
						</div>
						<div style={{ "float": "right" }}>
							<InputGroup>
								<InputGroup.Prepend>
									<Button type="button" disable={currentPage === 1 ? true : false} onClick={this.firstPage}>
										<FontAwesomeIcon icon={faFastBackward} /> First
									</Button>
									<Button type="button" disable={currentPage === 1 ? true : false} onClick={this.prevPage}>
										<FontAwesomeIcon icon={faStepBackward} /> Prev
									</Button>
								</InputGroup.Prepend>
								<FormControl style={pageNumCss} name="currentPage" value={currentPage} onChange={this.changePage} />
								<InputGroup.Append>
									<Button type="button" disable={currentPage === totalPages ? true : false} onClick={this.nextPage}>
										<FontAwesomeIcon icon={faStepForward} /> Next
									</Button>
									<Button type="button" disable={currentPage === totalPages ? true : false} onClick={this.lasttPage}>
										<FontAwesomeIcon icon={faFastForward} /> Last
									</Button>
								</InputGroup.Append>

							</InputGroup>
						</div>
					</Card.Footer>
				</Card>
			</div>
		);
	}
}
