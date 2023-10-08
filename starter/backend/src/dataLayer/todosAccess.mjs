
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const AWSXRay = require('aws-xray-sdk')
const todosIndex = process.env.TODOS_CREATED_AT_INDEX



export class TodosAccess {
  constructor(
    dynamoDb = new DynamoDB(),
    dynamoDbXRay = AWSXRay.captureAWSv3Client(dynamoDb),
    todosTable = process.env.TODOS_TABLE,
    todosIndex = process.env.TODOS_CREATED_AT_INDEX
  ) { 
    this.todosTable = todosTable
    this.dynamoDbClient = DynamoDBDocument.from(dynamoDbXRay)

  }

  async getTodosForUser(userId) {
    console.log(userId)

    const scanCommand = {
      TableName: this.todosTable,
      KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
    }
    const result = await this.dynamoDbClient.query(scanCommand)

    return result.Items
  }

  async createTodo(newTodo) {

    const putItemCommand = {
      TableName: this.todosTable,
      Item: newTodo
    }

    const result = await this.dynamoDbClient.put(putItemCommand)

    return newTodo
  }

  async deleteTodo(userId, todoId) {
    
    const deleteItemCommand = {
      TableName: this.todosTable,
      Key: {
        userId,
        todoId
    }
    }

    await this.docClient.delete(deleteItemCommand)
  }
}