import { createTodo, updateTodo } from "../../businessLogic/todos.mjs"

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
    const parsedBody = JSON.parse(event.body)

    const item = await updateTodo(userId, parsedBody)

    return {
      statusCode: 201,
      body: ''
    }
    
  })

