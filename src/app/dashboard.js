import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Builder from './dashboard/builder';
const { remote } = window.require('electron');

function Dashboard() {
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(true);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const miniSize = () => {
		remote.getCurrentWindow().minimize();
	}

	const close = () => {
		remote.getCurrentWindow().close();
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);
  
	return ( 
		<div className="dashboard ui window">
			{
				loading
				?
				<div className='preloader'>
					<div className="preloader-bg"></div>
					<div className="preloader-content">
						<div><span className="logo-main logo-preloader"></span><div className="preloader-animation"></div></div>
					</div>
				</div>
				:
				<>
					<div className="dash-nodata-overlay">
						<div className="content">
							<button className="ui success button" type="button" onClick={handleShow}><i className="im im-tools" aria-hidden="true"></i> Build Optimizer</button>
						</div>
					</div>
					
					<div className="topbar ui menu">
						<Link to="/" className="logo-topbar item"><span className="logo-main-icon"></span> Sports Optimizer</Link>	
										
						<div className="right">			
							<a className="item" type="button" onClick={miniSize}><i className="im im-minimize" aria-hidden="true"></i></a>
							<a className="item maximized disabled" type="button"><i className="im im-maximize" aria-hidden="true"></i></a>
							<a className="item" type="button" onClick={close}><i className="im im-x-mark" aria-hidden="true"></i></a>
						</div>

					</div>
					
					<div className="bottombar">
						<div className="ui menu secondary">
							<a className="item" variant="primary" onClick={handleShow}><i className="icimg icimg-playerpool" aria-hidden="true"></i> Build</a>				
							<div className="item item-spacer"></div>
							<a className="item" type="button"><i className="icimg icimg-delete" aria-hidden="true"></i> Delete</a>	
						</div>			
					</div>		
				
					<div className="window-content dash-window-content">
						<div className="pane dash-pane">					
							<div className="scrollable">
								<ul className="dash-optimizerlist">
									<li>
										<div className="list-container">
											<div className="list-logo-container"><span className="logo-main-icon"></span></div>
											<div className="list-optimizer-name">Optimizer Name 1</div>
											<div className="list-button-container">
												<Link to="/optimizer" className="ui button secondary" type="button"><i className="im im-external-link" aria-hidden="true"></i>Open</Link>
												<a className="ui button danger" type="button"><i className="im im-trash-can" aria-hidden="true"></i></a>
											</div>
										</div>
									</li>
								</ul>
							</div>			
						</div>
					</div>
				</>
			}

			<Builder show={show} handleClose={handleClose} />

			



			

		</div>
	);
}

export default Dashboard;
