import request from '@/utils/request'

export function login(data) {
  console.log('merchant    loginlogin')
  console.log(JSON.stringify(data))

  return request({
    url: '/loginController/vue-admin-template/merchant/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  console.log('merchant GetInfo')
  return request({
    url: '/loginController/vue-admin-template/merchant/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/loginController/vue-admin-template/merchant/logout',
    method: 'post'
  })
}
