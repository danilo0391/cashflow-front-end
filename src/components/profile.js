import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth-service";

let today = new Date();
let date =
	today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
let time =
	today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: null,
			userReady: false,
			currentUser: { username: "" },
		};
	}

	componentDidMount() {
		const currentUser = AuthService.getCurrentUser();

		if (!currentUser) this.setState({ redirect: "/home" });
		this.setState({ currentUser: currentUser, userReady: true });
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}

		const { currentUser } = this.state;

		return (
			<div className="container">
				{this.state.userReady ? (
					<div>
						<header className="jumbotron">
							<h3>
								Welcome
								<strong> {currentUser.username} </strong>
								to Cash Flow App
							</h3>
						</header>
						<p>
							<strong>Date:</strong> {date}
						</p>
						<p>
							<strong>Time:</strong> {time}h
						</p>
					</div>
				) : null}
			</div>
		);
	}
}
