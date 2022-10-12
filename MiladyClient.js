const axios = require("axios");
const rateLimit = require("axios-rate-limit");

const apiClient = axios.create({});
const apiClientLimiter = rateLimit(apiClient, {
  maxRequests: 3,
  perMilliseconds: 15 * 1000,
});

const ApiPaths = {
  courses: "/get_classes_that_match",
  students: "/get_users_that_match",
};

async function requestGenerator(request) {
  const { baseURL, api, type } = request;

  try {
    const url = baseURL + "/api" + api;
    const headers = {};

    // const response = await apiClient({ url, method: type, headers });
    const response = await apiClientLimiter({ url, method: type, headers });
    return response.data;
  } catch (error) {
    console.error(`error in following endpoint: ${api} with ${type} method`);
    throw error;
  }
}

async function getMiladyStudentsForCourse(credentials, params) {
  try {
    const request = {
      baseURL: credentials.baseURL,
      api: `${ApiPaths.students}?api_key=${credentials.apiKey}&class_id=${params.classID}&student=true&organization_id=${params.organizationID}&page=${params.page}`,
      type: "GET",
    };
    const response = await requestGenerator(request);
    console.log("PARAMS: ", params);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const methods = {
  getStudentsForCourse: getMiladyStudentsForCourse,
};

async function requestPaginator(name, credentials, params, flag) {
  try {
    let data = [];
    let page = 1;
    params.page = page;
    let temp = [];

    if (flag) {
      do {
        if (!methods[name]) {
          console.log("Method does not exists");
          break;
        }
        temp = await methods[name].call(this, credentials, params);
        data = data.concat(temp);
        params.page = ++page;
      } while (temp.length > 0);
    } else {
      data = await methods[name].call(this, credentials, params);
    }

    return data;
  } catch (error) {
    console.error("Exception in Paginator", error);
  }
}

module.exports = requestPaginator;
