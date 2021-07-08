import React, { Component } from "react";

import { Pie } from "react-chartjs-2";

import axios from "axios";
import authHeader from "../../services/auth-header";

export default class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Data: {},
		};
	}

	componentDidMount() {
		const API_URL = "https://cashflow-back-end.herokuapp.com/api/incomes/";
		axios
			.get(API_URL, {
				headers: { Authorization: authHeader().Authorization },
			})
			.then((res) => {
				const incomes = res.data;
				let incomevalue = [];
				console.log(incomevalue);
				let incomecategory = [];
				console.log(incomecategory);
				incomes.forEach((element) => {
					console.log(element);
					incomevalue.push(element.value);
					incomecategory.push(element.category);
				});
				this.setState({
					Data: {
						labels: incomecategory,
						datasets: [
							{
								label: "Incomes in the Month",
								data: incomevalue,
								backgroundColor: [
									"rgba(90,178,255,0.6)",
									"rgba(240,134,67,0.6)",
									"rgba(250,55,197,0.6)",
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
				<Pie
					data={this.state.Data}
					options={{
						maintainAspectRatio: true,
						plugins: {
							title: {
								display: true,
								text: "Income's Pie Chart",
								font: { size: 16 },
								padding: { top: 10, bottom: 20 },
							},
						},
					}}
				/>
			</div>
		);
	}
}
