import {AsyncStorage} from 'react-native'

export function fetchOffline(subject_key){

	AsyncStorage.getItem('login_token')
		.then((token) => {
			config = {
				headers: { 
					'Authorization': `${token}`,
					'User-Agent': "AndroidApp"
				}
			}

			return fetch(`https://3-dot-noted-api.appspot.com/study/subjects/${subject_key}/offline`, config)
				.then(res => res.json())
				.then(json => {
					if(json.success === false){
						console.warn(json.error)
					}else{
						// If requesr was successful, set the index in local storage
						AsyncStorage.setItem('index', json.message);
					}
				})
				.catch(err => {
					console.warn(err)
				})

		})
}
