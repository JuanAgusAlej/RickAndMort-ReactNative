export interface IReturnApid {
    status: number;
    info: {
      count: number;
      pagesTotal: number;
      nextPage: string | null;
      prevPage: string | null;
    };
    result: [
      {
        id: number;
        name: string;
        status: string;
        species: string;
        type: string;
        gender: string;
        image: string;
        episode: Array<String>;
      }
    ];
  }