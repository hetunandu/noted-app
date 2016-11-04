import {AsyncStorage} from 'react-native';

class Api{
    static headers() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'dataType': 'json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NzgxNjcyNjksImV4cCI6MTQ3ODc3MjA2OSwia2V5IjoiYWd0emZtNXZkR1ZrTFdGd2FYSVJDeElFVlhObGNoaUFnSUNBaFltQkNndyJ9.4Df9cXATECjgfAr6MrfV9nGtyNebGmXdMsDB1HjfZqI'
        }
        
        // AsyncStorage.getItem('login_token')
        //     .then((token) => {
        //         if(token){
        //             headers["Authorization"] = token
        //         }
        //     })
        //     .done();
        return headers

    }

    static get(route){
        return this.xhr(route, null, 'GET')
    }

    static put(route, params){
        return this.xhr(route, params, 'PUT')
    }

    static post(route, params){
        return this.xhr(route, params, 'POST')
    }

    static delete(route, params){
        return this.xhr(route, params, 'DELETE')
    }

    static xhr(route, params, method){
        const host = 'https://noted-api.appspot.com'
        const url = `${host}${route}`

        let options = Object.assign({method}, params ? {body: JSON.stringify(params)} : null );
        options.headers = Api.headers()
        return fetch(url, options).then(resp => {
            let json = resp.json();
            if (resp.ok){
                return json
            }
            return json.then(err => {throw err})
        });
    }
}

export default Api