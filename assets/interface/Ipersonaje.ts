export interface IPersonaje {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    episode: Array<String>;
}

export interface IEpisodie {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    listCharacter:string;
  }