<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
<g:evaluate var="jvar_now_GR" object="true">
   var now_GR = new GlideRecord("incident");
   now_GR.addQuery("active", true);
   now_GR.query();
   now_GR;
</g:evaluate>
<g:evaluate>
	var grIncident = new GlideRecord("incident");
	grIncident.addQuery("active", true);
	grIncident.query();
	var incident = [];
	var rowCount = grIncident.getRowCount();
	

	while (grIncident.next()) {
		incident.push({
			'number': grIncident.number.getValue(),
			'btn': grIncident.sys_id.getValue(),
			'sys_id': grIncident.sys_id.getValue(),
			'sys_class_name': grIncident.sys_class_name.getValue(),
			'short_description': grIncident.short_description.getValue(),
			'reopened_time':  grIncident.reopened_time.getValue(),
			'assignment_group': grIncident.assignment_group.getValue(),
			'assignment_group.name': grIncident.assignment_group.name.getValue(),
			'assignment_group.sys_id': grIncident.assignment_group.sys_id.getValue(),
			'assigned_to.name': grIncident.assigned_to.name.getValue(),
			'assigned_to.sys_id': grIncident.assigned_to.sys_id.getValue(), 
			'KorCountry' : "🔍︎",
			'imgage_test' : "10off.png" 
		});
		<!-- incident.push({'number': 'NONE', 'assignment_group.name': '*****'}); -->

	}
	gs.print('[incident]' + incident);
</g:evaluate>
<j:set var="jvar_gr_incident" value="${grIncident}"/>
<script  src="http://code.jquery.com/jquery-latest.min.js"></script>

  <script type="text/javascript">
    var realGrid2Lic = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYl7CwX6ItpP+xy/pIW0HghIJKTWpoOpNFnkmhX0fXje4w7n7/ElITcu5mG+2R8atxo='
  </script>
  <script type="text/javascript">
	var data = JSON.parse("${JSON.stringify(incident)}");
	//var data2 = ${incident};
  </script>

  <style>
	/* ----------------------------------------------- */
	/* align
	/* ----------------------------------------------- */

	.ni-rg-align-left     { text-align: left !important; }
	.ni-rg-align-right    { text-align: right !important; }
	.ni-rg-align-center   { text-align: center !important; }

  /* 마우스 호버 시 .rg-renderer.rg-image-renderer 내부의 img에 적용될 스타일 */
  .rg-renderer.rg-image-renderer img:hover {
    opacity: 0.5;
  }
