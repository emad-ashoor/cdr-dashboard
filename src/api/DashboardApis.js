import { ApiCaller } from './ApiBase';

// system dashboard
const model = 'CallDetails';

// read all info in dashboard
function getAll(fromDate, toDate) {
    return ApiCaller.get(
        `/${model}/search/${fromDate}/${toDate}`
    );
}

// read single info for top of dashboard
function getSingleStats(fromDate, toDate) {
    return ApiCaller.get(
        `/${model}/singleStats/${fromDate}/${toDate}`
    );
}

// read number of calls (mobile or phone call)
function readDistributedCalls(fromDate, toDate) {
    return ApiCaller.get(
        `/${model}/distributedCalls/${fromDate}/${toDate}`
    );
}

function readOperatorsOutputPerformance(fromDate, toDate) {
    return ApiCaller.get(
        `/${model}/operatorsOutputStats/${fromDate}/${toDate}`
    );
}

function readOperatorsInputPerformance(fromDate, toDate) {
    return ApiCaller.get(
        `/${model}/operatorsInputStats/${fromDate}/${toDate}`
    );
}

export {
    getAll,
    getSingleStats,
    readDistributedCalls,
    readOperatorsOutputPerformance,
    readOperatorsInputPerformance,
}