import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Preloader from './shared/Preloader';
import TopBar from './shared/TopBar';
import Settings from './optimizer/Settings';
import PlayerData from './optimizer/PlayerData';
import Projections from './optimizer/Projections';
import PlayerGrid from './optimizer/PlayerGrid';

// import { getOptimize } from '../actions/index';

const { ipcRenderer } = window.require('electron');


const Optimizer = (props) => {

	const [loading, setLoading] = useState(true);
	const [optimizerTabs, setOptimizerTabs] = useState(true);
	const [positionSort, setPositionSort] = useState(0);
	const [playerSort, setPlayerSort] = useState('MyPool')
	const [playerSortDropdown, setPlayerSortDropdown] = useState(false);
	const playerSortDropdownContainer = React.useRef();
	
	const [settings, setSettings] = useState(false);
	const [playerdata, setPlayerData] = useState(false);
	const [projections, setProjections] = useState(false);
	const [optimize, setOptimize] = useState({});
	const [optimizeId, setOptimizeID] = useState('');
	const [players, setPlayers] = useState([]);
	const [positions, setPositions] = useState();
	const handleCloseSettings = () => setSettings(false);
	const handleShowSettings = () => setSettings(true);	
	const handleClosePlayerData = () => setPlayerData(false);
	const handleShowPlayerData = () => setPlayerData(true);	
	const handleCloseProjections = () => setProjections(false);
	const handleShowProjections = () => setProjections(true);

	const getOptimize = (id) => {
		ipcRenderer.send('getOptimizes', id);
		ipcRenderer.on('responseGetOptimizes', (event, arg) => {
			setOptimize(arg[0]);
			setOptimizeID(arg[0].id);
			setPlayers(arg[0].players);
		});
	}

	const getID = () => {
		getOptimize(props.history.location.pathname.split('/').slice(-1)[0]);
	}
	
	useEffect(() => {

		console.log('optimize', optimize);

		const timer = setTimeout(() => {
			setLoading(false);
		}, 400);

		getID();

		return () => {
			clearTimeout(timer);
		}

	}, []);

	useEffect(() => {
		window.addEventListener('click', onClickOutside);
		return () => {
			window.removeEventListener('click', onClickOutside);
		}
	});

	const getSort = (positions) => {
		let newArray = [];
		let sortArray = [];
		if(positions && positions.length > 0) {
			for (let i = 0; i < positions.length; i++) {
				const _position = positions[i].split(',');
				for(let j = 0; j < _position.length; j++) {
					if(!newArray.includes(_position[j])) {
						newArray.push(_position[j]);
					}
				}
			}
			sortArray = newArray;
			return sortArray;
		}
	}
	
	const onClickOutside = (e) => {
		if(playerSortDropdown && !playerSortDropdownContainer.current.contains(e.target)) {
			setPlayerSortDropdown(false);
		}
	}

    const callback = () => {
		getID(props.history.location.pathname);
	}

	return ( 
		<div className="optimizer ui window">
			{
				loading
				?
				<Preloader />
				:
				<>			
					<TopBar />

					<div className="bottombar ui level">
						<div className="item"><span className="optimizer-name">{optimize.name}</span></div>
						
						<div className="item item-spacer"></div>
						
						<div className="item item-grouped list-group">
							<a className={`item playerstab ${optimizerTabs ? 'active' : ''}`} type="button" onClick={() => setOptimizerTabs(true)}>
								<i className="icimg icimg-playerpool" aria-hidden="true"></i> 
								<span>Players</span>
							</a>						
							<a className={`item lineupstab ${!optimizerTabs ? 'active' : ''}`} type="button" onClick={() => setOptimizerTabs(false)}>
								<i className="icimg icimg-lineups" aria-hidden="true"></i> 
								<span>Lineups</span>
							</a>	
						</div>
						
						<div className="item item-spacer"></div>
						{
							optimizerTabs
							?
							<div className="item item-grouped">
								<a className="item" type="button" onClick={handleShowSettings}><i className="icimg icimg-settings" aria-hidden="true"></i> Settings</a>
								<a className="item" type="button" onClick={handleShowProjections}><i className="icimg icimg-upload" aria-hidden="true"></i> Projections</a>
								<a className="item" type="button" onClick={handleShowPlayerData}><i className="icimg icimg-upload" aria-hidden="true"></i> Player Data</a>
							</div>
							:
							<div className="item item-grouped">
								<a className="item" type="button"><i className="icimg icimg-check" aria-hidden="true"></i> <span>All</span></a>
								<a className="item" type="button"><i className="icimg icimg-check" aria-hidden="true"></i> <span>None</span></a>						
								<a className="item" type="button"><i className="icimg icimg-export" aria-hidden="true"></i> <span>Export</span></a>
							</div>
						}			
					</div>
					
					<div className="window-content">
						<div className="pane">
							{
								optimizerTabs
								?
								<section className="pp-content content">
									<div className="playerpool-pane-group">
										<div className="playerpool-pane">		
										
											<div className="playerpool-sorts ui level margin">
												<div className="item">
													<div className="search ui input">
														<input type="text" placeholder="Search players..." readOnly/>
														<i className="search-icon im im-magnifier"></i>
														<button className="clear-search hidden" type="reset"><i className="im im-x-mark-circle-o" aria-hidden="true"></i></button>
													</div>
												</div>	
												
												<div className="item item-grouped">
													{
														optimize.positions && getSort(optimize.positions).map((position, index) => {
															return (
															<a key={index} className={`item ${positionSort === index ? 'active' : ''}`} type="button" onClick={() => setPositionSort(index)}>{position}</a>
															)
														})
													}
												</div>
												
												<div className="right">
													<div className="item item-grouped">
														<a className={`item ${playerSort === 'MyPool' ? 'active' : ''}`} type="button" onClick={() => setPlayerSort('MyPool')}>
															My Pool
															<span className="tag total_my_pool">0</span>
														</a>
														<a className={`item ${playerSort === 'Locked' ? 'active' : ''}`} type="button" onClick={() => setPlayerSort('Locked')}>
															Locked
															<span className="tag total_locked"><span className="locked-player-count">0</span> | <span className="locked-salary-total">0</span></span>
														</a>
														<a className={`item ${playerSort === 'Removed' ? 'active' : ''}`} type="button" onClick={() => setPlayerSort('Removed')}>
															Removed
															<span className="tag total_removed">0</span>
														</a>
														
														<div ref={playerSortDropdownContainer}>
															<a className="item sort-popover-trigger" type="button" onClick={() => setPlayerSortDropdown(!playerSortDropdown)}>
																<i className="im im-angle-down" aria-hidden="true"></i>
															</a>
															
															<div className="sort-popover dropdown-menu dropdown-menu-right" style={{display : `${playerSortDropdown ? 'block' : 'none'}`}}>
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
												{
													players !== 0
													?
													<PlayerGrid players={players} getID={getID} />
													:
													<div className="playerpool-nodata-overlay active">
														<div className="content">
															<button className="ui success button" type="button" onClick={handleShowPlayerData}>
																<i className="im im-cloud-upload" aria-hidden="true"></i> Player Data
															</button>
														</div>
													</div>
												}
											</div>
											
											<div className="playerpool-calc ui level margin">
												<div className="item">
												</div>
												
												<div className="right">
													<div className="item">
														<button className="ui button primary transparent" type="button">Add Player</button>
													</div>	
												</div>															
											</div>							
										</div>
									</div>
								</section>
								:
								<section className="lin-content content">
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
				</>
			}
			
			<Settings show={settings} handleClose={handleCloseSettings} optimize={optimize} callback={callback}/>
			<PlayerData show={playerdata} handleClose={handleClosePlayerData} players={players} optimizeId={optimizeId} getID={getID}/>
			<Projections show={projections} handleClose={handleCloseProjections}/>		
		</div>
	);
}

// const mapStateToProps = ({ common }) => {
// 	const { optimize } = common;
//     return { optimize };
// };

// const mapDispatchToProps = dispatch => ({
// 	getOptimize
// });


// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Optimizer));
export default Optimizer;