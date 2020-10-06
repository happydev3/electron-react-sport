import React, { useState, useEffect} from "react"
import { Popover, OverlayTrigger, Modal } from 'react-bootstrap';

const { ipcRenderer } = window.require('electron');

const Settings = (props) => {

	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [positions, setPositions] = useState([]);
	const [minSalary, setMinSalary] = useState('');
	const [maxSalary, setMaxSalary] = useState('');
	const [maxPlayers, setMaxPlayers] = useState('');
	const [minTeams, setMinTeams] = useState('');
	const [noOpponent, setNoOpponent] = useState('');
	const [opponents, setOpponents] = useState(props.optimize.positions);
	const [initialProps, setInitialProps] = useState({...props.optimize});

	const handleName = (e) => {
		setName(e.target.value);
	}

	const handleMinSalary = (e) => {
		setMinSalary(e.target.value);
	}

	const handleMaxSalary = (e) => {
		setMaxSalary(e.target.value);
	}

	const handleMaxPlayers = (e) => {
		setMaxPlayers(e.target.value);
	}

	const handleMinTeams = (e) => {
		setMinTeams(e.target.value);
	}

	const handleNoOpponent = (e) => {
		setNoOpponent(e.target.value);
	}

	const pushNewPosition = () => {
		const newArray = positions.concat(['']);
		setPositions(newArray);
	}

	const handlePositions = (e, index) => {
		let shadowPositions= [...positions];
		let shadowOpponents = [...opponents];
		shadowPositions[index] = e.target.value;
		setPositions(shadowPositions);
	}

	const deletePosition = (e, index) => {
		let newArr = [...positions];
		newArr.splice(index, 1);
		setPositions(newArr);
		setOpponents(newArr);
	}

	const saveSetting = () => {
		if(name !== '' && maxSalary !== '') {
			let sql = {
				id: id,
				name: name,
				minSalary: minSalary,
				maxSalary: maxSalary,
				maxPlayers: maxPlayers,
				minTeams: minTeams,
				noOpponent: noOpponent,
				positions: positions
			}
			ipcRenderer.send('updateOptimizes', sql);
			ipcRenderer.on('responseUpdateOptimizes', (event, arg) => {
				if(arg === 'success') {
					props.handleClose(false);
					props.callback();
				}
			});
		}
	}

	useEffect(() => {
		setId(props.optimize.id || "")
		setName(props.optimize.name || "")
		setPositions(props.optimize.positions !== undefined ? props.optimize.positions : [])
		setMinSalary(props.optimize.minSalary || "")
		setMaxSalary(props.optimize.maxSalary || "")
		setMaxPlayers(props.optimize.maxPlayers || "")
		setMinTeams(props.optimize.minTeams || "")
		setNoOpponent(props.optimize.noOpponent || "")
		handleOpponents(props.optimize.positions || [])
		setInitialProps(props.optimize)
		return () => {
		}
	}, [props.optimize, props.optimize.positions])

	const handleOpponents = (positions) => {
		console.log('test', positions);
		let newArray = [];
		let sortArray = [];
		for (let i = 0; i < positions.length; i++) {
			const _position = positions[i].split(',');
			for(let j = 0; j < _position.length; j++) {
				if(!newArray.includes(_position[j])) {
					newArray.push(_position[j]);
				}
			}
		}
		sortArray = newArray;
		setOpponents(sortArray);
	}


	const compareValue = () => {
		if(
			initialProps.id === id &&
			initialProps.name === name &&
			initialProps.minSalary === minSalary &&
			initialProps.maxSalary === maxSalary &&
			initialProps.maxPlayers === maxPlayers &&
			initialProps.minTeams === minTeams &&
			initialProps.noOpponent === noOpponent &&
			JSON.stringify(initialProps.positions) === JSON.stringify(positions)
		) {
			return true;
		} else {
			return false
		}
	}
	
	return (
		<Modal size="lg" centered show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Settings</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="ui level padded">
					<button 
					type="button" 
					className="ui button primary i-left" 
					onClick={saveSetting} 
					disabled={
						name === '' || 
						maxSalary === '' || 
						maxSalary === 0 || 
						positions.length === 0 || 
						positions.includes('') || 
						compareValue() === true
					}
					>
						<i className="im im-floppy-disk" aria-hidden="true"></i>
						&nbsp; Save Settings
					</button>                           					
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
										<th>Optimizer Name 
											{
												name === '' && <span>Required</span>
											}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<input 
												className="name-optimizername" 
												type="text" 
												value={name} 
												placeholder="Enter Name..." 
												onChange={handleName}
											/>
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
											<input 
												className="rules-minsalary" 
												type="number" 
												value={minSalary} 
												onChange={handleMinSalary}
											/>
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
											{
												maxSalary === '' && <span>Required</span>
											}
											<input 
												className="rules-maxsalary" 
												type="number" 
												value={maxSalary} 
												onChange={handleMaxSalary}
											/>
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
											<input 
												className="rules-maxplayers" 
												type="number" 
												value={maxPlayers} 
												onChange={handleMaxPlayers}
											/>
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
											<input 
												className="rules-minteams" 
												type="number" 
												value={minTeams} 
												onChange={handleMinTeams}
											/>
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
											<select className="rules-noopponent" onChange={handleNoOpponent} value={noOpponent}>
												<option value="">None</option>
												{
													opponents.map((opponent, index) => {
														return (
															<option key={index} value={opponent}>{opponent}</option>
														)
													})
												}
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
										<th>Position 
											{
												positions.length === 0 && <span>At least 1 position required</span>
											}
										</th>
										<th className="right">Delete</th>
									</tr>
								</thead>
								<tbody>
									{
										positions.map((position, index) => {
											return (
												<tr key={index}>
													<td>
														<input 
															type="text" 
															value={position} 
															placeholder="Enter positions..." 
															onChange={(e) => handlePositions(e, index)}
														/>
													</td>
													<td className="right">
														<i className="ic-delete-1" aria-hidden="true" onClick={(e) => deletePosition(e, index)}></i>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
							
							<div className="ui level add-position">
								<button className="ui button primary i-left" type="button" onClick={pushNewPosition}>
									<i className="im im-plus-circle" aria-hidden="true"></i> 
									&nbsp;Add Position
								</button>
							</div>
						</div>						
					</div>							
				</div>						
			</Modal.Body>
		</Modal>
	)
}

export default Settings;

