<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

<g:evaluate var="jvar_now_GR" object="true">
   var rgutil = new RealGridUtils();
   var rgkey = rgutil.getRealGridKey();
   var gfields = rgutil.getFields();
   var glayouts = rgutil.getLayouts();
   var gcolumns = rgutil.getColumns();
   var incident = rgutil.getIncidentInfo();
<!-- gs.log("gfields length : " + gfields.length); -->
</g:evaluate>

<j:set var="jvar_gr_incident" value="${grIncident}"/>

<script type="text/javascript">
    var realGrid2Lic = "${rgkey}";
</script>


<script type="text/javascript">
    var data = JSON.parse("${JSON.stringify(incident)}");
</script>

<style>
    /* ----------------------------------------------- */
    /* align
    /* ----------------------------------------------- */
	.out#gridContainer {
	    width: 100%;
	    height: 80vh; /* 브라우저 창의 높이의 80%를 차지하도록 설정 */
	    min-width: 600px;
	    min-height: 400px;
	}
	
.form-row out{
	    width: 100%;
	    height: 80vh; /* 브라우저 창의 높이의 80%를 차지하도록 설정 */
	    min-width: 600px;
	    min-height: 400px;

}


    .ni-rg-align-left {
        text-align: left !important;
    }

    .ni-rg-align-right {
        text-align: right !important;
    }

    .ni-rg-align-center {
        text-align: center !important;
    }

  /* 마우스 호버 시 .rg-renderer.rg-image-renderer 내부의 img에 적용될 스타일 */
	.rg-renderer.rg-image-renderer img:hover {
		opacity: 0.5;
	}
	.rg-renderer.rg-icon-renderer.rg-icon-rightedge img:hover {
		opacity: 0.5;
	}

	.form-row {
		width:100%;
		margin:0 auto; 
		max-width:1200px;
		display: flex;
		flex-wrap: wrap;
		border: 0.5px solid grey;
		padding: 5px;
		border-radius: 7px;
	}
	
	.form-row2 {
		width:100%;
		margin:0 auto; 
		max-width:1200px;
		display: flex;
		flex-wrap: wrap;
		padding: 5px;
		border-radius: 7px;
	}

	.form-group {
		margin-right: 10px;
		margin-bottom: 10px;
		display: flex;
		align-items: left;
		width: 350px; 
		height:32px;
		align-self: baseline;
	}

	.out {
		max-width:1200px;
		margin:0 auto;
		margin-bottom : 10px;
    }

	.form-group label {
		width: 150px;
		text-align: right;
		margin-right: 10px;
		font-weight: bold;
		height:32px;
		line-height : 32px;

	}

	.form-group input {
		width: 200px;
		padding: 2px;
		border-radius: 5px;
		border: 1px solid #ccc;
		height:32px;
		line-height : 32px;

	}

	.rg-root {
		border: 0.5px solid grey !important;
		border-radius: 5px !important;
		max-width:1200px !important;
	}

	.toolbar {
	    display: flex; /* Flexbox 레이아웃 사용 */
	    justify-content: center; /* 가운데 정렬 */
	    align-items: center; /* 수직 중앙 정렬 */
	    height: 50px; /* toolbar의 높이 설정 */
	}
	
	#paging, #wrapper {
	    margin: 0 10px; /* 양쪽 마진으로 간격 조정 */
	    align-items: center; /* 수직 중앙 정렬 */
		
	}
	
	select#selBox, label[for="selBox"] {
	    font-size: 14px; /* 글자 크기 조정 */
	    padding: 5px; /* 패딩으로 내부 공간 조정 */
	    align-items: center; /* 수직 중앙 정렬 */

	}
	
	select#selBox {
	    min-width: 120px; /* 셀렉트 박스의 최소 너비 조정 */
	    cursor: pointer; /* 마우스 오버시 커서 변경 */
	    align-items: center; /* 수직 중앙 정렬 */
	}
	
	#paging a {
	    font-size: 20px; /* 페이지네이션 링크 글자 크기 조정 */
	    padding: 5px 10px; /* 페이지네이션 링크 패딩 조정 */
	    margin: 0 5px; /* 페이지네이션 링크 마진 조정 */
	    text-decoration: none; /* 텍스트 밑줄 제거 */
	    color: black; /* 글자 색상 */
	    align-items: center; /* 수직 중앙 정렬 */
	}

	.form-row2.out {

	}
	.orange-column{
	  background: #ff8b00;
	}

	//.high {background-color:#00D8FF; color:#feq;}

  .rg-data-cell.critical .rg-renderer {
  /* 여기에 원하는 스타일을 추가합니다 */
  background-color: #00D8FF; /* 배경색 변경 예시 */
  padding: 1px; /* 내부 여백 추가 예시 */
  border-radius: 4px; /* 모서리 둥글게 처리 예시 */
}
</style>

