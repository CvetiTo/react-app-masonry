import { get }  from './requestUtils.js';
import { post } from './requestUtils.js';

const baseUrl = 'http://localhost:3030/data/items';

export const getAll = () => get(baseUrl);

export const create = (itemData) => post(baseUrl, itemData);