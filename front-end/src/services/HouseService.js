import http from "../services/http-common.js";
const getAll = (id) => {
  return http.get(`/houses/${id}`);
};
const get = id => {
  return http.get(`/houses/${id}/house`);
};
const create = data => {
  return http.post("/houses", data);
};
const update = (id, data) => {
  return http.put(`/houses/${id}`, data);
};
const remove = id => {
  return http.delete(`/houses/${id}`);
};
const getUserLivedHouses = id => {
  return http.get(`/houses/${id}/reviews`);
};
const addReview = data => {
  return http.post("/houses/add-review", data);
};
const editReview = (id, data) => {
  return http.put(`/houses/${id}/edit-review-house`, data);
};
const getReview = (id,email) => {
  return http.get(`/houses/${id}/edit-review/${email}`);
};
const checkReview = (data) => {
  return http.get(`/houses/${data}/check-review`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  getUserLivedHouses,
  addReview,
  getReview,
  editReview,
  checkReview
};