<link id="style-link" href="https://cdn.jsdelivr.net/gh/flowmt/sample/dist/realgrid-style.css" rel="stylesheet"/>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/flowmt/sample/dist/realgrid.2.7.2.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.min.js"></script>

<script type="text/javascript">
    window.addEventListener('DOMContentLoaded', function () {
        var gridView = new RealGrid.GridView('gridContainer');
        var dp = new RealGrid.LocalDataProvider(true);

        gridView.setDataSource(dp);

		const fields = JSON.parse("${JSON.stringify(gfields)}");
		const columns = JSON.parse("${JSON.stringify(gcolumns)}");
		const layouts = JSON.parse("${JSON.stringify(glayouts)}");
		columns[6].header.styleName = "orange-column"
		columns[6].styleCallback = function(grid, dataCell) {
		     var ret = {};
		 	//console.log(dataCell)
		     if(dataCell.value == '1 - Critical') {
		         ret.styleName = "critical";
		     }
			 else if(dataCell.value == '2 - High') {
		         ret.styleName = "high";
		     }

		     return ret;
		 };
		  columns[0].styleCallback = function(grid, dataCell) {
		     var ret = {};
		 	//console.log(dataCell)
		     if(dataCell.value == '1 - Critical') {
		         ret.styleName = "critical";
		     }
			 else if(dataCell.value == '2 - High') {
		         ret.styleName = "high";
		     }

		     return ret;
		 };
        // 데이터 설정
        dp.setFields(fields);
        gridView.setColumns(columns);

		var menu = [{label: "1 - Critical", tag: 1},{label: "2 - High", tag: 2},{label: "3 - Moderate", tag: 3},{label: "4 - Low", tag: 4},
    	{label: "5 - Planning", tag: 5}];

		gridView.addPopupMenu("menu1", menu);	
//		debugger


		gridView.onMenuItemClicked = function(grid, data, index) {
			
  			//alert(data.label);
			// 해당 요소를 가져옵니다.
			//var divElement = document.querySelector('.rg-renderer');
			var rgRendererElement = document.querySelector('[aria-activedescendant="rg-popup-menu1"] .rg-renderer');
			console.log(index)
			console.log(rgRendererElement)
			console.log(data.label)

			// 새로운 값으로 내용을 변경합니다.
			//rgRendererElement.textContent = data.label;

			gridView.setValue(index.dataRow, 'priority', data.label);
			gridView.commit();
			dp.setValue(index.dataRow, index.fieldIndex, data.label)
			//debugger
		};

        gridView.onCellButtonClicked = function (grid, index, column) {
            //alert("CellButton Clicked: itemIndex=" + index.itemIndex + ", " + column._value + ", fieldName=" + column.fieldName);
            //alert(dp.getValue(index.itemIndex, column.fieldName));
        };
		
		gridView.footers.visible = false;

		gridView.commitEditor();
	
		gridView.undoable = true;
		
		gridView.onCellClicked = function (grid, clickData) {
			//var sysid_par = dp.getValues(clickData.dataRow)[1];
			//var group_sysid_par = dp.getValues(clickData.dataRow)[11];
			//console.log(group_sysid_par)
			//if(clickData.fieldIndex == 12 ){
			//	//get_user_uipage(sysid_par, group_sysid_par);   //********
			//	openCustomListInModal()
			//}
			// var cellValue = grid.getValue(clickData.itemIndex, clickData.fieldName);
			// alert(cellvalue)
     		// if (cellValue.includes('workspace_search.png')) {
      	  	//alert('이미지 클릭됨!');
   	 		//}
			console.log(clickData)
			console.log(grid)
		}
		
		var container = document.querySelector('#gridContainer');
    	var image = container.querySelector('img[src="workspace_search.png"]');
    	if(image) {
    	    image.addEventListener('click', function() {
    	        alert("ㅗ");
    	    });
    	}
		
		gridView.columnByName("sys_id").visible =  false;
		gridView.columnByName("caller.sys_id").visible =  false;

        gridView.setColumnLayout(layouts);
        // for (const c of columns) {
        //     gridView.columnByName(c.name).autoFilter = true;
        // }
		gridView.columnByName('state').autoFilter = true;
        //gridView.fixedOptions.colCount = 1;

        const searchInputNumber = document.getElementById('searchInputNumber');
        const searchInputClassName = document.getElementById('searchInputClassName');
        const searchInputShortDesc = document.getElementById('searchInputShortDesc');
        const searchInputAssignmentName = document.getElementById('searchInputAssignmentName');
		const startDateInput = document.getElementById('startDate');
		const endDateInput = document.getElementById('endDate');

        const searchButton = document.getElementById('searchButton');

        searchButton.addEventListener('click', function () {
            const searchTermNumber = searchInputNumber.value.trim();
            const searchTermClassName = searchInputClassName.value.trim();
            const searchTermShortDesc = searchInputShortDesc.value.trim();
            const searchTermAssignmentName = searchInputAssignmentName.value.trim();
			const startDate = new Date(startDateInput.value);
			const endDate = new Date(endDateInput.value);

            let filteredData = data;
            
            if (searchTermNumber !== '') {
                filteredData = filteredData.filter(row => {
                                 if (row.number== '' || row.number== null) {
       				      return; // 공백인 경우 제외
   				 }
   				 return row.number.toLowerCase().includes(searchTermNumber.toLowerCase());
			});
            }

            if (searchTermClassName !== '') {
                filteredData = filteredData.filter(row => {
   				 if (row.channel== '' || row.channel == null) {
       				 return; // 공백인 경우 제외
   				 }
   				 return row.channel.toLowerCase().includes(searchTermClassName.toLowerCase());
			});

            }
            if (searchTermShortDesc !== '') {
                filteredData = filteredData.filter(row => {
   				 if (row.short_description== '' || row.short_description== null) {
       				 return; // 공백인 경우 제외
   				 }
   				 return row.short_description.toLowerCase().includes(searchTermShortDesc.toLowerCase());
				});
				
            }
            if (searchTermAssignmentName !== '') {
  
				filteredData = filteredData.filter(row => {
   				 if (row.assignment_groupName == '' || row.assignment_groupName == null) {
       				 return; // 공백인 경우 제외
   				 }
   				 return row.assignment_groupName.toLowerCase().includes(searchTermAssignmentName.toLowerCase());
				});
            }
        	if(startDateInput.value !=''){
				filteredData = filteredData.filter(row => {
					//debugger
    				const rowDate = new Date(row.opened); // row의 날짜 값
    				return rowDate >= startDate;
				});
				if(endDateInput.value !=''){
					filteredData = filteredData.filter(row => {
    				const rowDate = new Date(row.opened); // row의 날짜 값
    				return  endDate >= rowDate;
				});
				}	
            }	
            dp.setRows(filteredData);
        });


		gridView.onEditCommit = function (grid, index, oldValue, newValue) {
		     if (newValue === '') {
		         return false;
		     }
			 
			let selectedRows = gridView.getSelectedRows().length;
		
	 		var sysid_par = dp.getValues(gridView.getSelectedRows()[0])[1];
			var sysid_par_num = gridView.getSelectedRows();
			if(selectedRows == 1){
				console.log(sysid_par);
				console.log(sysid_par_num[0], index.fieldIndex)
				gridView.setValue(sysid_par_num[0], 'short_description', newValue);
				gridView.commit();
				dp.setValue(sysid_par_num[0], index.fieldIndex, newValue)
			}
			else{		
  	 			 var sysid_par_array = [];
			 	 for(var i = 0 ; selectedRows > i ;i++){
					console.log(sysid_par_num[i], index.fieldIndex)
					gridView.setValue(sysid_par_num[i], 'short_description', newValue);
					gridView.commit();
					dp.setValue(sysid_par_num[i], index.fieldIndex, newValue)
				 }

			}
		    

		}


		gridView.setContextMenu([
  		  {
  		    label: "Menu1",
  		    children: [{
  		       label: "submenu1 입니다."
  		    }, {
  		        label: "submenu2 입니다."
  		    }]
  		  },
  		  {
  		    label: "Menu2"
  		  },
  		  {
  		    label: "-" // menu separator를 삽입합니다.
  		  },
  		  {
  		    label: "ExcelExport"
  		  }
  		]);

		gridView.onShowTooltip = function(grid, index, value) {
		  var column = index.column;
		  var itemIndex = index.itemIndex;
		  
		  var tooltip = value;
		  //console.log("0000000000000000000000000")
		  //console.log(index)
		  //console.log(column)
		  //console.log(itemIndex)
		  //console.log(value)
		   if (column == "number") {
		     tooltip =
		       "이름: " +
		       value +
		       " 씨쓰아이띠: " +
		       grid.getValue(itemIndex, "sys_id") +
		       " 응한자:" +
		       grid.getValue(itemIndex, "opened")
		   }
		  return tooltip;
		};


		const oDownloadExcel = document.getElementById('downloadExcel');

		oDownloadExcel.addEventListener('click', function () {

            //var zip = new JSZip();
    		gridView.exportGrid({
    		type: "excel",
    		target: "local",
    		fileName: "gridExportSample.xlsx", 
    		showProgress: "true",
    		progressMessage: "엑셀 Export중입니다.",
    		indicator: "visible",
    		header: "visible",
    		footer: "visible",
    		compatibility: "MS Excel",
    		done: function () {  //내보내기 완료 후 실행되는 함수
    		    alert("done excel export")
    		}
    	});
	});



		const oFixCol = document.getElementById('fix-columns');
		const oFixColCan = document.getElementById('fix-columns-cancel');

		oFixCol.addEventListener('click', function () {
			gridView.setFixedOptions({
				colCount: 1
			});
		});

		oFixColCan.addEventListener('click', function () {
			gridView.setFixedOptions({
				colCount: 0
			});
		});

		const oFixRow = document.getElementById('fix-rows');
		const oFixRowCan = document.getElementById('fix-rows-cancel');

		oFixRow.addEventListener('click', function () {
			gridView.setFixedOptions({
				rowCount: 3
			});
		});

		oFixRowCan.addEventListener('click', function () {
			gridView.setFixedOptions({
				rowCount: 0
			});

			columns[6].newkeys = "새로운값"

			

			console.log(columns[6])

		});
		 


		const oData = document.getElementById('mc-show-data');

		oData.addEventListener('click', function () {
			
			var state_arr = []
			var sys_id_arr = []
			var newValues = []
			let rows = dp.getStateRows('updated');
			
			console.log(rows)
			for (var i = 0 ;  rows.length > i ;i++){
				console.log(dp.getValues(rows[i]))
				sys_id_arr.push(dp.getValues(rows[i])[1])
				newValues.push(dp.getValues(rows[i])[3])
				
			}
			console.log(sys_id_arr)
			console.log(newValues)
			var result = confirm("데이터 수정을 진행하시겠습니까");
			if(result){
				buttonMultiCellEdit(sys_id_arr, newValues,gridView)

			}else{
			    
			}

			//dataProvider.setRowState(curr.dataRow, rowState);
		});
		
		const refresh = document.getElementById('refreshButton');

		refresh.addEventListener('click', function () {
	        location.reload(); // 전체 페이지를 새로고침

		});

		dp.setRows(data);

		var totalData = dp.getRowCount();    // 총 데이터 수
		var dataPerPage = 15;    // 한 페이지에 나타낼 데이터 수
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
gridView.onCellItemClicked = function (grid, index, clickData) {
     console.log("ONCELLITEMCLICKED");
     console.log(clickData);
     console.log(grid);
     console.log(index);
	if(clickData.type == "icon"){
		var sysid_par = dp.getValues(clickData.dataRow)[1];
var group_sysid_par = dp.getValues(clickData.dataRow)[11];
console.log(group_sysid_par)
if(clickData.fieldIndex == 12 ){
	get_user_uipage(sysid_par, group_sysid_par);   //********
}
	}
     return true;
}
});
</script>
<body link="#0563C1" vlink="#954F72">

