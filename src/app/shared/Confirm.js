import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = (props) => {

    useEffect(() => {
        console.log('props', props);
        return () => {
        }
    }, []);

    const handleConfirm = () => {
        props.handleClose();
        props.deleteOptimize('all');
    }

	return (
	  <>
		<Modal size="sm" centered show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title><h5 style={{color: 'red'}}>Caution!</h5></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="ui level padded">
					<h5 style={{color: 'black'}}>Confirm to delete all optimizers?</h5>
				</div>
				
				<div className="ui level padded">
					<Button className="ui button primary builder-build" onClick={handleConfirm}>
						Confirm
					</Button>
					
					<div className="right">
						<Button className="ui button builder-previous" onClick={props.handleClose}>
							Close
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	  </>
	);
}

export default ConfirmModal;