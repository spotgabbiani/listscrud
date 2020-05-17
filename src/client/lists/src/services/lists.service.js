import axios from 'axios';

const config = {backendUrl: 'http://localhost:8000/api'}

class ListService {
    getall() {
        return axios.get(`${config.backendUrl}/lists/`)
            .then(res => {
                return res.data;
            });
    }

    createList(data){
        return axios.post(`${config.backendUrl}/lists/`, data)
            .then(response => {
                return response
            }).catch(e => {
                console.log(e);
            });
    }

    deleteList(id){
        return axios.delete(`${config.backendUrl}/lists/${id}`)
            .then(response => {
                return response
            }).catch(e => {
                console.log(e);
            });
    }

    editList(data, id){
        return axios.patch(`${config.backendUrl}/lists/${id}`, data)
            .then(response => {
                return response
            }).catch(e => {
                console.log(e);
            });
    }

    addItem(data, listId){
        const item = {item: data};
        return axios.post(`${config.backendUrl}/lists/${listId}/items/`, item)
            .then(response => {
                return response
            }).catch(e => {
                console.log(e);
            });
    }

    editItem(data, listId, itemId){
        const item = {item: data};
        return axios.patch(`${config.backendUrl}/lists/${listId}/items/${itemId}`, item)
            .then(response => {
                return response
            }).catch(e => {
                console.log(e);
            });
    }

    deleteItem(listId, itemId){
        return axios.delete(`${config.backendUrl}/lists/${listId}/items/${itemId}`)
            .then(response => {
                return response
            }).catch(e => {
                console.log(e);
            });
    }


}
export default new ListService();