import {
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_ERROR,
    GET_OPTIMIZE
} from '../contants/ActionTypes';

const { ipcRenderer } = window.require('electron');

// export const getOptimize = (id, dispatch) => {
//     console.log('++++++++++++++++++' ,id, dispatch);
//     return (dispatch) => {
//         console.log('dispatch => ', dispatch);
//         dispatch({ type: FETCH_START });
//         ipcRenderer.send('getOptimizes', id);
// 		ipcRenderer.on('responseGetOptimizes', (event, arg) => {
//             console.log('++++++++++++++++++', arg);
//             dispatch({ type: FETCH_SUCCESS });
//             dispatch({ type: GET_OPTIMIZE, payload: arg[0] });
// 		});
//     }
// };
