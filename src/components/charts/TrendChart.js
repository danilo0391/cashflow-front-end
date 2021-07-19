import React, { Component } from "react";

import { Line } from "react-chartjs-2";

import axios from "axios";
import authHeader from "../../services/auth-header";

export default class TrendChart extends Component {
	constructor(props) {
		console.log(props);
		super(props);
		console.log(props);
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
				let incomeValue = [];
				console.log(incomes[1]);
				let incomeCategory = [];
				incomes.forEach((element) => {
					const index = incomeCategory.indexOf(element.category);
					if (index >= 0) {
						incomeValue[index] += element.value;
					} else {
						incomeValue.push(element.value);
						incomeCategory.push(element.date);
					}
				});
				this.setState({
					Data: {
						labels: incomeCategory,
						datasets: [
							{
								label: "Incomes in the Month",
								data: incomeValue,
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
				<Line
					data={this.state.Data}
					options={{
						maintainAspectRatio: true,
						plugins: {
							title: {
								display: true,
								text: "Income's Trend",
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
