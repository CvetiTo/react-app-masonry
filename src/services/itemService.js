import { get, put, post, del }  from './requestUtils.js';

const baseUrl = 'http://localhost:3030/data/items';

export const getAll = () => get(baseUrl);

export const getOne = (itemId) => get(`${baseUrl}/${itemId}`);

export const getLastFive = () => get(`${baseUrl}?sortBy=_createdOn%20desc&pageSize=5`)

export const create = (itemData) => post(baseUrl, itemData);

export const edit = (itemId, itemData) => put(`${baseUrl}/${itemId}`, itemData);

export const remove = (itemId) => del(`${baseUrl}/${itemId}`);