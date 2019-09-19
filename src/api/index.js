import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://192.168.0.102:3000',
});

export function verifyUserName(userName) {
  return new Promise((resolve, reject) => {
    api.post('/user/verify-username', { userName }).then(({ data }) => {
      resolve(data);
    }).catch(err => {
      reject(err.response.data.error);
    })
  })
}

export function login(userName, password) {
  return new Promise((resolve, reject) => {
    api.post('/user/auth', { userName, password }).then(({ data }) => {
      resolve(data);
    }).catch(err => {
      console.log(err.response.data.error);
      reject(err.response.data.error);
    })
  })
}

export function register(obj) {
  return new Promise((resolve, reject) => {
    api.post('/user/register', obj).then(({ data }) => {
      resolve(data);
    }).catch(reject);
  });
}

export function order(obj) {
  return new Promise((resolve, reject) => {
    api.post('/order', obj)
      .then(({ data }) => {
        resolve(data);
      }).catch(({ response: { data: { error } } }) => {
        reject(error);
      });
  });
}

export default {
  acai: [
    {
      size: '300',
      additional: '2',
      price: '10.90',
      category: 'copo',
    },
    {
      size: '500',
      additional: '2',
      price: '14.90',
      category: 'copo',
    },
    {
      size: '750',
      additional: '2',
      price: '18.90',
      category: 'copo',
    },
    {
      size: '500',
      additional: '4',
      price: '38.50',
      category: 'barca',
    },
    {
      size: '1000',
      additional: '5',
      price: '62.90',
      category: 'barca',
    },
  ],
}