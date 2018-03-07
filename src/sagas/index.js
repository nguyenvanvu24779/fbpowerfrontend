/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, takeEvery, all  } from 'redux-saga/effects'
import * as actions from '../actions'
import { api } from '../services'
const {settings , updateSettings, groups, deleteGroups,updateGroups, accountsfb ,openodes, addOpenode, deleteAccountsFB, addAccountsFB, schedulejob, refreshschedulejob, addContentShare, contentShare, updateContentShare, deleteContentShare, createStreamVideo, streamvideo,
    addHashtag,
    hashtag,
    grouphashtag,
    login,
    users,
    adduser
} = actions

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
export const fetchAccountsFB       = fetchEntity.bind(null, accountsfb ,api.fetchGetAccountsFB)
export const defaultSettings       = fetchEntity.bind(null, groups ,api.defaultSettings)
export const callDeleteGroup       = fetchEntity.bind(null, deleteGroups ,api.deleteGroup)
export const callAddAnswer       = fetchEntity.bind(null, updateGroups ,api.addAnswer)
export const callDeleteAccountsFB       = fetchEntity.bind(null,  deleteAccountsFB ,api.deleteAccountsFB)
export const callAddAccountsFB       = fetchEntity.bind(null,  addAccountsFB ,api.addAccountsFB)
export const fetchScheduleJob       = fetchEntity.bind(null,  schedulejob ,api.fetchScheduleJob)
export const callRefreshScheduleJob       = fetchEntity.bind(null,  refreshschedulejob ,api.refreshScheduleJob)
export const callAddContentShare      = fetchEntity.bind(null,  addContentShare ,api.addContentShare)
export const fetchGetContentShare     = fetchEntity.bind(null,  contentShare ,api.fetchGetContentShare)
export const callUpdateContentShare     = fetchEntity.bind(null,  updateContentShare ,api.updateContentShare)
export const callDeleteContentShare       = fetchEntity.bind(null, deleteContentShare ,api.deleteContentShare)
export const fetchOpenodes       = fetchEntity.bind(null, openodes ,api.fetchGetOpenodes)
export const callAddOpenode       = fetchEntity.bind(null,  addOpenode ,api.addOpenode)
export const callCreateStreamVideo       = fetchEntity.bind(null,  createStreamVideo ,api.createLiveStream);

export const fetchStreamVideo       = fetchEntity.bind(null,  streamvideo ,api.fetchGetStreamVideo);
export const callAddHashtag = fetchEntity.bind(null,  addHashtag ,api.callAddHashtag);
export const fetchGetHashtags = fetchEntity.bind(null,  hashtag ,api.fetchGetHashtags);
export const callAddGroupHashtag = fetchEntity.bind(null,  grouphashtag ,api.addGroupHashtag);
export const callRemoveGroupHashtag = fetchEntity.bind(null,  grouphashtag ,api.removeGroupHashtag);
export const callLogin = fetchEntity.bind(null,  login ,api.callLogin);
export const fetchGetUsers = fetchEntity.bind(null,  users ,api.fetchGetUsers);
export const callAddUser = fetchEntity.bind(null,  adduser ,api.callAddUser);







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

function* watchDeleteGroups(){
  while(true){
    const {data} = yield take(actions.DELETE_GROUPS)
    console.log('[sagas] watchDeleteGroups');
    yield call(callDeleteGroup, data)
    yield call(fetchGroups, {page : 1, per_page : 20, sortBy : 'createdAt'})
  }
  
}

function* watchDeleteContentShare(){
  while(true){
    const {data} = yield take(actions.DELETE_CONTENTSHARE)
    console.log('[sagas] watchDeleteContentShare');
    yield call(callDeleteContentShare, data)
    yield call(fetchGetContentShare, {page : 1, per_page : 20})
  }
  
}


function* watchAddAccountsFB(){
  while(true){
    const {data} = yield take(actions.ADD_ACCOUNTSFB)
    console.log('[sagas] watchAddAccountsFB');
    yield call(callAddAccountsFB, data)
  }
  
}



function* watchAddOpenode(){
  while(true){
    const {data} = yield take(actions.ADD_OPENODE)
    console.log('[sagas] watchAddOpenode');
    yield call(callAddOpenode, data)
    yield call(fetchOpenodes, {page : 1, per_page : 20})
  }
  
}
function* watchAddHashtag(){
  while(true){
    const {data} = yield take(actions.ADD_HASHTAG)
    console.log('[sagas] watchAddHashtag');
    yield call(callAddHashtag, data)
    yield fork(fetchGetHashtags)
  }
  
}


function* watchCreateStreamVideo(){
  while(true){
    const {data} = yield take(actions.CREATE_STREAMVIDEO)
    console.log('[sagas] watchCreateStreamVideo');
    yield call(callCreateStreamVideo, data)
  }
  
}


function* watchDeleteAccountsFB(){
  while(true){
    const {data} = yield take(actions.DELETE_ACCOUNTSFB)
    console.log('[sagas] watchDeleteAccountsFB');
    yield call(callDeleteAccountsFB, data)
    yield call(fetchAccountsFB, {page : 1, per_page : 20})
  }
  
}

