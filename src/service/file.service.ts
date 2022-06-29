import { Logger,  Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
const AWS = require("aws-sdk")
/* AWS.config.update({
    region:'us-east-1',
    accessKeyId:'AKIA3M3HOBCKYGP7HNMP',
    secretAccessKey:'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'
}) */
@Injectable()
export class FileService {
    constructor() {}
    getS3() {
        return new S3({
            region: "us-east-1",
            accessKeyId: "AKIA3M3HOBCKYGP7HNMP",
            secretAccessKey: "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"

        })
    }

    async uploadFile(imagebuffer, bucket_name, filename) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket_name,
            Key: String(filename),
            Body: imagebuffer
        };
        console.log(params)

        return await s3.upload(params).promise()
    }



}