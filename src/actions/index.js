
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
export const OPENODES = createRequestTypes('OPENODES')
export const CREATESTREAMVIDEO = 'CREATESTREAMVIDEO'
export const CONTENTSHARE = createRequestTypes('CONTENTSHARE')
export const UPDATECONTENTSHARE = createRequestTypes('UPDATECONTENTSHARE')
export const SCHEDULEJOB = createRequestTypes('SCHEDULEJOB')
export const REFRESHSCHEDULEJOB = createRequestTypes('REFRESHSCHEDULEJOB')
export const ACCOUNTSFB = createRequestTypes('ACCOUNTSFB')
export const SETTINGS = createRequestTypes('SETTINGS')
export const UPDATESETTINGS = createRequestTypes('UPDATESETTINGS')
export const DELETEGROUPS = createRequestTypes('DELETEGROUPS')
export const DELETECONTENTSHARE = createRequestTypes('DELETECONTENTSHARE')
export const DELETEACCOUNTSFB = createRequestTypes('DELETEACCOUNTSFB')
export const ADDACCOUNTSFB = createRequestTypes('ADDACCOUNTSFB')
export const ADDCONTENTSHARE = createRequestTypes('ADDCONTENTSHARE')
export const UPDATEGROUPS = createRequestTypes('UPDATEGROUPS')
export const USER = createRequestTypes('USER')
export const REPO = createRequestTypes('REPO')
export const STARRED = createRequestTypes('STARRED')
export const STARGAZERS = createRequestTypes('STARGAZERS')
export const ADDOPENODE = createRequestTypes('ADDOPENODE')


export const ADD_GROUPS = 'ADD_GROUPS'
export const ADD_OPENODE = 'ADD_OPENODE'
export const CREATE_STREAMVIDEO = 'CREATE_STREAMVIDEO'
export const DELETE_GROUPS = 'DELETE_GROUPS'

export const DELETE_CONTENTSHARE = 'DELETE_CONTENTSHARE'
export const LOAD_GROUPS = 'LOAD_GROUPS'
export const LOAD_OPENODES = 'LOAD_OPENODES'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const LOAD_ACCOUNTSFB = 'LOAD_ACCOUNTSFB'
export const LOAD_CONTENTSHARE = 'LOAD_CONTENTSHARE'
export const DELETE_ACCOUNTSFB = 'DELETE_ACCOUNTSFB'
export const REFRESH_ACCOUNTSFB = 'REFRESH_ACCOUNTSFB'
export const ADD_ACCOUNTSFB = 'ADD_ACCOUNTSFB'
export const ADD_CONTENTSHARE = 'ADD_CONTENTSHARE'
export const LOAD_SETTINGS_PAGE = 'LOAD_SETTINGS_PAGE'
export const LOAD_SCHEDULEJOB_PAGE = 'LOAD_SCHEDULEJOB_PAGE'
export const REFRESH_SCHEDULEJOB_PAGE = 'REFRESH_SCHEDULEJOB_PAGE'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export const UPDATE_CONTENTSHARE = 'UPDATE_CONTENTSHARE'
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

export const openodes = {
  request: () => action(OPENODES[REQUEST]),
  success: (response) => action(OPENODES[SUCCESS], { response}),
  failure: (error) => action(OPENODES[FAILURE], {error}),
}

export const schedulejob = {
  request: () => action(SCHEDULEJOB[REQUEST]),
  success: (response) => action(SCHEDULEJOB[SUCCESS], { response}),
  failure: (error) => action(SCHEDULEJOB[FAILURE], {error}),
}

export const refreshschedulejob = {
  request: () => action(REFRESHSCHEDULEJOB[REQUEST]),
  success: (response) => action(REFRESHSCHEDULEJOB[SUCCESS], { response}),
  failure: (error) => action(REFRESHSCHEDULEJOB[FAILURE], {error}),
}


