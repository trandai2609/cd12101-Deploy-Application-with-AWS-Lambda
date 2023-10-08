import { createTodo, updateTodo, updateTodoImageUrl } from "../../businessLogic/todos.mjs"

import middy from '@middy/core'
import cors from '@middy/http-cors'
import {createPresignedUrl} from '../../fileStorage/attachmentUtils.mjs'
import {getUserId} from '../utils.mjs'
import * as uuid from 'uuid'

export const handler = middy()  
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Processing event: ', event)

    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId
    const attachmentId = uuid.v4()

    const uploadImageUrl = await createPresignedUrl(attachmentId)
    
    console.log("uploadImageUrl: " + uploadImageUrl)

    await updateTodoImageUrl(userId, todoId, attachmentId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        'uploadUrl': uploadImageUrl
      })
    }
    
  })

