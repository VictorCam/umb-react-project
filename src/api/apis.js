/* Handle edge cases with connection */

import {ErrHandleFn} from '../utils/utils'

const ENDPOINT = 'http://localhost:3001/api'

const getCodesApi = ErrHandleFn(async () => {
    let res = await fetch(`${ENDPOINT}/cptCodes`)
    if(!res.ok) throw new Error('Network error please try again later')
    let data = await res.json()
    if(!data) throw new Error('No data available')
    return data
})

const setCodesApi = ErrHandleFn(async(code, payload) => {
    let res = await fetch(`${ENDPOINT}/costs`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...payload, cptCodeId: parseInt(code, 10)}),
    })
    if(!res.ok) throw new Error('Network error please try again later')
    let data = await res.json()
    if(!data) throw new Error('No data available')
    return data
})

const getAvgApi = ErrHandleFn(async(code) => {
    let res = await fetch(`${ENDPOINT}/cptCodes/${code}/costs`)
    if(!res.ok) throw new Error('Network error please try again later')
    let data = await res.json()
    if(!data) throw new Error('No data available')
    return data
})
export {getCodesApi, setCodesApi, getAvgApi}