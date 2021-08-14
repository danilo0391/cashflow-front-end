import React, { Component } from "react";
import { ButtonGroup, Card, Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import MyToast from "../MyToast";
import authHeader from "../../services/auth-header";
import "../../style/Style.css";

import axios from "axios";

const API_URL = "https://cashflow-back-end.herokuapp.com/api/expenses/";

export default class ExpenseList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expenses: [],
			search: '',
			currentPage: 1,
			expensesPerPage: 10,
			sortToggle: true
		};
	}

	//Funtion to sort data
	sortData = () => {
    this.setState(state => ({
			sortToggle : !state.sortToggle
		}));
		this.findAllExpenses(this.state.currentPage);
  };

	componentDidMount() {
		this.findAllExpenses(this.state.currentPage);
	}

	//Function to find all expenses sorted
	findAllExpenses(currentPage) {
		currentPage -= 1;
		let sortDir = this.state.sortToggle ? "asc" : "desc";
		axios.get(API_URL+"?pageNumber=" +
		currentPage +
		"&pageSize=" +
		this.state.expensesPerPage +
		"&sortBy=value&sortDir="+sortDir, {
			headers: { Authorization: authHeader().Authorization },
		})
		.then(response => response.data)
		.then((data) => {
			this.setState({
				expenses: data.content,
				totalPages: data.totalPages,
				totalElements: data.totalElements,
				currentPage: data.number + 1,
			});	
		})
		.catch((error) => {
			console.log(error);
			localStorage.removeItem("jwtToken");
			this.props.history.push("/");
		});
	};

	//Function to delete an expense
	deleteExpense = (expenseId) => {
		axios.delete(API_URL + expenseId, {
			headers: { Authorization: authHeader().Authorization },
		})
			.then(response => {
				if (response.data != null) {
					this.setState({ show: true });
					setTimeout(() => this.setState({ show: false }), 3000);
					this.setState({
						expenses: this.state.expenses.filter(expense => expense.id !== expenseId)
					});
				} else {
					this.setState({ show: false });
				}
			})
	};

	//Function to allow to move between pages
	changePage = event => {
		this.setState({
			[event.target.name]: parseInt(event.target.value)
		});
	};

	//Function to return to the first page
	firstPage = () => {
		if (this.state.currentPage > 1) {
			this.setState({
				currentPage: 1
			});
		}
	};

	//Function to retunr to the previously page
	prevPage = () => {
		if (this.state.currentPage > 1) {
			this.setState({
				currentPage: this.state.currentPage - 1
			});
		}
	};

	//Function to move to the last page
	lasttPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.expenses.length / this.state.expensesPerPage)) {
			this.setState({
				currentPage: Math.ceil(this.state.expenses.length / this.state.expensesPerPage)
			});
		}
	};

	//Function to go to the next page
	nextPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.expenses.length / this.state.expensesPerPage)) {
			this.setState({
				currentPage: this.state.currentPage + 1
			});
		}
	};

	//Function to allow write data in the search box
	searchChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	//Function to delete what was inserted in the search box
	cancelSearch = () => {
		this.setState({ "search": "" })
		this.findAllExpenses(this.state.currentPage);
	}

	//Funciton to search data
	searchData = (currentPage) => {
		currentPage -= 1;
		axios.get(API_URL + "search/" + this.state.search + "?page=" + currentPage + "&size=" + this.state.expensesPerPage, {
			headers: { Authorization: authHeader().Authorization },
		})
			.then(response => response.data)
			.then((data) => {
				this.setState({
					expenses: data.content,
					totalPages: data.totalPages,
					totalElements: data.totalElements,
					currentPage: data.number + 1
				})
			})
	}

	render() {
		const { expenses, currentPage, expensesPerPage, search } = this.state;
		const lastIndex = currentPage * expensesPerPage;
		const firstIndex = lastIndex - expensesPerPage;
		const currentexpenses = expenses.slice(firstIndex, lastIndex);
		const totalPages = Math.ceil(expenses.length / expensesPerPage);

		const pageNumCss = {
			width: "45px",
			border: "1px solid",
			textAlign: "center",
			fontWeight: "bold"
		}
		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast show={this.state.show} message={"Expense Deleted Successfully."} type={"danger"} />
				</div>

				<Card className={"border border-ligth bg-light"}>
					<Card.Header>
						<div style={{ "float": "left" }}>
							<FontAwesomeIcon icon={faList} /> Expenses List
						</div>
						<div style={{ "float": "right" }}>
							<InputGroup size="sm">
								<FormControl placeholder="Search" name="search" value={search} className={"bg-light"}
									onChange={this.searchChange} />
								<InputGroup.Append>
									<Button size="sm" variant="outline-primary" type="button" onClick={this.searchData}>
										<FontAwesomeIcon icon={faSearch} />
									</Button>
									<Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
										<FontAwesomeIcon icon={faTimes} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</div>
					</Card.Header>
					<Card.Body>
						<div>
							<Table bordered hover striped variant="ligth">
								<tbody>
									<tr>
										<th>ID</th>
										<th>Description</th>
										<th onClick={this.sortData} >Value
											<div className={
                        this.state.sortToggle
                          ? "arrow arrow-up"
                          : "arrow arrow-down"
                      	}> 
											</div>
											</th>
										<th>Category</th>
										<th>Date</th>
										<th>Actions</th>
									</tr>
								</tbody>
								<tbody>
									{
										expenses.length === 0 ?
											<tr aling="center">
												<td colSpan="6"> No Expenses Available</td>
											</tr> :
											currentexpenses.map((expenses, index) => (
												<tr key={index}>
													<td> {expenses.id}</td>
													<td> {expenses.description} </td>
													<td> €{expenses.value} </td>
													<td> {expenses.category} </td>
													<td> {expenses.date} </td>
													<td>
														<ButtonGroup>
															<Link to={"editExpense/" + expenses.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit} /></Link>{' '}
															<Button size="sm" variant="outline-danger" onClick={this.deleteExpense.bind(this, expenses.id)}><FontAwesomeIcon icon={faTrash} /></Button>
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