<div class="form-row out">
		<div class="form-group">
			<label style="width: 300px;"><h3>Incident Sample List</h3></label>
        </div>
		<div class="form-group" style=" width: 200px;">
        </div>
        <div class="form-group" style="width: 600px;" >
    		<button id="refreshButton" style="text-align: center; margin-left:50px;position: relative;height:32px; width:85px; cursor: pointer;">Refresh</button>
    		<button id="searchButton" style="text-align: center; margin-left:10px;position: relative;height:32px; width:85px; cursor: pointer;">Search</button>
			<button id="mc-show-data" style="text-align: center; margin-left:10px;position: relative;height:32px; width:85px; cursor: pointer;" sandbox="allow-scripts allow-modals">Save</button>
    		<button  id="fix-columns" style="text-align: center; margin-left:10px;position: relative;height:32px; width:150px; cursor: pointer;">왼쪽 열고정</button>
			<button  id="fix-columns-cancel" style="text-align: center; margin-left:10px;position: relative;height:32px; width:150px; cursor: pointer;">열고정 취소</button>
			<button  id="fix-rows" style="text-align: center; margin-left:10px;position: relative;height:32px; width:150px; cursor: pointer;">행고정</button>
			<button  id="fix-rows-cancel" style="text-align: center; margin-left:10px;position: relative;height:32px; width:150px; cursor: pointer;">행고정 취소</button>
			<button  id="downloadExcel" style="text-align: center; margin-left:10px;position: relative;height:32px; width:150px; cursor: pointer;">엑셀다운로드</button>
		</div>

        <div class="form-group">
            <label for="searchInputNumber">Number</label>
            <input id="searchInputNumber" type="text"/>
        </div>

        <div class="form-group">
            <label for="searchInputShortDesc">Short Description</label>
            <input id="searchInputShortDesc" type="text"/>
        </div>
        <div class="form-group">
        </div>
        <div class="form-group">
            <label for="searchInputClassName">Channel</label>
            <input id="searchInputClassName"/>
        </div>

        <div class="form-group">
            <label for="searchInputAssignmentName">Group Name</label>
            <input id="searchInputAssignmentName" type="text"/>
        </div>
		<div class="form-group">
			<label for="startDateInput">Opened Date</label>  
  			<input type="date" id="startDate" max="2024-02-29" min="2010-01-01" value="" placeholder="yyyy-mm-dd" style="width: 130px; margin-right:6px;"/>
        	<div>~</div>
  			<input type="date" id="endDate" max="2024-02-29" min="2010-01-01" value="" placeholder="yyyy-mm-dd" style="width: 130px; margin-left:6px;"/>
		</div>

</div>

<div class="out" id='gridContainer' ></div>

<div class="toolbar">
    <div
      id="paging"
	  
	></div>
    <div
      id="wrapper"
     
    >
      <select name="selBox" id="selBox"></select>
      <label for="selBox">Page</label>
    </div>
</div>

</body>



<script>
</script>
</j:jelly>
