import React, { Component } from "react";

import { Bar } from "react-chartjs-2";

import axios from "axios";
import authHeader from "../../services/auth-header";

export default class BarChart extends Component {
	//Default constructor
	constructor(props) {
		super(props);
		this.state = {
			Data: {},
		};
	}

	componentDidMount() {
		const API_URL =
			"https://cashflow-back-end.herokuapp.com/api/expenses/default";
		//Axios function to handle comunication with the back-end
		axios
			.get(API_URL, {
				headers: { Authorization: authHeader().Authorization },
			})
			.then((res) => {
				const expenses = res.data;
				let expenseValue = []; //variable to hold values
				let expenseCategory = []; //variable to hold category
				expenses.forEach((element) => {
					const index = expenseCategory.indexOf(element.category); //variable to hold the index of category
					if (index >= 0) {
						expenseValue[index] += element.value; //take the valeu and add in each interation
					} else {
						expenseValue.push(element.value);
						expenseCategory.push(element.category);
					}
				});
				this.setState({
					Data: {
						labels: expenseCategory,
						datasets: [
							{
								data: expenseValue,
								backgroundColor: [
									"rgba(90,178,255,0.6)",
									"rgba(240,134,67,0.6)",
									"rgba(215, 197, 60, 1)",
									"rgba(250,55,197,0.6)",
									"rgba(60, 215, 60, 1)",
								],
							},
						],
					},
				});
			});
	}

	render() {
		return (
			<div>
				<Bar
					data={this.state.Data}
					options={{
						maintainAspectRatio: true,
						plugins: {
							title: {
								display: true,
								text: "Total Expenses per Category",
								font: { size: 16 },
								padding: { top: 10, bottom: 20 },
							},
							legend: {
								display: false,
							},
						},
					}}
				/>
			</div>
		);
	}
}
