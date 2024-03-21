import '@servicenow/now-button';
import '@servicenow/now-loader';

export default (state, {dispatch, updateProperties}) => {
	const ENTER_KEY_CODE = 13;
	const inputValue = '';
	const GRID_DATA_SEARCHED = 'GRID_DATA_SEARCHED';
	const SOME_THING = 'SOME_THING';


	
	return (
		<main className="now-checklist">
		<script>var realGrid2Lic = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYl7CwX6ItpP+xy/pIW0HghIJKTWpoOpNFnkmhX0fXje4w7n7/ElITcu5mG+2R8atxo='</script>
			<div><input
				placeholder="What needs to be done?"
				autoFocus
				value={inputValue}
				on-keypress={({keyCode, target: {value}}) => {
					const inputValue = value.trim();
					if (keyCode === ENTER_KEY_CODE && inputValue) {
						dispatch(GRID_DATA_SEARCHED, {inputValue});
					}
				}}/></div>
			<div><button>click me</button></div>
			<div id='realgrid'></div>

			


			<now-button
    id="button1"
    label="Fire Event 1"
    variant="secondary"
    size="md"
    icon="fire-fill"
    configAria={{ "button": { "aria-label": "Fire Event 1" } }}
    tooltipContent="Fire an event"
	on-click= {()=> dispatch('SOME_THING', {param:'test'})}
></now-button>

<now-button
    id="button2"
    label="Fire Event 2"
    variant="secondary"
    size="md"
    icon="fire-fill"
    configAria={{ "button": { "aria-label": "Fire Event 2" } }}
    tooltipContent="Fire another event"
	on-click= {()=> dispatch('SOME_THING', {param:'save'})}

></now-button>


		</main>

		
	);
};
//var realGrid2Lic = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiHqyYT2U1Yh3Dufv8SUhNy4cHDDEc2etng==';ddd

//<script>var realGrid2Lic = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYl7CwX6ItpP+1nkO6QZ3yCAJKTWpoOpNFnkmhX0fXje4w7n7/ElITcuG9J4R7ssMRE='</script>
//var realGrid2Lic = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYl7CwX6ItpP++bUn16KUuDYPGjmXkNrgkO9y6iqz39NL2bv3IdPQpJ8UK2/tsl9QqU=';

// local 개발용 <script>var realGrid2Lic = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiHqyYT2U1Yh3Dufv8SUhNy4cHDDEc2etng=='</script>

// 배포용 <script>var realGrid2Lic = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYl7CwX6ItpP+xy/pIW0HghIJKTWpoOpNFnkmhX0fXje4w7n7/ElITcu5mG+2R8atxo='</script>
