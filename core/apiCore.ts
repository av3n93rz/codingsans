import axios from 'axios'

export const search = (keyword:string):Promise<any>=>{
  return axios.get(`https://api.openbrewerydb.org/breweries/autocomplete?query=${keyword}`).then(res => res.data.slice(0, 5));
}
export const getBrewery = async(id:number):Promise<any>=>{
  try{
    const res = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`)
    return res.data
  } catch(err){
    return {error: err.response.status}
  }
}
export const listBreweries = (page:number):Promise<any>=>{
  return axios.get(`https://api.openbrewerydb.org/breweries?page=${page ? page:1}&per_page=10`).then(res => res.data);
}