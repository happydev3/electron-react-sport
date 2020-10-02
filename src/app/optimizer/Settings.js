import React, { useState } from "react"
import { Popover, OverlayTrigger, Modal } from 'react-bootstrap';


const Settings = (props) => {
	return (
		<Modal size="lg" centered show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Settings</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="ui level padded">
					<button type="button" className="ui button primary i-left"><i className="im im-floppy-disk" aria-hidden="true"></i> Save Settings</button>                           					
				</div>
				
				<div className="settings-container">	
					<div className="settings-item">
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
							
							<table className="ui tbl optimizername-table">
								<thead>
									<tr>
										<th>Optimizer Name <span>Required</span></th>
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
							
							<table className="ui tbl rules-table">
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
											<span>Required</span>
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
				
					<div className="settings-item">	
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
							
							<table className="ui tbl positions-table">
								<thead>
									<tr>
										<th>Position <span>At least 1 position required</span></th>
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
				</div>						
			</Modal.Body>
		</Modal>
	)
}

export default Settings;

