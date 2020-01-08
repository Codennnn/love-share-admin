import request from '../request'

export function checkNickname(data) {
  return request({
    url: '/common/check_nickname',
    method: 'post',
    data,
  })
}

export function checkPhoneNumber(data) {
  return request({
    url: '/common/check_phone_number',
    method: 'post',
    data,
  })
}

export function getVerificationCode(data) {
  return request({
    url: '/common/verification_code',
    method: 'post',
    data,
  })
}