function* watchRefreshAccountsFB(){
  while(true){
    const {data} = yield take(actions.REFRESH_ACCOUNTSFB)
    console.log('[sagas] watchRefreshAccountsFB');
    yield call(callDeleteAccountsFB, data)
    yield call(callAddAccountsFB, data)
    yield call(fetchAccountsFB, {page : 1, per_page : 20})
  }
  
}


function* callUpdateGroup(){
  while(true){
    const {data} = yield take(actions.UPDATE_GROUP)
    console.log('[sagas] callUpdateGroup');
    yield call(callAddAnswer, data)
  }
  
}

function* callDefaultSetting(){
  while(true){
    const {data} = yield take(actions.DEFAUL_SETTINGS)
    console.log('[sagas] callDefaultSetting');
    yield call(defaultSettings)
  }
  
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

function* watchGetHashtag() {
  console.log('[sagas] watchGetHashtag');
  while(true){
    const {data} = yield take(actions.LOAD_HASHTAG)
    yield fork(fetchGetHashtags, data)
  }
}

function* watchAddGroupHashtag() {
  console.log('[sagas] watchAddGroupHashtag');
  while(true){
    const {data} = yield take(actions.ADD_GROUPHASHTAG)
    yield fork(callAddGroupHashtag, data)
  }
}

function* watchRemoveGroupHashtag() {
  console.log('[sagas] watchRemoveGroupHashtag');
  while(true){
    const {data} = yield take(actions.REMOVE_GROUPHASHTAG)
    yield fork(callRemoveGroupHashtag, data)
  }
}

function* watchGetStreamVideo() {
  console.log('[sagas] watchGetStreamVideo');
  while(true){
    const {data} = yield take(actions.LOAD_STREAMVIDEO)
    yield fork(fetchStreamVideo, data)
  }
}

function* watchGetScheduleJob() {
  console.log('[sagas] watchGetScheduleJob');
  while(true){
    yield take(actions.LOAD_SCHEDULEJOB_PAGE)
    yield call(fetchScheduleJob)
  }
}

function* watchRefreshScheduleJob() {
  console.log('[sagas] watchRefreshScheduleJob');
  while(true){
   const {data} =  yield take(actions.REFRESH_SCHEDULEJOB_PAGE)
   console.log(data)
    yield call(callRefreshScheduleJob, data)
  }
}


function* watchGetGroups() {
  console.log('[sagas] callGetSettings');
  while(true){
    const {data} = yield take(actions.LOAD_GROUPS)
    yield fork(callGetGroups, data)
  }
}

function* watchGetAccountsFB() {
  console.log('[sagas] watchGetAccountsFB');
  while(true){
    const {data} = yield take(actions.LOAD_ACCOUNTSFB)
    console.log(data)
    yield fork(fetchAccountsFB, data)
  }
}

function* watchGetOpenodes() {
  console.log('[sagas] watchGetOpenodes');
  while(true){
    const {data} = yield take(actions.LOAD_OPENODES)
    console.log(data)
    yield fork(fetchOpenodes, data)
  }
}

function* watchCallAddContentShare() {
  console.log('[sagas] watchCallAddContentShare');
  while(true){
    const {data} = yield take(actions.ADD_CONTENTSHARE)
    yield fork(callAddContentShare, data)
  }
}

function* watchLoadContentShare() {
  console.log('[sagas] watchLoadContentShare');
  while(true){
    const {data} = yield take(actions.LOAD_CONTENTSHARE)
    yield fork(fetchGetContentShare, data)
  }
}

function* watchUpdateContentShare() {
  console.log('[sagas] watchLoadContentShare');
  while(true){
    const {data} = yield take(actions.UPDATE_CONTENTSHARE)
    yield fork(callUpdateContentShare, data)
  }
}

function* watchLoadUsers() {
  console.log('[sagas] watchLoadUsers');
  while(true){
    const {data} = yield take(actions.LOAD_USERS)
    yield fork(fetchGetUsers, data)
  }
}


function* watchAddUser() {
  console.log('[sagas] watchAddUser');
  while(true){
    const {data} = yield take(actions.ADD_USER)
    yield fork(callAddUser, data)
  }
}

function* watchLogin() {
  console.log('[sagas] watchLogin');
  while(true){
    const {data} = yield take(actions.CALL_LOGIN)
    yield fork(callLogin, data)
  }
}






export default function* root() {
  yield all([
    fork(watchAddGroup),
    fork(watchGetSettings),
    fork(watchUpdateSettings),
    fork(watchGetGroups),
    fork(callDefaultSetting),
    fork(watchDeleteGroups),
    fork(callUpdateGroup),
    fork(watchGetAccountsFB),
    fork(watchDeleteAccountsFB),
    fork(watchAddAccountsFB),
    fork(watchRefreshAccountsFB),
    fork(watchGetScheduleJob),
    fork(watchRefreshScheduleJob),
    fork(watchCallAddContentShare),
    fork(watchLoadContentShare),
    fork(watchUpdateContentShare),
    fork(watchDeleteContentShare),
    fork(watchGetOpenodes),
    fork(watchAddOpenode),
    fork(watchCreateStreamVideo),
    fork(watchGetStreamVideo),
    fork(watchAddHashtag),
    fork(watchGetHashtag),
    fork(watchAddGroupHashtag),
    fork(watchRemoveGroupHashtag),
    fork(watchLogin),
    fork(watchLoadUsers),
    fork(watchAddUser)
  ])
}