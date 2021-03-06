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

const API_ROOT = 'http://159.65.131.200:1337/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, options) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  if(options == undefined){
    options = {  credentials: 'include'}
  } else{
    options.credentials = 'include';
  }
  return fetch(fullUrl, options)
    .then(response => {
      console.log(response);
      if(!response.ok)
        return Promise.reject(response.status);
      return  response.json().then(json => ({ json, response }))
    }).then(({ json, response }) => {
      console.log(response)
      if (response.status == 403) {
        return Promise.resolve(response.status)
      }
      
      if (!response.ok) {
        console.log(response)
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
      error => {
        console.log(error);
        if(error == 403){
          return {error: 403}
        }
        return {error: 'Something bad happened'}
        
      }
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


export const callAddHashtag = (data) => {
  return callApi(`hashtag/create?hashtag=${data.hashtag}`, {})
} 

export const callLogin = (data) => {
  return callApi('auth/local', {}, {method : 'POST', body :JSON.stringify({ identifier : data.identifier, password : data.password }) })
} 



export const fetchGetSettings = () =>{
  console.log('[api] fetchGetSettings')
  return callApi(`settings`, {})
} 
export const fetchGetUsers = (data) =>{
  console.log('[api] fetchGetUsers')
  return callApi(`users/list?page=${data.page}&per_page=${data.per_page}&sortBy=${data.sortBy}` , {})
} 

export const callAddUser = (data) => {
  return callApi('users/register', {}, {method : 'POST', body :JSON.stringify({ email : data.email, password : data.password }) })
} 


export const fetchGetHashtags = () =>{
  console.log('[api] fetchGetHashtags')
  return callApi(`hashtag/list?page=1&per_page=1000`, {})
} 

export const fetchScheduleJob = () =>{
  console.log('[api] fetchScheduleJob')
  return callApi(`ScheduleJob`, {})
} 

export const refreshScheduleJob = (data) =>{
  console.log('[api] refreshScheduleJob')
  return callApi(`ScheduleJob/refreshJob?jobName=` + data.jobName, {})
} 

export const fetchGetGroups = (data) =>{
  console.log('[api] fetchGetGroups')
  return callApi(`groups/list?page=${data.page}&per_page=${data.per_page}&sortBy=${data.sortBy}` , {})
} 

export const fetchGetStreamVideo = (data) =>{
  console.log('[api] fetchGetStreamVideo')
  return callApi(`streamvideo/list?page=${data.page}&per_page=${data.per_page}&sortBy=${data.sortBy}` , {})
} 

export const fetchGetOpenodes = (data) =>{
  console.log('[api] fetchGetOpenodes')
  return callApi(`openode/list?page=${data.page}&per_page=${data.per_page}` , {})
} 



export const fetchGetAccountsFB = (data) =>{
  console.log('[api] fetchGetAccountsFB')
  return callApi(`AccountsFB/list?page=${data.page}&per_page=${data.per_page}` , {})
} 

export const fetchGetContentShare = (data) =>{
  console.log('[api] fetchGetContentShare')
  return callApi(`ContentShare/list?page=${data.page}&per_page=${data.per_page}` , {})
} 


export const updateContentShare = (data) =>{
  return callApi("ContentShare/"+ data.id + "?content=" + data.content , {}, {method : 'PUT'})
} 

export const updateSettings = (data) =>{
  return callApi("settings/"+ data.id + "?value=" + data.value , {}, {method : 'PUT'})
} 

export const addGroupHashtag = (data) =>{
  return callApi("groups/addGroupHashtag?groupId="+ data.groupId + "&hashtagId=" + data.hashtagId , {}, {method : 'GET'})
} 
export const removeGroupHashtag = (data) =>{
  return callApi("groups/removeGroupHashtag?groupId="+ data.groupId + "&hashtagId=" + data.hashtagId , {}, {method : 'GET'})
} 

export const defaultSettings = () =>{
  callApi("settings/create?key=access_token&value={}" , {}, {method : 'GET'});
  callApi("settings/create?key=groupMemberRequire&value=2000" , {}, {method : 'GET'});
  callApi("settings/create?key=sharePerAccount&value=1:3" , {}, {method : 'GET'});
  callApi("settings/create?key=accountsPerOpenode&value=7" , {}, {method : 'GET'});
  callApi("settings/create?key=sharePerGroup&value=1:1" , {}, {method : 'GET'});
  callApi("settings/create?key=timeShareLimit&value=[30,60,90,120]" , {}, {method : 'GET'});
  callApi("settings/create?key=sharesAmount&value=[50,100,150,200,250]" , {}, {method : 'GET'});
  callApi("settings/create?key=maxGroupPerAccount&value=200" , {}, {method : 'GET'});
  callApi("settings/create?key=timeJoinGroupPerAccount&value=[1,1]" , {}, {method : 'GET'});
  callApi("settings/create?key=maxAccountSysPerGroup&value=10" , {}, {method : 'GET'});
  return callApi("settings/create?key=account_global&value={}", {}, {method : 'GET'});
} 

export const deleteGroup = (data) =>{
  return callApi("groups/" + data.id , {}, {method : 'DELETE'});
} 


export const deleteContentShare = (data) =>{
  return callApi("ContentShare/" + data.id , {}, {method : 'DELETE'});
} 


export const deleteAccountsFB = (data) =>{
  return callApi("AccountsFB/" + data.id , {}, {method : 'DELETE'});
} 

export const addOpenode = (data) =>{
  return callApi("openode/addOpenode?siteUrl=" + data.siteUrl, {}, {method : 'GET'});
} 

export const createLiveStream = (data) =>{
  return callApi("StreamVideo/createLiveStream?sharesAmount=" + data.sharesAmount + "&timeShareLimit=" + data.timeShareLimit + "&url=" + data.url + '&note=' + data.note, {}, {method : 'GET'});
} 


export const addAccountsFB = (data) =>{
  return callApi("facebook/addAccountFb2DB", {}, {method : 'POST',body : JSON.stringify( { account : data.account, hashtag : data.hashtag } )});
} 


export const addAnswer = (data) =>{
  return callApi("groups/" + data.id  , {}, {method : 'POST', body :JSON.stringify({ answer : data.answer }) });
} 

export const addContentShare = (data) =>{
  return callApi("contentshare/addMulti"   , {}, {method : 'POST', body :JSON.stringify({ contents : data.contents }) });
} 

export const fetchUser = login => callApi(`users/${login}`, {})
export const fetchRepo = fullName => callApi(`repos/${fullName}`, {})
export const fetchStarred = url => callApi(url, {})
export const fetchStargazers = url => callApi(url, {})
