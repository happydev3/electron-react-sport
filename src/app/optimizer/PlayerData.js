import React from "react"
import { Modal } from 'react-bootstrap';


const PlayerData = (props) => {
	return (
		<Modal centered show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Player Data</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="playerdata-container">
				
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default PlayerData;

