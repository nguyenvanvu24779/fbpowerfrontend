
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const GROUPS = createRequestTypes('GROUPS')
export const SCHEDULEJOB = createRequestTypes('SCHEDULEJOB')
export const ACCOUNTSFB = createRequestTypes('ACCOUNTSFB')
export const SETTINGS = createRequestTypes('SETTINGS')
export const UPDATESETTINGS = createRequestTypes('UPDATESETTINGS')
export const DELETEGROUPS = createRequestTypes('DELETEGROUPS')
export const DELETEACCOUNTSFB = createRequestTypes('DELETEACCOUNTSFB')
export const ADDACCOUNTSFB = createRequestTypes('ADDACCOUNTSFB')
export const UPDATEGROUPS = createRequestTypes('UPDATEGROUPS')
export const USER = createRequestTypes('USER')
export const REPO = createRequestTypes('REPO')
export const STARRED = createRequestTypes('STARRED')
export const STARGAZERS = createRequestTypes('STARGAZERS')

export const ADD_GROUPS = 'ADD_GROUPS'
export const DELETE_GROUPS = 'DELETE_GROUPS'
export const LOAD_GROUPS = 'LOAD_GROUPS'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const LOAD_ACCOUNTSFB = 'LOAD_ACCOUNTSFB'
export const DELETE_ACCOUNTSFB = 'DELETE_ACCOUNTSFB'
export const REFRESH_ACCOUNTSFB = 'REFRESH_ACCOUNTSFB'
export const ADD_ACCOUNTSFB = 'ADD_ACCOUNTSFB'
export const LOAD_SETTINGS_PAGE = 'LOAD_SETTINGS_PAGE'
export const LOAD_SCHEDULEJOB_PAGE = 'LOAD_SCHEDULEJOB_PAGE'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'
export const DEFAUL_SETTINGS = 'DEFAUL_SETTINGS'
export const NAVIGATE =  'NAVIGATE'
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE'
export const LOAD_REPO_PAGE = 'LOAD_REPO_PAGE'
export const LOAD_MORE_STARRED = 'LOAD_MORE_STARRED'
export const LOAD_MORE_STARGAZERS = 'LOAD_MORE_STARGAZERS'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'


function action(type, payload = {}) {
  return {type, ...payload}
}


export const settings = {
  request: () => action(SETTINGS[REQUEST]),
  success: (response) => action(SETTINGS[SUCCESS], { response}),
  failure: (error) => action(SETTINGS[FAILURE], {error}),
}

export const schedulejob = {
  request: () => action(SCHEDULEJOB[REQUEST]),
  success: (response) => action(SCHEDULEJOB[SUCCESS], { response}),
  failure: (error) => action(SCHEDULEJOB[FAILURE], {error}),
}



export const groups = {
  request: () => action(GROUPS[REQUEST]),
  success: (response) => action(GROUPS[SUCCESS], { response}),
  failure: (error) => action(GROUPS[FAILURE], {error}),
}

export const accountsfb = {
  request: () => action(ACCOUNTSFB[REQUEST]),
  success: (response) => action(ACCOUNTSFB[SUCCESS], { response}),
  failure: (error) => action(ACCOUNTSFB[FAILURE], {error}),
}
export const deleteAccountsFB = {
  request: () => action(DELETEACCOUNTSFB[REQUEST]),
  success: (response) => action(DELETEACCOUNTSFB[SUCCESS], { response}),
  failure: (error) => action(DELETEACCOUNTSFB[FAILURE], {error}),
}


export const addAccountsFB = {
  request: () => action(ADDACCOUNTSFB[REQUEST]),
  success: (response) => action(ADDACCOUNTSFB[SUCCESS], { response}),
  failure: (error) => action(ADDACCOUNTSFB[FAILURE], {error}),
}


export const deleteGroups = {
  request: () => action(DELETEGROUPS[REQUEST]),
  success: (response) => action(DELETEGROUPS[SUCCESS], { response}),
  failure: (error) => action(DELETEGROUPS[FAILURE], {error}),
}

export const updateGroups = {
  request: () => action(UPDATEGROUPS[REQUEST]),
  success: (response) => action(UPDATEGROUPS[SUCCESS], { response}),
  failure: (error) => action(UPDATEGROUPS[FAILURE], {error}),
}


export const updateSettings = {
  request: () => action(UPDATESETTINGS[REQUEST]),
  success: (response) => action(UPDATESETTINGS[SUCCESS], { response}),
  failure: (error) => action(UPDATESETTINGS[FAILURE], {error}),
}

export const user = {
  request: login => action(USER[REQUEST], {login}),
  success: (login, response) => action(USER[SUCCESS], {login, response}),
  failure: (login, error) => action(USER[FAILURE], {login, error}),
}

export const repo = {
  request: fullName => action(REPO[REQUEST], {fullName}),
  success: (fullName, response) => action(REPO[SUCCESS], {fullName, response}),
  failure: (fullName, error) => action(REPO[FAILURE], {fullName, error}),
}

export const starred = {
  request: login => action(STARRED[REQUEST], {login}),
  success: (login, response) => action(STARRED[SUCCESS], {login, response}),
  failure: (login, error) => action(STARRED[FAILURE], {login, error}),
}

export const stargazers = {
  request: fullName => action(STARGAZERS[REQUEST], {fullName}),
  success: (fullName, response) => action(STARGAZERS[SUCCESS], {fullName, response}),
  failure: (fullName, error) => action(STARGAZERS[FAILURE], {fullName, error}),
}

export const addGroup = data => action(ADD_GROUPS,{data} )
export const deleteGroup = data => action(DELETE_GROUPS,{data} )
export const loadGroup = data => action(LOAD_GROUPS,{data} )
export const updateGroup = data => action(UPDATE_GROUP, {data})
export const loadAccountsFB = data => action(LOAD_ACCOUNTSFB,{data} )
export const callDeleteAccountsFB = data => action(DELETE_ACCOUNTSFB,{data} )
export const callRefreshAccountsFB = data => action(REFRESH_ACCOUNTSFB,{data} )
export const callAddAccountsFB = data => action(ADD_ACCOUNTSFB,{data} )
export const loadSettingsPage = () => action(LOAD_SETTINGS_PAGE)
export const loadScheduleJobPage = () => action(LOAD_SCHEDULEJOB_PAGE)
export const defaultSettings = () => action(DEFAUL_SETTINGS)
export const callupdateSettings = (data) => action(UPDATE_SETTINGS, {data})
export const updateRouterState = state => action(UPDATE_ROUTER_STATE, {state})
export const navigate = pathname => action(NAVIGATE, {pathname})
export const loadUserPage = (login, requiredFields = []) => action(LOAD_USER_PAGE, {login, requiredFields})
export const loadRepoPage = (fullName, requiredFields = []) => action(LOAD_REPO_PAGE, {fullName, requiredFields})
export const loadMoreStarred = login => action(LOAD_MORE_STARRED, {login})
export const loadMoreStargazers = fullName => action(LOAD_MORE_STARGAZERS, {fullName})

export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
