import axios from 'axios';
import { BASE_URL, SEARH_ID, URL_TEMPERAMENT, SEARCH_NAME } from '../../utils/constants';
import { GET_BREEDS, GET_BREED_ID, GET_TEMPERAMENT, GET_BREED_NAME} from './types';


export const getBreeds = () => {
    return (dispatch) => {
        axios.get(BASE_URL)
        .then((breeds)=> {
            dispatch({
                type: GET_BREEDS,
                payload: breeds.data
            })
        })
    }
}

export const getBreedsName = (name) => {
    return (dispatch) => {
        axios.get(BASE_URL+"?name=" + name)
        .then((response)=> response.data)
        .then((breedsName)=> {
            dispatch({
                type: GET_BREED_NAME,
                payload: breedsName
            })
        })
        .catch((error)=>{
            if(error.response?.status){
                if(error.response.status === 404){
                    dispatch({
                        type: GET_BREED_NAME,
                        payload: null
                    })
                }
            }
            alert("Breaakk 🦴")
        })
    }
}

export const getTemperament =  () => {
    return (dispatch) => {
        axios.get(URL_TEMPERAMENT)
        .then((temperament)=> {
            dispatch({
                type: GET_TEMPERAMENT,
                payload: temperament.data
            })
        })
    }
}

export const getBreedId =  (idBreed) => {
    return (dispatch) => {
         axios.get(SEARH_ID + idBreed)
        .then((breedId)=>{
            dispatch({
                type: GET_BREED_ID,
                payload: breedId.data
            })
        })
        .catch((error)=>{
            if(error.response?.status){
                if(error.response.status === 404){
                    dispatch({
                        type: GET_BREED_ID,
                        payload: null
                    })
                }
            }
            alert("Breaakk 🦴")
        })
    }
}

export const clearBreed =  () => {
    return {type: GET_BREED_ID, payload: undefined}
}