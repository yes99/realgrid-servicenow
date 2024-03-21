import {actionTypes} from '@servicenow/ui-core';
import RealGrid, {GridView, LocalDataProvider} from 'realgrid'
import {createHttpEffect} from '@servicenow/ui-effect-http';
import '@servicenow/now-button';
import {getHttpEffect} from './getHttpEffect';

const GRID_DATA_REQUESTED = 'GRID_DATA_REQUESTED';
const FETCH_ITEM_SUCCEEDED = 'FETCH_ITEM_SUCCEEDED';
const FETCH_ITEM_FAILED = 'FETCH_ITEM_FAILED';

const REAL_LOAD_PR = 'REAL_LOAD_PR';
const REAL_ITEM_REQUESTED = 'REAL_ITEM_REQUESTED';

const GRID_DATA_SEARCHED = 'GRID_DATA_SEARCHED';
const SEARCH_ITEM_REQUESTED = 'SEARCH_ITEM_REQUESTED';
const FETCH_ITEM_SEARCHED = 'FETCH_ITEM_SEARCHED';
const REAL_LOAD_SEARCHED = 'REAL_LOAD_SEARCHED';
const EVENT_DEMO = 'EVENT_DEMO';  
const HEAD_QUATER = 'HEAD_QUATER';  
const SOME_THING = 'SOME_THING'; 
const MODIFY_ITEM_SUCCEEDED = 'MODIFY_ITEM_SUCCEEDED';  
const MODIFY_ITEM_REQUESTED ='MODIFY_ITEM_REQUESTED'
const UPDATE_ITEM_REQUESTED = 'UPDATE_ITEM_REQUESTED'
// window.popUpUserList = (sysid_par, group_sysid_par, {dispatch}) => {
// 	dispatch('EVENT_DEMO');
// 	debugger
//     // var myQuery;

//     // if (group_sysid_par == null) {
//     //     myQuery = 'group.sys_idSTARTSWITH';
//     // } else {
//     //     myQuery = 'group.sys_idSTARTSWITH' + group_sysid_par;
//     // }
//     // var gm = new GlideModal("glide_info_user_grid", true, 400);
//     // gm.setTitle("Group User List");
//     // gm.setPreference("title", "Test body text");
//     // gm.setPreference("parm_inc", sysid_par);
//     // gm.setPreference("parm_group", myQuery);
//     // gm.setPreference("onPromptComplete", function(data) {
//     //     alert("You clicked on 'Ok'" + data);
//     // });
//     // gm.render();
// }

window.firstBtnClicked = (itemIndex) => {
	console.log(itemIndex)
}

