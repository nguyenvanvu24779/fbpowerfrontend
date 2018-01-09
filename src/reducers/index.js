import * as ActionTypes from '../actions'
import merge from 'lodash/object/merge'
import paginate from './paginate'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {}, settings : {}}, action) {
  //if (action.response && action.response.entities) {
//    return merge({}, state, action.response.entities)
//  }
  if(action.type == "SETTINGS_SUCCESS" &&  action.response ){
      return merge({}, state, {settings : action.response })
  }
  if(action.type == "SCHEDULEJOB_SUCCESS" &&  action.response ){
      if( action.response &&  action.response.length  > 0){
        for (var i = action.response.length - 1; i >= 0; i--) {
          if((new Date(action.response[i].nextRunAt)).getFullYear() < 2017  || action.response[i].nextRunAt == null){
              action.response.splice(i, 1);
          }
        }
      }
        
      return merge({}, state, {schedulejob : action.response })
  }
  if(action.type == "GROUPS_SUCCESS" &&  action.response ){
      if(state) state.groups = {};
      return merge({}, state, {groups : action.response.data , meta : action.response.meta})
  }
  if(action.type == "ACCOUNTSFB_SUCCESS" &&  action.response ){
      if(state) state.accountsfb = {};
      return merge({}, state, {accountsfb : action.response.data , meta : action.response.meta})
  }
   if(action.type == "CONTENTSHARE_SUCCESS" &&  action.response ){
      if(state) state.contentShare = {};
      return merge({}, state, {contentShare : action.response.data , meta : action.response.meta})
  }
  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED.REQUEST,
      ActionTypes.STARRED.SUCCESS,
      ActionTypes.STARRED.FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS.REQUEST,
      ActionTypes.STARGAZERS.SUCCESS,
      ActionTypes.STARGAZERS.FAILURE
    ]
  })
})

function router(state = { pathname: '/' }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return action.state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  router
})

export default rootReducer
