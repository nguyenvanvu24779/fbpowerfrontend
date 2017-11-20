/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, takeEvery, all  } from 'redux-saga/effects'
export function* getAllProducts() {
  console.log("getAllProducts");
}


export default function* root() {
  yield all([
    fork(getAllProducts)
  ])
}