export default {
	actionHandlers: {
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({dispatch, properties}) => {

			const {mytable, myquery} = properties;
			//property 의 값을 쓸 수 있다.

			dispatch(GRID_DATA_REQUESTED,{
				table: mytable,
				sysparm_display_value: 'all'
			});
		},
		[actionTypes.COMPONENT_PROPERTY_CHANGED]: ({dispatch, properties}) => {

			const {mytable, myquery} = properties;
			//property 의 값을 쓸 수 있다.
			dispatch(GRID_DATA_SEARCHED, {myquery})
		},
		[GRID_DATA_REQUESTED]: createHttpEffect('/api/now/table/:table', {
			method: 'GET',
			pathParams: ['table'],
			queryParams: ['sysparm_display_value'],
			successActionType: FETCH_ITEM_SUCCEEDED,
			errorActionType: FETCH_ITEM_FAILED
		}),
		[FETCH_ITEM_FAILED]: () => {
			debugger
		},
		[FETCH_ITEM_SUCCEEDED]: ({action, updateState, dispatch}) => {
			const {
				payload: {result = []}
			} = action;
			console.log("Result:", result);
			debugger
			updateState({
				path: 'rows',
				operation: 'set',
				value: result.map(item => ({
					number: item.number.display_value,
					sys_id: item.sys_id.value,
					opened: item.opened_at.display_value,
					short_description: item.short_description.display_value,
					caller_name: item.caller_id.display_value,
					caller_sys_id: item.caller_id.value,
					priority: item.priority.display_value,
					state: item.state.display_value,
					category: item.category.display_value,
					channel: item.contact_type.display_value,
					assignment_group_sys_id: item.assignment_group.value,
					assignment_group_name: item.assignment_group.display_value,
					assigned_to_name: item.assigned_to.display_value,
					assigned_to_sys_id: item.assigned_to.value
				}))
			});
			dispatch(REAL_LOAD_PR);
		},		
		[REAL_LOAD_PR] : ({action, updateState, dispatch, host}) => {
			updateState({
				path: 'provider',
				operation: 'set',
				value: new LocalDataProvider(true)
			});
			dispatch(REAL_ITEM_REQUESTED);
		},
		[REAL_ITEM_REQUESTED]:{
			effect({state, host, dispatch}){
				RealGrid.setSlotMode(true);
				const container = host.shadowRoot.querySelector("#realgrid");
				const grid = new GridView(container);
				const provider = state.provider;
				const fields = state.fields;
				const columns = state.columns;
				const rows = state.rows;
				const layouts = state.layouts;

				grid.setDataSource(provider);
				provider.setFields(fields);
				grid.setColumns(columns);
				grid.setColumnLayout(layouts);
				
				var options = grid.getDisplayOptions();
				console.log(options);

				// grid.onCellItemClicked = function (grid, index, clickData) {
				// 	alert(clickData.value + " 버튼이 클릭 되었습니다.")
				// 	return true;
				// }

				var menu = [{label: "1 - Critical", tag: 1},{label: "2 - High", tag: 2},{label: "3 - Moderate", tag: 3},{label: "4 - Low", tag: 4},
				{label: "5 - Planning", tag: 5}];

				grid.addPopupMenu("menu1", menu);

				grid.onMenuItemClicked = function(grid, data, index) {	  
					//alert(data.label)
					// grid.setValue(index.dataRow, 'priority', data.label);
					// grid.commit();
					// grid.setValue(index.dataRow, index.fieldIndex, data.label);
					// debugger
			  	};
				grid.onCellDblClicked = function (grid, clickData) {
				//alert("onCellDblClicked: " + JSON.stringify(clickData));
				}
				grid.onCellClicked = function (grid, clickData) {
					var sysid_par = provider.getValues(clickData.dataRow)[1];
					var group_sysid_par = provider.getValues(clickData.dataRow)[10];
					var dataRow_par = clickData.itemIndex;
					debugger
					console.log(clickData)
					console.log(group_sysid_par)
					if(clickData.fieldIndex == 12 ){
						dispatch('EVENT_DEMO');
					//	popUpUserList(dataRow_par, group_sysid_par);
					}
				}
				provider.setRows(rows);

				
				grid.onEditCommit = function (grid_par, index, oldValue, newValue) {
					if (newValue === '') {
						return false;
					}
					
				   let selectedRows = grid.getSelectedRows().length;
			   
					var sysid_par = provider.getValues(grid.getSelectedRows()[0])[1];
				   var sysid_par_num = grid.getSelectedRows();
				   if(selectedRows == 1){
					   console.log(sysid_par);
					   console.log(sysid_par_num[0], index.fieldIndex)
					   grid.setValue(sysid_par_num[0], 'short_description', newValue);
					   grid.commit();
					   provider.setValue(sysid_par_num[0], index.fieldIndex, newValue)
				   }
				   else{		
						   var sysid_par_array = [];
						 for(var i = 0 ; selectedRows > i ;i++){
						   console.log(sysid_par_num[i], index.fieldIndex)
						   grid.setValue(sysid_par_num[i], 'short_description', newValue);
						   grid.commit();
						   provider.setValue(sysid_par_num[i], index.fieldIndex, newValue)
						}
	   
				   }
				   
	   
			   }
				// var dataPerPage = 8; // 한 페이지에 나타낼 데이터 수
				// grid.setPaging(true, dataPerPage);
				// debugger				
			}
		},
		[GRID_DATA_SEARCHED]: ({action, updateState, dispatch, state}) => {
			const {
				payload: {myquery}
			} = action;
			updateState({myquery: ''});
			dispatch(SEARCH_ITEM_REQUESTED, {
				sysparm_fields: 'sys_id,opened_at,short_description,caller_id,priority,state,category,contact_type,assignment_group,active,assigned_to,number',
				sysparm_query: `${myquery}`,
				sysparm_display_value: 'all'
			});
		},
		[SEARCH_ITEM_REQUESTED]: createHttpEffect('/api/now/table/incident', {
			queryParams: ['sysparm_fields', 'sysparm_query', 'sysparm_display_value'],
			errorActionType: FETCH_ITEM_FAILED,
			successActionType: FETCH_ITEM_SEARCHED
		}),
		[FETCH_ITEM_SEARCHED]: ({action, updateState, dispatch}) => {
			const {
				payload: {result = []}
			} = action;
			console.log("Result:", result);
			debugger
			updateState({
				path: 'rows',
				operation: 'set',				
				value: result.map(item => ({
					number: item.number.display_value,
					sys_id: item.sys_id.value,
					opened: item.opened_at.display_value,
					short_description: item.short_description.display_value,
					caller_name: item.caller_id.display_value,
					caller_sys_id: item.caller_id.value,
					priority: item.priority.display_value,
					state: item.state.display_value,
					category: item.category.display_value,
					channel: item.contact_type.display_value,
					assignment_group_sys_id: item.assignment_group.value,
					assignment_group_name: item.assignment_group.display_value,
					assigned_to_name: item.assigned_to.display_value,
					assigned_to_sys_id: item.assigned_to.value
				}))
			});
			dispatch(REAL_LOAD_SEARCHED);
		},
		[REAL_LOAD_SEARCHED]:{
			effect({state, host}){
				const provider = state.provider;
				const rows = state.rows;
				provider.setRows(rows);
			}
		},
		[EVENT_DEMO]: () => {
			console.log("Result:", result);
			debugger
		},	
		[SOME_THING]: ({dispatch, action, state}) =>{
			const provider = state.provider;
			console.log("팀장님이랑 있어서 행복해요 우리는 너무너무 냐하핳하하");
			console.log({value : action.payload.param});
			if(action.payload.param == 'save'){
				console.log("아따 찌바브거, 시작하자wwwwwwwwwwwwww")
				//var dp = new RealGrid.LocalDataProvider(true);
				//console.log(dp)

				var state_arr = []
				var sys_id_arr = []
				var newValues = []
				let rows = provider.getStateRows('updated');
				console.log(rows)
				for (var i = 0 ;  rows.length > i ;i++){
					console.log(provider.getValues(rows[i]))
					sys_id_arr.push(provider.getValues(rows[i])[1])
					newValues.push(provider.getValues(rows[i])[3])
				}
				console.log(sys_id_arr)
				console.log(newValues)
				var result = confirm("데이터 수정을 진행하시겠습니까");
				if(result){
					for( i= 0 ; i < sys_id_arr.length ; i++){
						console.log("ㅗㅑ")
						dispatch(MODIFY_ITEM_REQUESTED, {sys_id : sys_id_arr[i], short_description : newValues[i]});
					}
				}else{
				
				}
			}
		} ,
		// [MODIFY_ITEM_REQUESTED]: ({action, updateState, dispatch}) => {
		// 	const {
		// 		payload: {result = []}
		// 	} = action;
		// 	console.log("back in black")
		// 	console.log("MOCDIFY:", action);
		// 	debugger
		// 	updateState({
		// 		path: 'rows',
		// 		operation: 'set',
		// 		value: result.map(item => ({
		// 			number: item.number.display_value,
		// 			sys_id: item.sys_id.value,
		// 			opened: item.opened_at.display_value,
		// 			short_description: item.short_description.display_value,
		// 			caller_name: item.caller_id.display_value,
		// 			caller_sys_id: item.caller_id.value,
		// 			priority: item.priority.display_value,
		// 			state: item.state.display_value,
		// 			category: item.category.display_value,
		// 			channel: item.contact_type.display_value,
		// 			assignment_group_sys_id: item.assignment_group.value,
		// 			assignment_group_name: item.assignment_group.display_value,
		// 			assigned_to_name: item.assigned_to.display_value,
		// 			assigned_to_sys_id: item.assigned_to.value
		// 		}))
		// 	});
		// 	dispatch(REAL_LOAD_PR);
		// },		

		[MODIFY_ITEM_REQUESTED]: ({action, updateState, state, dispatch}) => {
			const {payload} = action;
			console.log("업데이트를 하고 싶다고요")
			console.log(action)
			console.log(payload)
			console.log(state)
			console.log(state.items)
			console.log(updateState)
			
			
			// updateState({
			// 	row: state.row.map(row_single =>
			// 		row_single.sys_id === payload.sys_id
			// 			? {
			// 				...row_single,
			// 				...action.payload
			// 			  }
			// 			: {...row_single}
			// 	),				
			// });


			// updateState({
			// 	items: state.items.map(item =>
			// 		item.itemId === payload.itemId
			// 			? {
			// 				...item,
			// 				...action.payload
			// 			  }
			// 			: {...item}
			// 	),				
			// });


			console.log("무슨일이 있던거지")
			console.log(action)
			console.log(payload)
			console.log(state)
			console.log(state.items)
			console.log(updateState)
			dispatch(UPDATE_ITEM_REQUESTED, {
				data: {...payload},
				id: payload.sys_id
			});

		},
		[UPDATE_ITEM_REQUESTED]: createHttpEffect('/api/now/table/incident/:id', {
			method: 'PUT',
			dataParam: 'data',
			pathParams: 'id'
		}),


		'NOW_BUTTON#CLICKED': ({action, dispatch }) => {
			console.log(action);
			console.log('firing EVENT_FIRED');
			dispatch('EVENT_DEMO');
		}
	}
}