import React,{ useState, useEffect } from 'react';
import {AgGridReact, onGridReady} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';

const { ipcRenderer } = window.require('electron');

function onFirstDataRendered(params) {
	params.api.sizeColumnsToFit();
}

const PlayerGrid = (props) => {	

	const [rowData, setRowData] = useState([]);

	useEffect(() => {
		handleRowData(props.players);
		return () => {
			
		}
	}, [props.players]);

	function handleRowData(players) {
		let _newArray = [];
		for (let i = 0 ; i < players.length ; i++) {
			_newArray.push({
				addremove: players[i].id, 
				name: players[i].name, 
				position: players[i].position, 
				team: players[i].team, 
				opponent: players[i].opponent, 
				salary: players[i].salary, 
				fpts: players[i].fpts, 
				exposure: players[i].exposure, 
				id: players[i].id, 
				lock: players[i].id, 
				delete: players[i].id
			})
		}

		setRowData(_newArray);
	}

	const columnDefs = [
		{
			headerName: "", 
			field: "addremove", 
			width: 30, 
			headerCheckboxSelection: true,					
			checkboxSelection: true,
			suppressSizeToFit: true,
			editable: false,
			headerClass: 'actions th-addremove',
			cellClass: 'actions pp-addremove'
		},	
		{
			headerName: "Name", 
			field: "name", 
			width: 200, 
			suppressSizeToFit: true,
			headerClass: 'pp-player',
			cellClass: 'pp-player',
			cellRenderer: function(params) { return '<i class="im im-user-male"></i>' + params.value + '' }
		},	
		{
			headerName: "Pos", 
			field: "position",
			minWidth: 80,
			headerClass: 'pp-position',
			cellClass: 'pp-position'
		},
		{
			headerName: "Team", 
			field: "team",
			minWidth: 80,
			headerClass: 'pp-team',
			cellClass: 'pp-team'
		},
		{
			headerName: "Opp", 
			field: "opponent",
			minWidth: 80,
			headerClass: 'pp-opponent',
			cellClass: 'pp-opponent'
		},
		{
			headerName: "Salary", 
			field: "salary", 
			sort: 'desc',
			minWidth: 100,
			headerClass: 'pp-salary',
			cellClass: 'pp-salary',
			cellRenderer: function(params) { return '<i class="im im-coin"></i>' + params.value + '' }
		},	
		{
			headerName: "FPTS", 
			field: "fpts",
			minWidth: 80,
			headerClass: 'pp-fpts',
			cellClass: 'pp-fpts'
		},		
		{
			headerName: "Exp.", 
			field: "exposure",
			minWidth: 80,
			headerClass: 'pp-exposure',
			cellClass: 'pp-exposure',
			cellRenderer: function(params) { return '' + params.value + '%' }
		},	
		{
			headerName: "Id", 
			field: "id",
			minWidth: 50,
			headerClass: 'pp-nameid',
			cellClass: 'pp-nameid'
		},		
		{
			headerName: "Lock", 
			field: "lock", 
			width: 40, 
			suppressSizeToFit: true, 
			editable: false, 
			headerClass: 'actions',
			cellClass: 'actions pp-lock',
			cellRenderer: function(params) { return `<i class="ic-web"></i>` }
		},
		{
			eaderName: "Delete", 
			field: "delete", 
			width: 50, 
			suppressSizeToFit: true, 
			editable: false, 
			headerClass: 'actions',
			cellClass: 'actions pp-delete',
			cellRendererFramework: function(params) { return <i className="ic-delete-1" onClick={() => deleteRow(params.value)}></i>}
		}
	];

	function deleteRow(rowId) {
		ipcRenderer.invoke('deleteRow', rowId).then((result) => {
			console.log('row delete result', result);
			if(result) {
				props.getID();
			}
		})
	}
		

	return (
		<div className="players-table ag-theme-alpine">
			<AgGridReact				
				defaultColDef={{
					sortable: true,
					editable: true
				}}
				columnDefs={columnDefs}
				rowData={rowData}
				headerHeight={30}
				rowHeight={46}
				suppressRowClickSelection={true}
				rowSelection="multiple"	
				pagination={true}
				paginationPageSize="10"
				onFirstDataRendered={onFirstDataRendered}
				onGridReady={onGridReady}>
			</AgGridReact>
		</div>
	)
}

export default PlayerGrid;
