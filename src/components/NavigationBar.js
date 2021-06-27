import { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faSignInAlt,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import AuthService from "../services/auth-service";

export default class NavigationBar extends Component {
	render() {
		const guestLinks = (
			<>
				<div className="mr-auto"></div>
				<Nav className="navbar-right">
					<Link to={"register"} className="nav-link">
						<FontAwesomeIcon icon={faUserPlus} /> Register
					</Link>
					<Link to={"login"} className="nav-link">
						<FontAwesomeIcon icon={faSignInAlt} /> Login
					</Link>
				</Nav>
			</>
		);

		const superUserLinks = (
			<>
				<Nav className="mr-auto">
					<Link to={"addIncome"} className="nav-link">
						Add Income
					</Link>
					<Link to={"listIncome"} className="nav-link">
						Income List
					</Link>
					<Link to={"addExpense"} className="nav-link">
						Add Expense
					</Link>
					<Link to={"listExpense"} className="nav-link">
						Expense List
					</Link>
					<Link to={"listUser"} className="nav-link">
						User List
					</Link>
				</Nav>
				<Nav className="navbar-right">
					<Link
						to={"logout"}
						className="nav-link"
						onClick={() => AuthService.logout()}
					>
						<FontAwesomeIcon icon={faSignOutAlt} /> Logout
					</Link>
				</Nav>
			</>
		);

		const regularUserLinks = (
			<>
				<Nav className="mr-auto">
					<Link to={"listIncome"} className="nav-link">
						Income List
					</Link>
					<Link to={"listExpense"} className="nav-link">
						Expense List
					</Link>
				</Nav>
				<Nav className="navbar-right">
					<Link
						to={"logout"}
						className="nav-link"
						onClick={() => AuthService.logout()}
					>
						<FontAwesomeIcon icon={faSignOutAlt} /> Logout
					</Link>
				</Nav>
			</>
		);

		return (
			<Navbar bg="dark" variant="dark">
				<Link to={""} className="navbar-brand">
					Home
				</Link>
				{AuthService.getCurrentUser() === null
					? guestLinks
					: AuthService.getCurrentUser().roles[0] === "ROLE_ADMIN" ||
					  AuthService.getCurrentUser().roles[0] === "ROLE_MODERATOR"
					? superUserLinks
					: regularUserLinks}
			</Navbar>
		);
	}
}
