import axios from "axios";

interface returnApid  {
    status:number,
    info:{
        count: number,
        pagesTotal: number,
        nextPage: string | null,
        prevPage: string | null,
    },
    result:[
        {
            id: number,
            name: string,
            status: string,
            spicies: string,
            type: string,
            gender:string,
            image:string,
            episode:Array<String>
        }
    ]
} 


export const getFavoriteApi = async (favoriteList:string): Promise<returnApid> =>{
    console.log(favoriteList)
    const {data} = await axios(`https://rickandmortyapi.com/api/character/${favoriteList}`)
    return data
}
export const getCharacter = async (page:number, status:'alive' | 'dead' | 'unknown' | ''
): Promise<returnApid> =>{
    console.log('Dentro de api')
    console.log(page)
    console.log('Dentro de stado')
    console.log(status)
    const characterRespond = await axios(`https://rickandmortyapi.com/api/character?page=${page}&status=${status}`)
    const returnHaracter = 
        {
            status: characterRespond.status,
            info:{
                count: characterRespond.data.info.count,
                pagesTotal: characterRespond.data.info.pages,
                nextPage: characterRespond.data.info.next,
                prevPage: characterRespond.data.info.prev,
                
            },
            result:characterRespond.data.results
        }        
    return returnHaracter
}
export const getFilterCharacter = async (text:string,  status:'alive' | 'dead' | 'unknown' | '' ,page?:number): Promise<returnApid> =>{
    console.log('Dentro de api')
    console.log(page)
    console.log('Dentro de text')
    const characterRespond = await axios(`https://rickandmortyapi.com/api/character?name=${text}&page=${page}&status=${status}`)
    const returnHaracter = 
        {
            status: characterRespond.status,
            info:{
                count: characterRespond.data.info.count,
                pagesTotal: characterRespond.data.info.pages,
                nextPage: characterRespond.data.info.next,
                prevPage: characterRespond.data.info.prev,
                
            },
            result:characterRespond.data.results
        }        
    return returnHaracter
}

interface test {
    id: number;
    name: string;
    air_date: string;
    episode: string;
  }

export const getEpisodieInfo = async (episodies:Array<string>):Promise<Array<test> | string> =>{
try {
    const episodieList = [];
    for (let index = 0; index < episodies.length; index++) {
        const {data} = await axios(episodies[index]);
        const episodeObj={
            id:data.id,
            name:data.name,
            air_date:data.air_date,
            episode:data.episode,
        }   
        episodieList.push(episodeObj);
    }
    return episodieList;
} catch (error) {
    return "Error al intentar conectar con la api"
}

}