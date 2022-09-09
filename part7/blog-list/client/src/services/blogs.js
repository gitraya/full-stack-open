import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const updateLike = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}/like`, null, config);
  return response.data;
};

const addComment = async (id, comment) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );
  return response.data;
};

export default {
  getAll,
  getById,
  create,
  remove,
  setToken,
  updateLike,
  addComment,
};
