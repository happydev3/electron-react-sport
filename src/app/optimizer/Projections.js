import React from "react";
import { Modal } from 'react-bootstrap';

const Projections = (props) => {
	return (
		<Modal centered show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Projections</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="projections-container">			
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default Projections;

