/*
  https://console.aws.amazon.com/dynamodb/home?region=us-east-1#tables:selected=Users;tab=items
 */

/**
 *
 * @returns {Promise<DynamoDB>}
 */
export function getDB() {
  let counter = 20
  return new Promise((resolve, reject) => {
    const hdl = setInterval(() => {
      if (window.AWS) {
        clearInterval(hdl)
        resolve(new DynamoDB(window.AWS))
      } else if (--counter <= 0) {
        clearInterval(hdl)
        reject(Error('Fail connect to DB'))
      }
    }, 250)
  })
}

class DynamoDB {
  constructor(aws) {
    this.aws = aws
    aws.config.update({
      region: 'us-east-1',
      // endpoint: 'http://localhost:63342',
      // endpoint: document.location.href,
      // accessKeyId default can be used while using the downloadable version of DynamoDB.
      // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
      accessKeyId: 'AKIAWVVBQD4VXVL5UUHP',
      // secretAccessKey default can be used while using the downloadable version of DynamoDB.
      // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
      secretAccessKey: 'q7ZHneCBptUJgdneDANGXznwR405mkFqrJyDHPys'
    })

    // var dynamodb = new AWS.DynamoDB();
    this.docClient = new aws.DynamoDB.DocumentClient()
  }

  /**
   * @param {string} key
   * @returns {Promise<Object>}
   */
  getData(key) {
    const params = {
      TableName: 'Users',
      Key: {
        Email: `${key}`
      }
    }
    const { docClient } = this

    return new Promise((resolve, reject) => {
      docClient.get(params, function(err, data) {
        if (err) reject(err) // an error occurred
        else resolve(data)   // successful response
      })
    })
  }

  /**
   * @param {string} key
   * @param {string} src
   * @param {string} tgt
   * @returns {Promise<Object>}
   */
  updateData(key, src = 'ru', tgt = 'en') {
    const params = {
      TableName: 'Users',
      Key: {
        Email: `${key}`,
      },
      UpdateExpression: 'set Languages.tgt = :t, Languages.src=:s',
      ExpressionAttributeValues: {
        ':t': `${tgt}`,
        ':s': `${src}`
      },
      ReturnValues: 'UPDATED_NEW'
    }

    const { docClient } = this

    return new Promise((resolve, reject) => {
      docClient.update(params, function(err, data) {
        if (err) reject(err) // an error occurred
        else resolve(data) // successful response
      })
    })
  }

  /**
   * @param {string} key
   * @param {string} src
   * @param {string} tgt
   * @param  {string} name
   * @returns {Promise<Object>}
   */
  createData(key, src = 'ru', tgt = 'en', name) {
    const params = {
      TableName: 'Users',
      Item: {
        Email: `${key}`,
        Languages: {
          src,
          tgt
        },
        Name: name
      }
    }

    const { docClient } = this

    return new Promise((resolve, reject) => {
      docClient.put(params, function(err, data) {
        if (err) reject(err) // an error occurred
        else resolve(data) // successful response
      })
    })
  }
}
