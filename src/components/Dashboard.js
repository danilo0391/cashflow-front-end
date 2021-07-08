import React, { Component } from "react";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";

export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<div className="flex-column">
					<div className="p-2 col-example text-left">
						<PieChart />
					</div>
				</div>
				<div className="d-flex flex-column-reverse">
					<div className="p-2 col-example text-lef">
						<BarChart />
					</div>
				</div>
			</div>
		);
	}
}
