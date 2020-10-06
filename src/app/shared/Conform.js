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
		<Modal show={props.show} onHide={props.handleClose}>
		  <Modal.Header closeButton>
			<Modal.Title><h3 style={{color: 'red'}}>Caution!</h3></Modal.Title>
		  </Modal.Header>
		  <Modal.Body><h5 style={{marginLeft: '15px', color: 'black'}}>Are you going to delete all really?</h5></Modal.Body>
		  <Modal.Footer>
			<Button className="ui button builder-previous" onClick={props.handleClose}>
			  Close
			</Button>
			<Button className="ui button success builder-build" onClick={handleConfirm}>
			  Confirm
			</Button>
		  </Modal.Footer>
		</Modal>
	  </>
	);
}

export default ConfirmModal;