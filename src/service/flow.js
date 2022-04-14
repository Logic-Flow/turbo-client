// import http from './http'
import { fetchData } from './http'
const baseUrl = '/logicFlow'

/**
 * 流程查询
 */
export const queryFlow = (data) => {
  const url = baseUrl + '/queryFlow'
  return fetchData(url, {
    method: 'post',
    data
  })
}

export const createFlow = (data) => {
  const url = baseUrl + '/createFlow'
  return fetchData(url, {
    method: 'post',
    data
  })
}

export const saveFlow = (data) => {
  const url = baseUrl + '/saveFlowModel'
  return fetchData(url, {
    method: 'post',
    data
  })
}

export const deployFlow = (data) => {
  const url = baseUrl + '/deployFlow'
  return fetchData(url, {
    method: 'post',
    data
  })
}

export const queryFlowList = (data) => {
  const url = baseUrl + '/queryFlowList'
  return fetchData(url, {
    method: 'post',
    data
  })
}