.rg-renderer.rg-icon-renderer.rg-icon-rightedge img:hover {
	    opacity: 0.5;

}
  </style>

  <link id="style-link" href="https://cdn.jsdelivr.net/gh/flowmt/sample/dist/realgrid-style.css" rel="stylesheet"/>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/flowmt/sample/dist/realgrid.2.7.2.min.js"></script>
  <script type="text/javascript">
    window.addEventListener('DOMContentLoaded', function () {
		var gridView = new RealGrid.GridView('gridContainer');
		var dp = new RealGrid.LocalDataProvider();
	
		gridView.setDataSource(dp);
		//gridView.displayOptions.rowHeight = 200;
		const fields = [
			"number", 
			"btn",
			'sys_id', 
			'sys_class_name', 
			'short_description', 
			'reopened_time',
			"assignment_group.name", 
			"assignment_group", 
			"assignment_group.sys_id", 
			'assigned_to.name', 
			"assigned_to.sys_id",
    		"KorCountry",
			"imgage_test",
		];

		const columns = [
			{"name": "number", 					"fieldName": "number", 					 "width": 100, "header": {"text": "Number"},},
			{"name": "btn", "fieldName":"btn", 
			"button": "action",
			"width": 200, "header": {"text": "btn"},},
			{"name": "sys_id", 					"fieldName": "sys_id", 					 "width": 200, "header": {"text": "sys_id"},},
			{"name": "sys_class_name", 			"fieldName": "sys_class_name",  		 "width": 100, "header": {"text": "class Name"}, styleName: "ni-rg-align-left",},
			{"name": "short_description", 		"fieldName": "short_description", 		 "width": 300, "header": {"text": "Short Description"}, styleName: "ni-rg-align-left"},
			{"name": "reopened_time", 			"fieldName": "reopened_time", 			 "width": 120, "header": {"text": "reopened_time"},},
			{"name": "assignment_group", 		"fieldName": "assignment_group", 		 "width": 100, "header": {"text": "Sys_Id"},},
			{"name": "assignment_group.sys_id", "fieldName": "assignment_group.sys_id",   "width": 200, "header": {"text": "Sys_Id"},},
			{"name": "assignment_group.name", 	"fieldName": "assignment_group.name", "width": 100,     "header": {"text": "Name"}, styleName: "ni-rg-align-left",},
			{"name": "assigned_to.name", 		"fieldName": "assigned_to.name", 	"editable" : "false", "width": 100,
				"renderer" : {
					"type": "icon",
					"iconUrl" : "10off.png",
				    "iconHeight": 20,
       				"iconLocation": "rightEdge"
				},
			 "header": {"text": "Name"}, styleName: "ni-rg-align-left",},
  			{"name": "assigned_to.sys_id", 		"fieldName": "assigned_to.sys_id", 		 "width": 200, "header": {"text": "Sys_Id"},},

			{
    		  name: "KorCountry",
    		  fieldName: "KorCountry",
    		  width: "100",
    		  header: {
    		    text: " "
    		  },
    		  editable:false,
    		  renderer:{
    		      type:"button"
    		  }
    		},
			{ name : "imgage_test", fieldName :"imgage_test" , width :"20",   id :"aaa",   //readOnly :"true", editable :"false"
				renderer : {
					type: "image",
					imageHeight: 20,
					imageField : "imgage_test"
				}}
		]

		const layouts = [
			"number",
			"btn",
			"sys_id",
			"sys_class_name",
			"short_description",
			"reopened_time",
			{ name: 'l1_ag', header: { text: "할당그룹", }, expandable: true, expanded: false, 
				items: [
					{column: "assignment_group", groupShowMode: "expand"}, 
					{column: "assignment_group.sys_id", groupShowMode: "expand"}, 
					{column: "assignment_group.name", groupShowMode: "all"}, 
				]
			},
			{ name: 'l1_assigned_to', header: { text: "Assigned To", }, expandable: true, expanded: false, 
				items: [
					{column: "assigned_to.sys_id", groupShowMode: "expand"}, 
					{column: "assigned_to.name", groupShowMode: "all"}, 
				]
			},
			"KorCountry",
			"imgage_test",
		];

		dp.setFields(fields);
		gridView.setColumns(columns);
		gridView.footers.visible = false;

		gridView.commitEditor();

	gridView.onCellClicked = function (grid, clickData) {
		


		//console.log(clickData);
		//console.log(dp.getValues(clickData.dataRow))
		//console.log(dp.getValues(clickData.dataRow)[1])
		var sysid_par = dp.getValues(clickData.dataRow)[1];
		if(clickData.fieldIndex == 12 ||clickData.fieldIndex == 9){
			get_user_uipage(sysid_par);
			console.log(return_sysid)
		}
	}
		gridView.onImageButtonClicked = function (grid, itemIndex, column, buttonIndex, name) {
			alert("onImageButtonClicked: " + itemIndex + ", " + column.name+", " + buttonIndex + ", " + name);
		};

		gridView.onCellButtonClicked = function (grid, index, column) {
			alert("CellButton Clicked: itemIndex=" + index.itemIndex + ", "+ column._value +", fieldName=" + column.fieldName);

			alert(dp.getValue(index.itemIndex,column.fieldName));
		
		};

		gridView.setColumnLayout(layouts);
	

		dp.setRows(data);


// gridView.onCellEdited = function (grid, itemIndex, row, field) {
//      alert('Edit done! at ' + itemIndex + ', ' + field);
// 	let cells = dp.getUpdatedCells([1]);
// 	alert(cells)

// }

gridView.onEditCommit = function (grid, index, oldValue, newValue) {
		     if (newValue === '') {
		         return false;
		     }
			 
			let selectedRows = gridView.getSelectedRows().length;
			console.log(gridView.getSelectedRows())
			console.log(gridView.getSelectedRows()[0])
	 		//var sysid_par = dp.getValues(index.itemIndex)[1];
	 		var sysid_par = dp.getValues(gridView.getSelectedRows()[0])[1];
			var sysid_par_num = gridView.getSelectedRows();
			if(selectedRows == 1){
				 //alert(oldValue + 'was changed to ' + newValue);
			     console.log("============")
				 console.log(sysid_par);
				 cellEdit(sysid_par, newValue,gridView)
 				 gridView.displayOptions.refreshMode = 'ALL';

			}
			else{
				 alert("일단 여러개임")
  	 			 var sysid_par_array = [];
			     console.log("============")
				 console.log(sysid_par_array);
				 console.log(sysid_par_num);
			 	 for(var i = 0 ; selectedRows > i ;i++){
					//sysid_par_array.push(sysid_par_num[i][1])
					//console.log(dp.getValues(sysid_par_num[i])[1] )
					sysid_par_array.push(dp.getValues(sysid_par_num[i])[1])

				 }
			 	 

				 multiCellEdit(sysid_par_array, newValue, gridView)
				 gridView.displayOptions.refreshMode = 'ALL';

			}
		    

		}

// gridView.onEditRowChanged = function (grid, itemIndex, dataRow, field, oldValue, newValue) {
//     let v = grid.getValue(itemIndex, field);
// 	var sysid_par = dp.getValues(itemIndex)[1];
// 	console.log("********")
// 	console.log(v) 
// 	console.log("onEditRowChanged, " + field + ": " + oldValue + " => " + newValue);
// 	cellEdit(sysid_par, newValue)
// };
/////////////////////////////
console.log("fffffffffffffff")
console.log(dp.getRowCount())
var totalData = dp.getRowCount();    // 총 데이터 수
var dataPerPage = 10;    // 한 페이지에 나타낼 데이터 수
var pageCount = 3;        // 한 화면에 나타낼 페이지 수
setPageSelbox(totalData, dataPerPage, gridView, dp);
gridView.setPaging(true, dataPerPage);
paging(totalData, dataPerPage, pageCount, 1, gridView, dp);



function setPageSelbox(totalData, dataPerPage,gridView,dp) {
    //alert("setPageSelbox");
    var totalPage = Math.ceil(totalData / dataPerPage); // 총 페이지 수

    var selBox = document.getElementById('selBox'); // jQuery 대신 순수 JavaScript 사용
    for (var i = 1; totalPage >= i; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        selBox.appendChild(opt);
    }

    selBox.addEventListener('change', function() {
		//alert("this.value")
		//alert(this.value)
        var totalData = dp.getRowCount(); // 총 데이터 수
        var dataPerPage = 8; // 한 페이지에 나타낼 데이터 수
        var pageCount = 3; // 한 화면에 나타낼 페이지 수
        var selectedPage = this.value;

        gridView.setPage(selectedPage - 1);
        paging(totalData, dataPerPage, pageCount, selectedPage,gridView);
    });
}


	});


  </script>

