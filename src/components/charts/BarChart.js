import React, { Component } from "react";

import { Bar } from "react-chartjs-2";

import axios from "axios";
import authHeader from "../../services/auth-header";
import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";

export default class BarChart extends Component {
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
					incomevalue.push(element.value);
					incomecategory.push(element.date);
				});
				this.setState({
					Data: {
						labels: incomecategory,
						datasets: [
							{
								label: "Incomes per Day",
								data: incomevalue,
								backgroundColor: [
									"rgba(255,105,145,0.6)",
									"rgba(155,100,210,0.6)",
									"rgba(90,178,255,0.6)",
									"rgba(240,134,67,0.6)",
									"rgba(120,120,120,0.6)",
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
				<Bar
					data={this.state.Data}
					options={{
						maintainAspectRatio: true,
						plugins: {
							title: {
								display: true,
								text: "Income's Bar Chart",
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
