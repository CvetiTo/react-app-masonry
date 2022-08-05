const url = 'http://localhost:3030/data/items';

const useItemsApi = () => {
    const removeItem = (itemId) => {
       return fetch(`${url}/${itemId}`, {
            method: 'DELETE',
        })
        //.than(res => res.json())
    }

    const createItem = (item) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({...item})
        }).than(res => res.json())
    }

    return {
        removeItem,
        createItem,
    }
};

export default useItemsApi;