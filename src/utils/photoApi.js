import tokenService from './tokenService';

const BASE_URL = '/api/photos';

export function create(photo) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: photo, 
        headers: {
             'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json();
        throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
}

export function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }