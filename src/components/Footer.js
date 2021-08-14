import React from "react";
import { Navbar, Container, Col } from "react-bootstrap";

//Footer of the web application
export default function Footer(props) {
	let fullYear = new Date().getFullYear();

	return (
		<Navbar fixed="bottom" bg="dark" variant="dark">
			<Container>
				<Col lg={12} className="text-center text-muted">
					<div>
						{fullYear}-{fullYear + 1}, All rights Reserved by Danilo Pereira
					</div>
				</Col>
			</Container>
		</Navbar>
	);
}
