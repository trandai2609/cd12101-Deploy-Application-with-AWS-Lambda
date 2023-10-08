import { parseUserId } from '../auth/utils.mjs'

export function getUserId(event) {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  console.log('token:-------------------------')
  console.log(jwtToken)
  console.log('-------------------------')
  return parseUserId(jwtToken)
}
