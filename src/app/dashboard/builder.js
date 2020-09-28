import React, { Component } from "react"
import { Tabs, Tab } from 'react-bootstrap';
import { Popover, OverlayTrigger } from 'react-bootstrap';


export default class Builder extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
		key: 1,
		popoverOpen: false,
	  };
	}

	handleSelect = (key) => {
	  this.setState({key});
	}

	render () {
		return (
			<form className="builder-steps">
				<div className="builder-tabs-container">		
					<div className="builder-tabs">
						<a 
							className={`item builder-name ${this.state.key === 1 ? 'active' : ''}`} 
							type="button" 
							onClick={()=>this.handleSelect(1)}
						>
							<span>1.</span>Name
						</a>
						<a 
							className={`item builder-positions ${this.state.key === 2 ? 'active' : ''}`} 
							type="button" 
							onClick={()=>this.handleSelect(2)}
						>
							<span>2.</span>Positions
						</a>
						<a 
							className={`item builder-rules ${this.state.key === 3 ? 'active' : ''}`} 
							type="button" 
							onClick={()=>this.handleSelect(3)}
						>
							<span>3.</span>Rules
						</a>
					</div>
					
					<Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
						<Tab eventKey={1}>
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
											<th>Create Optimizer Name : <span>Required</span></th>
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
						</Tab>
						
						<Tab eventKey={2}>
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
											<th>Position : <span>At least 1 position required</span></th>
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
									<button className="ui button success i-left right" type="button"><i className="im im-plus-circle" aria-hidden="true"></i> Add Position</button>
								</div>
							</div>				
						</Tab>
						
						<Tab eventKey={3}>
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
											<td>Minimum Salary Cap &nbsp;
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
						</Tab>
					</Tabs>             
				</div>
				
				<div className="builder-steps-controls">
					<button 
						className="ui button builder-previous" 
						type="button" 
						onClick={() => this.setState({key: this.state.key - 1})} 
						disabled={this.state.key === 1}
					>
						Previous
					</button>
					<button 
						className="ui button primary builder-next" 
						type="button" 
						onClick={() => this.setState({key: this.state.key + 1})} 
						disabled={this.state.key === 3}
					>
						Next
					</button>
					<button 
						className={`ui button success builder-build ${this.state.key === 3 ? '' : 'hidden'}`} 
						type="submit"
					>
						Build
					</button>
				</div>
			</form>
		)
	}
}