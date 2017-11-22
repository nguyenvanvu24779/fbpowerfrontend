/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, takeEvery, all  } from 'redux-saga/effects'
import * as actions from '../actions'
import { api } from '../services'


function* callAddGroup(typeAdd, ids) {
  yield call(api.fetchAddGroup, typeAdd, ids)
}
// load user unless it is cached
function* watchAddGroup(login, requiredFields) {
  while(true){
    const {type , data} =  yield take(actions.ADD_GROUPS)
    console.log(type)
    console.log(data)
    yield fork(callAddGroup, data.typeAdd, data.ids)
  }
}

export default function* root() {
  yield all([
    fork(watchAddGroup)
  ])
}