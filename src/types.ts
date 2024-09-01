  export interface AnalysisResult {
    hairstyle: string;
    region: string; // Add this line
    
  }
  
  export interface PlaceState {
    items: Place[];
    loading: boolean;
    error: string | null;
  }

  export enum PlaceActionTypes {
    FETCH_START = 'places/fetch_start',
    FETCH_SUCCESS = 'places/fetch_success',
    FETCH_FAILURE = 'places/fetch_failure'
  }

  export interface Place {
    title: string;
    link: string;
    category: string;
    address: string;
    mapx: number;
    mapy: number;
  }
  

  
  export interface FetchPlacesPayload {
    hairstyle: string;
    region: string;
  }
  
  export interface Search {
    id: number;
    user_id: number;
    hairstyle: string;
    image_path: string;
    created_at: string;
  }
  
  export interface SearchState {
    items: Search[];
    loading: boolean;
    error: string | null;
  }