import React, { Component } from "react";

import { Pie } from "react-chartjs-2";

import axios from "axios";
import authHeader from "../../services/auth-header";

export default class PieChart extends Component {
	//Default constructor
	constructor(props) {
		console.log(props);
		super(props);
		console.log(props);
		this.state = {
			Data: {},
		};
	}

	componentDidMount() {
		const API_URL =
			"https://cashflow-back-end.herokuapp.com/api/incomes/default";
		//Axios function to handle comunication with the back-end
		axios
			.get(API_URL, {
				headers: { Authorization: authHeader().Authorization },
			})
			.then((res) => {
				const incomes = res.data;
				let incomeValue = []; //variable to hold values
				let incomeCategory = []; //variable to hold category
				incomes.forEach((element) => {
					const index = incomeCategory.indexOf(element.category); //variable to hold the index of category
					if (index >= 0) {
						incomeValue[index] += element.value; //take the valeu and add in each interation
					} else {
						incomeValue.push(element.value);
						incomeCategory.push(element.category);
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
