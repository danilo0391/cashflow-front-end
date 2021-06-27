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

// const API_URL = "http://localhost:8080/api/expenses/";
const API_URL = "https://cashflow-app-backend.herokuapp.com/api/expenses/";

export default class Expense extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state = { categories: [] };
		this.state.show = false;
		this.updateExpense = this.updateExpense.bind(this);
		this.addExpense = this.addExpense.bind(this);
	}

	initialState = {
		id: "",
		date: "",
		description: "",
		value: "",
		category: "",
	};

	componentDidMount() {
		const expenseId = +this.props.match.params.id;
		if (expenseId) {
			this.findExpenseById(expenseId);
		}
		this.findaAllCategories();
	}

	findaAllCategories = () => {
		axios
			.get(API_URL + "categories")
			.then((response) => response.data)
			.then((data) => {
				this.setState({
					categories: [{ value: "", display: "Select Category" }].concat(
						data.map((category) => {
							return { value: category, display: category };
						})
					),
				});
			});
	};

	findExpenseById = (expenseId) => {
		axios
			.get(API_URL + expenseId, {
				headers: { Authorization: authHeader().Authorization },
			})
			.then((response) => {
				if (response.data != null) {
					this.setState({
						id: response.data.id,
						date: response.data.date,
						description: response.data.description,
						value: response.data.value,
						category: response.data.category,
					});
				}
			})
			.catch((error) => {
				console.error("Error - " + error);
			});
	};

	resetExpense = () => {
		this.setState(() => this.initialState);
	};

	addExpense = (event) => {
		event.preventDefault();

		const expense = {
			date: this.state.date,
			description: this.state.description,
			value: this.state.value,
			category: this.state.category,
		};
		axios
			.post(API_URL, expense, {
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

	updateExpense = (event) => {
		event.preventDefault();

		const expense = {
			id: this.state.id,
			date: this.state.date,
			description: this.state.description,
			value: this.state.value,
			category: this.state.category,
		};

		axios
			.put(API_URL + expense.id, expense, {
				headers: { Authorization: authHeader().Authorization },
			})
			.then((response) => {
				if (response.data != null) {
					this.setState({ show: true, method: "put" });
					setTimeout(() => this.setState({ show: false }), 2000);
					setTimeout(() => this.expenseList(), 2000);
				} else {
					this.setState({ show: false });
				}
			});

		this.setState(this.initialState);
	};

	expenseChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	expenseList = () => {
		return this.props.history.push("/listExpense");
	};

	render() {
		const { date, description, value, category } = this.state;

		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast
						show={this.state.show}
						message={
							this.state.method === "put"
								? "Expense Updated Successfully."
								: "Expense Saved Successfully."
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
						{this.state.id ? "Update Expense" : "Add New Expense"}
					</Card.Header>

					<Form
						onReset={this.resetExpense}
						onSubmit={this.state.id ? this.updateExpense : this.addExpense}
						id="expenseFormId"
					>
						<Card.Body>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridDate">
									<Form.Label>Date</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="date"
										name="date"
										value={date}
										onChange={this.expenseChange}
										className={"bg-ligth"}
										placeholder="Enter date"
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridDescription">
									<Form.Label>Description</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="text"
										name="description"
										value={description}
										onChange={this.expenseChange}
										className={"bg-ligth"}
										placeholder="Enter description"
									/>
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col} controlId="formGridValue">
									<Form.Label>Value</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="number"
										step="0.01"
										min="0"
										max="9999999"
										name="value"
										value={value}
										onChange={this.expenseChange}
										className={"bg-ligth"}
										placeholder="Enter value"
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridCategory">
									<Form.Label>Category</Form.Label>
									<Form.Control
										required
										as="select"
										custom
										onChange={this.expenseChange}
										name="category"
										value={category}
										className={"bg-ligth"}
									>
										{this.state.categories.map((category) => (
											<option key={category.value} value={category.value}>
												{category.display}
											</option>
										))}
									</Form.Control>
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
								onClick={this.expenseList.bind()}
							>
								<FontAwesomeIcon icon={faList} /> Expense List
							</Button>
						</Card.Footer>
					</Form>
				</Card>
			</div>
		);
	}
}
