import React, { Component } from "react";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import TrendChart from "./charts/TrendChart";
import { Card, CardColumns } from "react-bootstrap";

//Dashboard import charts components and render them
export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<CardColumns>
					<Card className="text-center" style={{ width: "30rem" }}>
						<Card.Body>
							<div>
								<PieChart />
							</div>
						</Card.Body>
					</Card>
				</CardColumns>

				<CardColumns>
					<Card style={{ width: "50rem" }}>
						<Card.Body>
							<div>
								<BarChart />
							</div>
						</Card.Body>
					</Card>
				</CardColumns>

				<CardColumns>
					<Card style={{ width: "50rem" }}>
						<Card.Body>
							<div>
								<TrendChart />
							</div>
						</Card.Body>
					</Card>
				</CardColumns>
			</div>
		);
	}
}
