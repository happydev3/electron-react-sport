import React, { useState } from 'react';
import { Modal, Tabs, Tab, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from 'react-bootstrap';
const { remote } = window.require('electron');


function Optimizer() {
	const [show, setShow] = useState(false);
	const [projection, setProjection] = useState(false);
	const [item, setItem] = useState('all');
	const [test, setTest] = useState('Test1')
	const [player, setPlayer] = useState(true);
	const [dropdown, setDropdown] = useState(false);
	const [sub, setSub] = useState('all');

	const miniSize = () => {
		remote.getCurrentWindow().minimize();
	}

	const close = () => {
		remote.getCurrentWindow().close();
	}
	
	return ( 
		<div className="optimizer ui window">
		
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
					<div className="item"><span className="optimizer-name">Optimizer Name</span></div>
					
					<div className="item item-spacer"></div>
					
					<div className="item item-grouped list-group">
						<a className={`item playerstab ${player ? 'active' : ''}`} type="button" onClick={() => setPlayer(true)}>
							<i className="icimg icimg-playerpool" aria-hidden="true"></i>
							<span>Players</span>
						</a>						
						<a className={`item lineupstab ${!player ? 'active' : ''}`} type="button" onClick={() => setPlayer(false)}>
							<i className="icimg icimg-lineups" aria-hidden="true"></i>
							<span>Lineups</span>
						</a>	
					</div>
					
					<div className="item item-spacer"></div>
					{
						player
						?
						<div className="item item-grouped">
							<a className="item" type="button" onClick={() => setShow(true)}>
								<i className="icimg icimg-settings" aria-hidden="true"></i> 
								Settings
							</a>
							<a className="item" type="button" onClick={() => setProjection(true)}>
								<i className="icimg icimg-upload" aria-hidden="true"></i> 
								Projections
							</a>
						</div>
						:
						<div className="item item-grouped">
							<a className={`item select-all ${sub === 'all' ? 'active' : ''}`} type="button" onClick={() => setSub('all')}>
								<i className="icimg icimg-check" aria-hidden="true"></i>
								<span>All</span>
							</a>
							<a className={`item select-none ${sub === 'none' ? 'active' : ''}`} type="button" onClick={() => setSub('none')}>
								<i className="icimg icimg-check" aria-hidden="true"></i>
								<span>None</span>
							</a>						
							<a className={`item select-export ${sub === 'export' ? 'active' : ''}`} type="button" onClick={() => setSub('export')}>
								<i className="icimg icimg-export" aria-hidden="true"></i>
								<span>Export<span className="tag">0</span></span>
							</a>
						</div>
					}
				</div>			
			</div>
			
			<div className="window-content">
				<div className="pane tab-content">
					{
						player
						?
						<section id="playerstab" className="pp-content content tab-pane active">
							<div className="playerpool-pane-group">
								<div className="playerpool-pane">		
								
									<div className="playerpool-sorts">
										<div className="ui menu secondary">	
											<div className="item">
												<div className="search ui input">
													<input type="text" placeholder="Test..." readOnly/>
													<i className="search-icon im im-magnifier"></i>
												</div>
											</div>	
											
											<div className="item item-grouped">
												<a className={`item ${item === 'all' ? 'active' : ''}`} type="button" onClick={() => setItem('all')}>All</a>
												<a className={`item ${item === 'p' ? 'active' : ''}`} type="button" onClick={() => setItem('p')}>P</a>
												<a className={`item ${item === 'c' ? 'active' : ''}`} type="button" onClick={() => setItem('c')}>C</a>
												<a className={`item ${item === '1b' ? 'active' : ''}`} type="button" onClick={() => setItem('1b')}>1B</a>
												<a className={`item ${item === '2b' ? 'active' : ''}`} type="button" onClick={() => setItem('2b')}>2B</a>	
												<a className={`item ${item === '3b' ? 'active' : ''}`} type="button" onClick={() => setItem('3b')}>3B</a>	
												<a className={`item ${item === 'ss' ? 'active' : ''}`} type="button" onClick={() => setItem('ss')}>SS</a>	
												<a className={`item ${item === 'of' ? 'active' : ''}`} type="button" onClick={() => setItem('of')}>OF</a>
											</div>
											
											<div className="right">
												<div className="item item-grouped">
													<a className={`item ${test === 'Test1' ? 'active' : ''}`} type="button" onClick={() => setTest('Test1')}>Test1</a>
													<a className={`item ${test === 'Test2' ? 'active' : ''}`} type="button" onClick={() => setTest('Test2')}>Test2</a>
													<a className={`item ${test === 'Test3' ? 'active' : ''}`} type="button" onClick={() => setTest('Test3')}>Test3</a>
													
													<a className="sort-popover-trigger" type="button" onClick={() => setDropdown(!dropdown)}>
														<i className="im im-angle-down" aria-hidden="true"></i>
													</a>
													
													<div className="sort-popover dropdown-menu dropdown-menu-right" style={{display : `${dropdown ? 'block' : 'none'}`}}>
														<div className="apply-exposure">
															<label>
																<OverlayTrigger
																	placement="left" 
																	overlay={
																	<Popover id="popover-basic">
																		<Popover.Content>
																			Changes every players max exposure.
																		</Popover.Content>
																	</Popover>
																}>
																	<i className="im im-note-o i-info" aria-hidden="true"></i>
																</OverlayTrigger>
																Global Exposure 
															</label>
															<input type="tel" value="100" readOnly/>
														</div>
														
														<hr />
														
														<a className="item" type="button"><i className="im im-reset" aria-hidden="true"></i> Reset FPTS</a>
														<a className="item" type="button"><i className="im im-reset" aria-hidden="true"></i> Reset Exposures</a>
														<a className="item" type="button"><i className="im im-reset" aria-hidden="true"></i> Reset Locks</a>
													</div>	
												</div>
											</div>
										</div>	
									</div>	

									<div className="playerpool-grid">

									</div>
									
									<div className="playerpool-calc">
												
									</div>							
								</div>
							</div>
						</section>
						:
						<section id="lineupstab" className="lin-content content tab-pane">
							<div className="lineups-pane-group">						
								<div className="lineups-pane-sm">
								
								</div>
								
								<div className="lineups-pane">

								</div>
							</div>					
						</section>
					}
				</div>
			</div>
			
			<Modal className="faio" size="lg" centered show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="container-fluid">
						<div className="row">	
							<div className="col-12 col-lg-6">
								<div className="modal-positions">
									<div className="ui level">
										<h5>Positions &nbsp;
											<OverlayTrigger
												placement="right" 
												overlay={
												<Popover id="popover-basic">
													<Popover.Content>
														Positions required for a single lineup
													</Popover.Content>
												</Popover>
											}>
												<i className="im im-note-o i-info" aria-hidden="true"></i>
											</OverlayTrigger>
										</h5>
									</div>
									
									<table className="ui tbl grey positions-table">
										<thead>
											<tr>
												<th>Position</th>
												<th className="right">Delete</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<input type="tel" value="" placeholder="Enter position/s..." readOnly/>
												</td>
												<td className="right"><i className="ic-delete-1" aria-hidden="true"></i></td>
											</tr>
										</tbody>
									</table>
									
									<div className="ui level add-position">
										<button className="ui button primary i-left" type="button"><i className="im im-plus-circle" aria-hidden="true"></i> Add Position</button>
									</div>
								</div>											
							</div>
						
							<div className="col-12 col-lg-6">	
								<div className="modal-rules">
									<div className="ui level">
										<h5>Rules &nbsp;
											<OverlayTrigger
												placement="right" 
												overlay={
												<Popover id="popover-basic">
													<Popover.Content>
														Rules required for a single lineup
													</Popover.Content>
												</Popover>
											}>
												<i className="im im-note-o i-info" aria-hidden="true"></i>
											</OverlayTrigger>
										</h5>
									</div>
									
									<table className="ui tbl grey rules-table">
										<thead>
											<tr>
												<th>Rule</th>
												<th className="right">Set</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Minimum Salary Cap &nbsp;
													<OverlayTrigger
														placement="right" 
														overlay={
														<Popover id="popover-basic">
															<Popover.Content>
																Minimum salary allowed for a single lineup
															</Popover.Content>
														</Popover>
													}>
														<i className="im im-note-o i-info" aria-hidden="true"></i>
													</OverlayTrigger>
												</td>
												<td className="right">
													<label>0 if not changed</label>
													<input className="rules-minsalary" type="tel" value="0" readOnly/>
												</td>
											</tr>
											
											<tr>
												<td>Maximum Salary Cap &nbsp;
													<OverlayTrigger
														placement="right" 
														overlay={
														<Popover id="popover-basic">
															<Popover.Content>
																Maximum salary allowed for a single lineup
															</Popover.Content>
														</Popover>
													}>
														<i className="im im-note-o i-info" aria-hidden="true"></i>
													</OverlayTrigger>
												</td>
												<td className="right">
													<input className="rules-maxsalary" type="tel" value="0" readOnly/>
												</td>
											</tr>
											
											<tr>
												<td>Max. Players From 1 Team &nbsp;
													<OverlayTrigger
														placement="right" 
														overlay={
														<Popover id="popover-basic">
															<Popover.Content>
																Maximum allowed players from a single team for a single lineup
															</Popover.Content>
														</Popover>
													}>
														<i className="im im-note-o i-info" aria-hidden="true"></i>
													</OverlayTrigger>
												</td>
												<td className="right">
													<label>0 if not needed</label>
													<input className="rules-maxplayers" type="tel" value="0" readOnly/>
												</td>
											</tr>
											
											<tr>
												<td>Min. different teams &nbsp;
													<OverlayTrigger
														placement="right" 
														overlay={
														<Popover id="popover-basic">
															<Popover.Content>
																Single lineup must have players from set minimum number of different teams
															</Popover.Content>
														</Popover>
													}>
														<i className="im im-note-o i-info" aria-hidden="true"></i>
													</OverlayTrigger>
												</td>
												<td className="right">
													<label>0 if not needed</label>
													<input className="rules-minteams" type="tel" value="0" readOnly/>
												</td>
											</tr>
											
											<tr>
												<td>No opponent vs &nbsp;
													<OverlayTrigger
														placement="right" 
														overlay={
														<Popover id="popover-basic">
															<Popover.Content>
																No opponent vs. selected position will be added to lineup
															</Popover.Content>
														</Popover>
													}>
														<i className="im im-note-o i-info" aria-hidden="true"></i>
													</OverlayTrigger>
												</td>
												<td className="right">
													<label>none if not needed</label>
													<select className="rules-noopponent">
														<option value="">None</option>
													</select>
												</td>
											</tr>
										</tbody>
									</table>
								</div>									
							</div>							
						</div>
						
						<div className="row">					
							<div className="col-12">						
								<div className="modal-optimizername">
									<div className="ui level">
										<h5>Name &nbsp;
											<OverlayTrigger
												placement="right" 
												overlay={
												<Popover id="popover-basic">
													<Popover.Content>
														This is your optimizer name
													</Popover.Content>
												</Popover>
											}>
												<i className="im im-note-o i-info" aria-hidden="true"></i>
											</OverlayTrigger>
										</h5>
									</div>
									
									<table className="ui tbl grey optimizername-table">
										<thead>
											<tr>
												<th>Optimizer Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<input className="name-optimizername" type="text" value="" placeholder="Enter Name..." readOnly/>
												</td>
											</tr>
										</tbody>
									</table>
								</div>								
							</div>							
						</div>
						
						<div className="row">
							<div className="col-12">
								<button className="ui button success i-left" type="button"><i className="im im-floppy-disk" aria-hidden="true"></i> Save Settings</button>
							</div>
						</div>
					</div>								
				</Modal.Body>
			</Modal>
			
			<Modal className="faio" size="lg" show={projection} onHide={() => setProjection(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Projections</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="container-fluid">

					</div>
					
					<div className="level-box">

					</div>
				</Modal.Body>
			</Modal>
			
		</div>
	);
}

export default Optimizer;
