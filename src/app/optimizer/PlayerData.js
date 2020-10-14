import React, { useState, useEffect } from "react";
import { Modal, Spinner } from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";
import CSVReader from 'react-csv-reader';

const { ipcRenderer } = window.require('electron');

const csvData = [
	["Name","Pos","Team","Opp","Salary","FPTS","Exp","PlayerID"]
];

const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(/\W/g, '_')
}

const PlayerData = (props) => {

	const [uploadData, setUploadDate] = useState([]);
	const [loading, setLoading] = useState(false);

	function csvUpload(data, fileInfo) {
		console.log('data', data);
		setUploadDate(data);
	}

	function handleDarkSideForce() {

	}

	function handleDarkSideForce() {

	}

	function submitData(e, uploadData) {

		setLoading(true);
		
		console.log('upload data', uploadData, props.optimizeId);
		let submitValue = {
			uploadData: uploadData,
			optimizeId: props.optimizeId
		}
		ipcRenderer.invoke('submitCSV', submitValue).then((result) => {
			if(result) {
				console.log('result', result);
				setLoading(false);
				props.getID();
				props.handleClose();
			}
		});
	}

	
	function deleteCurrentData() {
		ipcRenderer.invoke('deleteCurrentData', props.optimizeId).then((result) => {
			if(result) {
				props.getID();
				props.handleClose();
			}
			console.log('result', result);
		});
	}

	useEffect(() => {
		console.log(props);
		console.log('#data', uploadData);
		return () => {
			
		};
	}, [props.show])

	return (
		<Modal centered show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
			<Modal.Header closeButton={!loading}>
				<Modal.Title>Player Data</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="playerdata-container">
					<ul>
						<li><span>1.</span> <CSVLink data={csvData} filename={"template.csv"}>Download .csv template</CSVLink></li>
						<li><span>2.</span> Add player data to .csv template</li>
						<li><span>3.</span> Save .csv template and upload here</li>
					</ul>
					
					<form>											
						<div className="ui form">
							<div className="field upload-csv-file">
								<CSVReader 
									cssClass="csv-reader-input"
									label="UPLOAD CSV TEMPLATE"
									onError={handleDarkSideForce}
									parserOptions={papaparseOptions}
									inputId="ObiWan"
									inputStyle={{color: 'red'}}
									onFileLoaded={(data, fileInfo) => csvUpload(data, fileInfo)} 
								/>
							</div>
							
							<button 
								className="ui button primary" 
								type="button" 
								disabled={uploadData.length === 0 || loading} 
								onClick={(e) => submitData(e, uploadData)}
							>
								 {
									 loading
									 ?
									 'Uploading...'
									 :
									 <>
										<i className="im im-plus-circle" aria-hidden="true"></i>
								  		&nbsp;Submit Data
									 </>
								 }
							</button>
							<button 
								className="ui button danger transparent" 
								type="button" 
								disabled={props.players.length === 0}
								onClick={deleteCurrentData}
							>
								 Remove Current Data
							</button>
						</div>	
					</form>					
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PlayerData;

