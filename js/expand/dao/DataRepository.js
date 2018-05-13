import axios from 'axios';

export default class DataRepository {
  fetchNetRepository(url) {
    return axios.get(url)
  }
}