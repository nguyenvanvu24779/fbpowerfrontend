/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, takeEvery, all  } from 'redux-saga/effects'
import * as actions from '../actions'
import { api } from '../services'
const {settings , updateSettings, groups} = actions

/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass id to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  console.log("[fetchEntity] entity:",entity);
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, url || id)
  if(response)
    yield put( entity.success(response) )
  else
    yield put( entity.failure(error) )
}

// yeah! we can also bind Generators
export const fetchSettings       = fetchEntity.bind(null, settings ,api.fetchGetSettings)
export const callUpdateSettings       = fetchEntity.bind(null, updateSettings ,api.updateSettings)
export const fetchGroups       = fetchEntity.bind(null, groups ,api.fetchGetGroups)

function* callAddGroup(typeAdd, ids) {
  yield call(api.fetchAddGroup, typeAdd, ids)
}
// load user unless it is cached
function* watchAddGroup(login, requiredFields) {
  while(true){
    const {type , data} =  yield take(actions.ADD_GROUPS)
    yield fork(callAddGroup, data.typeAdd, data.ids)
  }
}

function* callGetSettings(){
  console.log('[sagas] callGetSettings');
  yield call(fetchSettings)
  
}

function* callGetGroups(data){
  console.log('[sagas] callGetGroups');
  yield call(fetchGroups, data)
  
}

function* watchUpdateSettings(){
  while(true){
    const {data} =  yield take(actions.UPDATE_SETTINGS)
    console.log('[sagas] callUpdateSettings');
    yield call(callUpdateSettings, data)
    yield call(fetchSettings) 
    
  }
}

function* watchGetSettings() {
  console.log('[sagas] callGetSettings');
  while(true){
    yield take(actions.LOAD_SETTINGS_PAGE)
    yield fork(callGetSettings, settings)
  }
}


function* watchGetGroups() {
  console.log('[sagas] callGetSettings');
  while(true){
    const {data} = yield take(actions.LOAD_GROUPS)
    yield fork(callGetGroups, data)
  }
}

export default function* root() {
  yield all([
    fork(watchAddGroup),
    fork(watchGetSettings),
    fork(watchUpdateSettings),
    fork(watchGetGroups)
  ])
}