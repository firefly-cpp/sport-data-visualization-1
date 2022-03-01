import auth from '../axios/auth';
import { chartOptions } from '../../utils/chart/chartOptions';

function ImportSportData(data, commit) {
    commit('SET_LOADING_TIME', true);
    auth.post('/reader/file', data)
    .then(response => {
        console.log(response)
        commit('SET_SPORT_DATA', response.data);
        commit('SET_CHART_OPTIONS', chartOptions)
        commit('SET_SUCCESS', true);
    })
    .catch((error) => {
        commit('SET_ERROR', true);
        console.log(error);
    })
    .finally(() => {
        commit('SET_LOADING_TIME', false)
    })
}

export {
    ImportSportData
}