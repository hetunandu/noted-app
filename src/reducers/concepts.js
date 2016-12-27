import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const conceptReader = createReducer({
	isFetching: false,
	errorMessage: '',
	reference: false,
	showAns: false,
	isReading: false,
	list: []
}, {
	[types.CONCEPT_LIST_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: '',
			result: [],
			list: []
		})
	},
	[types.CONCEPT_LIST_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			list: action.data.concepts
		})
	},
	[types.CONCEPT_LIST_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	},
	[types.CONCEPT_VIEW_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: '',
			list: [],
			result: []
		})
	},
	[types.CONCEPT_VIEW_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			list: [action.data.concept]
		})
	},
	[types.CONCEPT_VIEW_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	},
	[types.TOGGLE_REFERENCES](state, action){
		return Object.assign({}, state, {
			reference: !state.reference
		})
	},
	[types.READ_CONCEPT](state, action){
		return Object.assign({}, state, {
			isReading: action.reading
		})
	},
	[types.MARK_CONCEPT](state, action){
		return Object.assign({}, state, {
			list: state.list.filter((concept) => {
				if (concept.key == action.key){
					return false
				}else{
					return true
				}
			})
		})
	},
	[types.SHOW_ANSWER](state, action){
		return Object.assign({}, state, {
			showAns: action.showAns
		})
	}
});


export const result = createReducer({
	isFetching: false,
	errorMessage: '',
	data: [],
	points: 0
}, {
	[types.CONCEPT_LIST_SUCCESS](state, action){
		return Object.assign({}, state, {
			data: [],
			points: 0
		})
	},
	[types.CONCEPT_VIEW_SUCCESS](state, action){
		return Object.assign({}, state, {
			data: [],
			points: 0
		})
	},
	[types.MARK_CONCEPT](state, action){
		return Object.assign({}, state, {
			data: state.data.concat([{
				key: action.key,
				marked: action.marked
			}])
		})
	},
	[types.SUBMIT_RESULT_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[types.SUBMIT_RESULT_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			points: action.data.new_points
		})
	},
	[types.SUBMIT_RESULT_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}
});