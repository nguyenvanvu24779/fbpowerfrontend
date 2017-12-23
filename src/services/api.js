import { schema , arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const API_ROOT = 'http://45.117.171.237:1337/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, options) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;

      //const camelizedJson = camelizeKeys(json)
      //const nextPageUrl = getNextPageUrl(response)

      //return Object.assign({},
      //  normalize(camelizedJson, schema),
     //   { nextPageUrl }
     // )
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})
    )

}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr


// api services
export const fetchAddGroup = (typeAdd, ids) => {
  if(typeAdd == 1){
    callApi(`groups/addGroupsByVideoId?videoIds=${ids.join('|')}`, {})
  } else {
    callApi(`groups/addMulti?groupIds=${ids.join('|')}`, {})
  }
  
} 



export const fetchGetSettings = () =>{
  console.log('[api] fetchGetSettings')
  return callApi(`settings`, {})
} 

export const fetchGetGroups = (data) =>{
  console.log('[api] fetchGetGroups')
  return callApi(`groups/list?page=${data.page}&per_page=${data.per_page}` , {})
} 

export const fetchGetAccountsFB = (data) =>{
  console.log('[api] fetchGetAccountsFB')
  return callApi(`AccountsFB/list?page=${data.page}&per_page=${data.per_page}` , {})
} 


export const updateSettings = (data) =>{
  return callApi("settings/"+ data.id + "?value=" + data.value , {}, {method : 'PUT'})
} 

export const defaultSettings = () =>{
   callApi("settings/create?key=access_token&value={}" , {}, {method : 'GET'});
  return callApi("settings/create?key=account_global&value={}" , {}, {method : 'GET'});
} 

export const deleteGroup = (data) =>{
  return callApi("groups/" + data.id , {}, {method : 'DELETE'});
} 


export const deleteAccountsFB = (data) =>{
  return callApi("AccountsFB/" + data.id , {}, {method : 'DELETE'});
} 

export const addAccountsFB = (data) =>{
  return callApi("facebook/addAccountFb2DB", {}, {method : 'POST',body : JSON.stringify( { account : data.account, hashtag : data.hashtag } )});
} 


export const addAnswer = (data) =>{
  return callApi("groups/" + data.id  , {}, {method : 'POST', body :JSON.stringify({ answer : data.answer }) });
} 

export const fetchUser = login => callApi(`users/${login}`, {})
export const fetchRepo = fullName => callApi(`repos/${fullName}`, {})
export const fetchStarred = url => callApi(url, {})
export const fetchStargazers = url => callApi(url, {})
