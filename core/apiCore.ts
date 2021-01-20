import axios from 'axios'

export const search = (keyword:string):Promise<any>=>{
  return axios.get(`https://api.openbrewerydb.org/breweries/autocomplete?query=${keyword}`).then(res => res.data.slice(0, 5));
}
export const getBrewery = async(id:number):Promise<any>=>{
  return axios.get(`https://api.openbrewerydb.org/breweries/${id}`).then(res => res.data);
}
export const listBreweries = (page:number):Promise<any>=>{
  return axios.get(`https://api.openbrewerydb.org/breweries?page=${page ? page:1}&per_page=10`).then(res => res.data);
}