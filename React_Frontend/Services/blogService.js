import * as global from "./serviceHelpers";

import axios from "axios";

let submitBlogEntry = payload => {
  const configs = {
    method: "POST",
    url: global.API_HOST_PREFIX + "/api/blogs",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(configs);
};

let getBlogList = () => {
  const configs = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/blogs",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(configs)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getBlogById = id => {
  const configs = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/blogs/" + id,
    // /data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(configs)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let submitBlogUpdate = (id, payload) => {
  const configs = {
    method: "PUT",
    url: global.API_HOST_PREFIX + "/api/blogs/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(configs)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getBlogPage = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/blogs/" + pageIndex + "/" + pageSize,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "/application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let deleteBlog = id => {
  const configs = {
    method: "DELETE",
    url: global.API_HOST_PREFIX + "/api/blogs/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(configs)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export {
  submitBlogEntry,
  getBlogList,
  getBlogById,
  submitBlogUpdate,
  getBlogPage,
  deleteBlog
};
