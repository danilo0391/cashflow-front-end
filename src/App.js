import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Income from "././components/income/Income";
import IncomeList from "././components/income/IncomeList";
import Expense from "././components/expense/Expense";
import ExpenseList from "././components/expense/ExpenseList";
import User from "././components/user/User";
import UserList from "././components/user/UserList";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";

export default function App() {
	return (
		<Router>
			<NavigationBar />
			<Container>
				<Row>
					<Col lg={12} className={"margin-top"}>
						<Switch>
							<Route path="/" exact component={Welcome} />
							<Route path="/addIncome" exact component={Income} />
							<Route path="/editIncome/:id" exact component={Income} />
							<Route path="/listIncome" exact component={IncomeList} />
							<Route path="/addExpense" exact component={Expense} />
							<Route path="/editExpense/:id" exact component={Expense} />
							<Route path="/listExpense" exact component={ExpenseList} />
							<Route path="/listUser" exact component={UserList} />
							<Route path="/editUser/:id" exact component={User} />
							<Route path="/login" exact component={Login} />
							<Route path="/logout" exact component={Welcome} />
							<Route path="/register" exact component={Register} />
							<Route path="/profile" exact component={Profile} />
						</Switch>
					</Col>
				</Row>
			</Container>
			<Footer />
		</Router>
	);
}
