import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import {createLogger} from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)

const s3_bucket = process.env.ATTACHMENT_S3_BUCKET


export async function createPresignedUrl(attachmentId) {

    const s3 = new XAWS.S3({
        signatureVersion: 'v4'
    })

    const presignedUrl = s3.getSignedUrl('putObject', {
        Bucket: s3_bucket,
        Key: attachmentId,
        Expires: '60'  
    })

    return presignedUrl
}
