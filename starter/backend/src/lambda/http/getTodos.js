import { getTodos } from "../../businessLogic/todos.mjs"

import middy from '@middy/core'
import cors from '@middy/http-cors'

import {getUserId} from '../utils.mjs'

export const handler = middy()  
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Processing event: ', event)

    const userId = getUserId(event)
    
    console.log("userId: " + userId)

    const items = await getTodos(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    }
  })

