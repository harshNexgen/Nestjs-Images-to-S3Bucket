import { Injectable } from "@nestjs/common";
import { FileService } from "./file.service";
@Injectable()
export class UploadService{
    constructor(private readonly fileservice : FileService){}
    async addAvatar(imagebuffer:Buffer,filename:string){
        const bucket_name = process.env.BUCKET_NAME
       return await this.fileservice.uploadFile(imagebuffer,bucket_name,filename)
    }

}