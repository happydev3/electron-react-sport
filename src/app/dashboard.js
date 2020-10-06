import React, { useState, useEffect } from 'react'
import { Link, withRouter } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import Preloader from './shared/Preloader';
import TopBar from './shared/TopBar';
import Builder from './dashboard/builder';
import ConfirmModal from './shared/Conform';

const { ipcRenderer } = window.require('electron');

const Dashboard = (props) => {

	const [loading, setLoading] = useState(true);
	const [builder, setBuilder] = useState(false);
	const [optimizes, setOptimizes] = useState('');
	const [confirm, setConfirm] = useState(false);

	const handleCloseBuilder = () => setBuilder(false);
	const handleShowBuilder = () => setBuilder(true);
	const handleConfirm = () => setConfirm(true);
	const handleClose = () => setConfirm(false);

	const getOptimizes = () => {
		ipcRenderer.send('getOptimizes', 'all');
		ipcRenderer.on('responseGetOptimizes', (event, arg) => {
			setOptimizes(arg);
		});
	}

	const deleteOptimize = (id) => {
		ipcRenderer.send('deleteOptimize', id);
		ipcRenderer.on('responseDeleteOptimize', (event, arg) => {
			getOptimizes();
		});
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 400);

		getOptimizes();
	
		return () => {
			clearTimeout(timer);
		}
	}, []);
  
	return ( 
		<div className="dashboard ui window">
			{
				loading
				?
				<Preloader />
				:
				<>	
					<TopBar />
					{
						optimizes.length !== 0
						?
						<>					
							<div className="bottombar ui level">
								<a className="item" variant="primary" onClick={handleShowBuilder}>
									<i className="icimg icimg-playerpool" aria-hidden="true"></i> 
									Build
								</a>				
								<div className="item item-spacer"></div>
								<a className="item" type="button" onClick={() => setConfirm(true)}>
									<i className="icimg icimg-delete" aria-hidden="true"></i> 
									Delete
								</a>			
							</div>
							
							<div className="window-content dash-window-content">
								<div className="pane dash-pane">					
									<div className="scrollable">
										<ul className="dash-optimizerlist">
										{
											optimizes.map((optimize, index) => {
												return (
													<li key={index}>
														<div className="list-container">
															<div className="list-logo-container"><span className="logo-main-icon"></span></div>
															<div className="list-optimizer-name">{optimize.name}</div>
															<div className="list-button-container">
																<Link to={`/optimizer/${optimize.id}`} className="ui button secondary" type="button"><i className="im im-external-link" aria-hidden="true"></i>Open</Link>
																<a className="ui button danger" type="button" onClick={() => deleteOptimize(optimize.id)}>
																	<i className="im im-trash-can" aria-hidden="true"></i>
																</a>
															</div>
														</div>
													</li>
												)
											})
										}
										</ul>
									</div>			
								</div>
							</div>
							<div className="dash-nodata-overlay">
								<div className="content">
									<button className="ui success button" type="button" onClick={handleShowBuilder}><i className="im im-tools" aria-hidden="true"></i> Build Optimizer</button>
								</div>
							</div>	
						</>
						:
						<div id="nodataOverlay" className="dash-nodata-overlay active">
							<div className="content">
								<button className="ui success button" data-toggle="modal" data-target="#modalBuilder" type="button" onClick={() => setBuilder(true)}>
									<i className="im im-tools" aria-hidden="true"></i> 
									Build Optimizer
								</button>
							</div>
						</div>
					}
				</>
			}
			
			<Builder show={builder} handleClose={handleCloseBuilder} />	
			<ConfirmModal show={confirm} handleClose={handleClose} deleteOptimize={(id) => deleteOptimize(id)}/>
		</div>
	);
}

export default withRouter(Dashboard);
