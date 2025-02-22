import { addCharts } from '../../functions/charts/addCharts';
import { removeEmptyMetrics } from '../../functions/tables/integralMetrics/removeEmptyMetrics';
import { AddMultipleRequests, AddTopographicRequest } from '../axios/multipleAxios';
import axios from 'axios';
import { setWithExpiry } from '../localstorage/localstorage';
import { ChangePositions } from '../positions/changePositions';

function ImportSportData(data, commit) {
    commit('SET_LOADING_TIME', true);

    commit('SET_WEATHER_DATA', []);

    axios.all(AddMultipleRequests(data))
    .then(responses => {
        console.log(responses)

        console.log(responses[0].data)
        
        setWithExpiry('raw_sport_data', responses[0].data, 1000*60*60*24);
        setWithExpiry('raw_integral_sport_data', responses[1].data, 1000*60*60*24);

        commit('SET_SPORT_DATA', ChangePositions(responses[0].data));
        commit('SET_CHART_OPTIONS', addCharts(responses[0].data))
        commit('SET_INTEGRAL_SPORT_DATA', removeEmptyMetrics(responses[1].data));
        commit('SET_SUCCESS', true);

        AddTopographicRequest(JSON.stringify(responses[0].data));
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