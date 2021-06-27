import React from "react";

import { Jumbotron } from "react-bootstrap";

export default function Welcome(props) {
	return (
		<Jumbotron>
			<h1>Welcome to Cash Flow App</h1>
			<blockquote className="blockquote mb-0">
				<p1>
					In this application you are going to be able to add, delete, update,
					and read data from the database. Graphs will dynamically populate the
					dashboard area showing the balance, history of expenses and incomes.
				</p1>
				<p2>
					It is going to be possible to search data by date, category, value, as
					well as sorting them. Also important the user will be able to print a
					report, save it in PDF, send it by email, and generate a final end of
					month statement.
				</p2>
			</blockquote>
		</Jumbotron>
	);
}
