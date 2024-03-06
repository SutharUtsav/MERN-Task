import axios from "axios";
import { EnvConfig } from "../config/env-config";
const FormData = require("form-data");

/**
 * Method to call GET request api
 * @param endpoint
 */
export const get = async (endpoint) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${EnvConfig.LOCAL_URL}${EnvConfig.LOCAL_SUBURL}${endpoint}`,
    headers: {},
  };

  return await axios.request(config);
};


/**
 * Method to call GET request api with id
 * @param endpoint
 * @param id
 */
export const getByQueryParams = async (endpoint, params) => {
  if(Object.keys(params).length === 0 ){
    return null;
  }

  const url = `${EnvConfig.LOCAL_URL}${EnvConfig.LOCAL_SUBURL}${endpoint}?${Object.keys(params).map((key)=> encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&')}`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${EnvConfig.LOCAL_URL}${EnvConfig.LOCAL_SUBURL}${endpoint}?${Object.keys(params).map((key)=> encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&')}`,
    headers: { }
  };
  

  return await axios.request(config);
}

/**
 * Method to call POST request to insert record
 * @param {*} endpoint
 * @param {*} jsonData
 * @returns
 */
export const post = async (endpoint, jsonData = null) => {
  if (jsonData === null) {
    return null;
  }

  let formData = new FormData();
  Object.keys(jsonData).forEach((data) => {
    formData.append(data.toString(), jsonData[data].toString());
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${EnvConfig.LOCAL_URL}${EnvConfig.LOCAL_SUBURL}${endpoint}`,
    headers: {},
    data: formData,
  };

  return await axios.request(config);
};


export const bulkInsert = async (endpoint, jsonData = null) => {
  if (jsonData === null) {
    return null;
  }

  let formData = new FormData();
  Object.keys(jsonData).forEach((data) => {
    formData.append(data.toString(), jsonData[data]);
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${EnvConfig.LOCAL_URL}${EnvConfig.LOCAL_SUBURL}${endpoint}`,
    headers: {},
    data: formData,
  };

  return await axios.request(config);
};


/**
 * Method to call PUT request to update record
 * @param {*} endpoint 
 * @param {*} id 
 * @param {*} jsonData 
 * @returns 
 */
export const edit = async (endpoint, id, jsonData = null) => {
  if(!jsonData || !id){
    return null;
  }

  let formData = new FormData();
  Object.keys(jsonData).forEach((data) => {
    if(typeof(jsonData[data]) === Array){
      formData.append(data.toString(), jsonData[data]);
    }
    else{
      formData.append(data.toString(), jsonData[data]?.toString());
    }
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `${EnvConfig.LOCAL_URL}${EnvConfig.LOCAL_SUBURL}${endpoint}?id=${id}`,
    headers: { },
    data : formData
  };

  return axios.request(config);
}

/**
 * Method to call DELETE request to delete record
 * @param {*} endpoint
 * @param {*} id
 * @returns
 */
export const del = async (endpoint, id) => {

  if(!id){
    return null;
  }
  

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${EnvConfig.LOCAL_URL}${EnvConfig.LOCAL_SUBURL}${endpoint}?id=${id}`,
    headers: {},
  };

  return await axios.request(config);
};
