import AsyncStorage from "@react-native-async-storage/async-storage";


export const removefavorite = async (favoriteId:number) => {
    try {
        const favorite =  (await getfavorite()).split(','); 
        const newArray = favorite.filter((item) => item !== JSON.stringify(favoriteId));

        await AsyncStorage.setItem("favorite", (newArray.join(',')));

    } catch (e) {
        console.error(e);
    }
};
export const setfavorite = async (favoriteId:number) => {
    try {
        const favorite =  await getfavorite(); 
        
        await AsyncStorage.setItem("favorite", favorite === '' ? `${favoriteId}` : `${favorite},${favoriteId}`);
    } catch (e) {

        console.error(e);
    }
};
export const getfavorite = async (): Promise<string> => {
    try {
        const favorites = await AsyncStorage.getItem("favorite");
        
        return favorites === null ? '' : favorites
    } catch (e) {
        console.error(e);
    }
};