<body link="#0563C1" vlink="#954F72">
<img src="topic-list-search.svg"/>
<img src="10off.png" width="17" height="17"/>
<img src="search_icon.png" width="13" height="13"/>

<div class="search-toggle-wrapper"><now-button-iconic icon="magnifying-glass-fill" now-id="k7lt56dzx2h-556" component-id="k7lt56dzx2h-556" dir="ltr"></now-button-iconic>
<now-button-iconic icon="magnifying-glass-fill" now-id="k7lt56dzx2h-556" component-id="k7lt56dzx2h-556" dir="ltr">
<button type="button" role="button" class="now-button-iconic -tertiary -md is-bare" aria-label="Open activity search bar" aria-expanded="false" aria-controls="sn_as_searchbar_toggle_section" data-tooltip="Open activity search bar" data-ariadescribedby="Open activity search bar"><now-icon class="now-button-iconic-icon" icon="magnifying-glass-fill" aria-hidden="true" now-id="k7lt56dzx2h-593" component-id="k7lt56dzx2h-593" dir="ltr">
<svg class="now-icon -md" aria-hidden="true" viewBox="0 0 16 16"><path d="M10.727 10.02a5.5 5.5 0 1 0-.707.707l4.127 4.127a.5.5 0 1 0 .707-.707l-4.127-4.127zM11 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"></path></svg></now-icon></button></now-button-iconic></div>


<h2> TEST : Call html code </h2>
<div class="toolbar">
    <div
      id="paging"
      style="float: left; height: 100%; padding-top: 20px;"
    ></div>
    <div
      id="wrapper"
      style="
        float: left;
        height: 100%;
        padding-left: 20px;
        padding-top: 20px;
      "
    >
      <select name="selBox" id="selBox"></select>
      <label for="selBox">Page</label>
    </div>
    </div>
<div id='gridContainer' style="width:100%; min-width:600px; height: 500px; min-height:400px"/>

</body>


<script>
</script>
</j:jelly>