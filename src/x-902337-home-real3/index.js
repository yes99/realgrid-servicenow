import { createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import styles from './checklist.scss';
import checklistActions from './actions';
import rtlBehavior from '@servicenow/behavior-rtl';
import {columns, fields, layouts} from './realgrid-data';


createCustomElement('x-902337-home-real3', {
    renderer: { type: snabbdom },
    view,
    initialState: {
        provider : {},
		columns, 
		fields,
        layouts,
		rows : [],
        inputValue : '',
		myquery : ''
	},
    properties: {
		mytable: {
			default: 'incident'
		},
		myquery: {
			default: ''
		}
	},
    ...checklistActions,
    styles,
    behaviors: [rtlBehavior]
});