export const contentShare = {
  request: () => action(CONTENTSHARE[REQUEST]),
  success: (response) => action(CONTENTSHARE[SUCCESS], { response}),
  failure: (error) => action(CONTENTSHARE[FAILURE], {error}),
}
export const updateContentShare = {
  request: () => action(UPDATECONTENTSHARE[REQUEST]),
  success: (response) => action(UPDATECONTENTSHARE[SUCCESS], { response}),
  failure: (error) => action(UPDATECONTENTSHARE[FAILURE], {error}),
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


export const addOpenode = {
  request: () => action(ADDOPENODE[REQUEST]),
  success: (response) => action(ADDOPENODE[SUCCESS], { response}),
  failure: (error) => action(ADDOPENODE[FAILURE], {error}),
}


export const createStreamVideo = {
  request: () => action(CREATESTREAMVIDEO[REQUEST]),
  success: (response) => action(CREATESTREAMVIDEO[SUCCESS], { response}),
  failure: (error) => action(CREATESTREAMVIDEO[FAILURE], {error}),
}



export const addContentShare = {
  request: () => action(ADDCONTENTSHARE[REQUEST]),
  success: (response) => action(ADDCONTENTSHARE[SUCCESS], { response}),
  failure: (error) => action(ADDCONTENTSHARE[FAILURE], {error}),
}


export const deleteGroups = {
  request: () => action(DELETEGROUPS[REQUEST]),
  success: (response) => action(DELETEGROUPS[SUCCESS], { response}),
  failure: (error) => action(DELETEGROUPS[FAILURE], {error}),
}


export const deleteContentShare = {
  request: () => action(DELETECONTENTSHARE[REQUEST]),
  success: (response) => action(DELETECONTENTSHARE[SUCCESS], { response}),
  failure: (error) => action(DELETECONTENTSHARE[FAILURE], {error}),
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
export const callAddOpenode = data => action(ADD_OPENODE,{data} )
export const callCreateStreamVideo = data => action(CREATE_STREAMVIDEO,{data} )
export const deleteGroup = data => action(DELETE_GROUPS,{data} )
export const loadGroup = data => action(LOAD_GROUPS,{data} )
export const loadOpenodes = data => action(LOAD_OPENODES,{data} )
export const updateGroup = data => action(UPDATE_GROUP, {data})
export const loadAccountsFB = data => action(LOAD_ACCOUNTSFB,{data} )
export const callDeleteAccountsFB = data => action(DELETE_ACCOUNTSFB,{data} )
export const callRefreshAccountsFB = data => action(REFRESH_ACCOUNTSFB,{data} )
export const callAddAccountsFB = data => action(ADD_ACCOUNTSFB,{data} )
export const callAddContentShare = data => action(ADD_CONTENTSHARE,{data} )
export const loadSettingsPage = () => action(LOAD_SETTINGS_PAGE)
export const loadScheduleJobPage = () => action(LOAD_SCHEDULEJOB_PAGE)
export const callRefreshScheduleJobPage = data => action(REFRESH_SCHEDULEJOB_PAGE, {data})
export const defaultSettings = () => action(DEFAUL_SETTINGS)
export const callupdateSettings = (data) => action(UPDATE_SETTINGS, {data})
export const updateRouterState = state => action(UPDATE_ROUTER_STATE, {state})
export const navigate = pathname => action(NAVIGATE, {pathname})
export const loadUserPage = (login, requiredFields = []) => action(LOAD_USER_PAGE, {login, requiredFields})
export const loadRepoPage = (fullName, requiredFields = []) => action(LOAD_REPO_PAGE, {fullName, requiredFields})
export const loadMoreStarred = login => action(LOAD_MORE_STARRED, {login})
export const loadMoreStargazers = fullName => action(LOAD_MORE_STARGAZERS, {fullName})
export const loadContentShare = data => action(LOAD_CONTENTSHARE,{data} )
export const callUpdateContentShare = data => action(UPDATE_CONTENTSHARE,{data} )
export const callDeleteContentShare = data => action(DELETE_CONTENTSHARE,{data} )

export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
