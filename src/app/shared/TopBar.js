import React from "react";
import { Link } from "react-router-dom";
const { remote } = window.require('electron');

const TopBar = (props) => {
	const miniSize = () => {
		remote.getCurrentWindow().minimize();
	}

	const close = () => {
		remote.getCurrentWindow().close();
	}
	
	return (
		<div className="topbar ui level">
			<a className="logo-topbar item">
				<span className="logo-main-icon"></span> Sports Optimizer</a>				
							
			<div className="right">		
				<Link to="/" className="item ui button primary">Dashboard</Link>	
				<a className="item" type="button" onClick={miniSize}><i className="im im-minimize" aria-hidden="true"></i></a>
				<a className="item maximized disabled" type="button"><i className="im im-maximize" aria-hidden="true"></i></a>
				<a className="item" type="button" onClick={close}><i className="im im-x-mark" aria-hidden="true"></i></a>
			</div>
		</div>
	);
}

export default TopBar;

