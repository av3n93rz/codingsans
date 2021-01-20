export interface InitialState {
  breweries:BreweryInfo[];
  loading: boolean;
}

export interface IssuesAction {
  type: string;
  payload: BreweryInfo[];
}

export interface BreweryInfo {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  address_2?: string;
  address_3?: string;
  brewery_type?: string;
  city?: string
  country?: string
  county_province?: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  postal_code?: string;
  state?: string;
  street?: string;
  website_url?: string;
}

export interface SearchResults {
  id: number;
  name: string;
}

export interface SearchAction {
  type: string;
  payload: SearchResults[];
}

export interface SearchState {
  results: SearchResults[];
  loading: boolean;
}