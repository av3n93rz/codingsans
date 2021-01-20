export interface InitialState {
  breweries:BreweryInfo[];
  loading: boolean;
}

export interface IssuesAction {
  type: string;
  payload: BreweryInfo[];
}

export interface BreweryInfo {
  address_2: string | null;
  address_3: string | null;
  brewery_type: string | null;
  city: string | null;
  country: string | null;
  county_province: string | null;
  created_at: string;
  id: number;
  latitude: string | null;
  longitude: string | null;
  name: string;
  phone: string | null;
  postal_code: string | null;
  state: string | null;
  street: string | null;
  updated_at: string;
  website_url: string | null;
}

export interface Results {
  id: number;
  name: string;
}

export interface SearchAction {
  type: string;
  payload: Results[];
}

export interface SearchState {
  results: Results[];
  loading: boolean;
}