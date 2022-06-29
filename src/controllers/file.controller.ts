import { Controller, Post, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, BadRequestException, Req, Put } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileFilter } from "./file-helper";
import {ApiBody, ApiConsumes } from "@nestjs/swagger";
import { UploadService } from "src/service/upload.service";


export const uploadFile = (fileName: string = 'file'): MethodDecorator => (
    target: any,
    propertyKey,
    descriptor: PropertyDescriptor,
  ) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };



@Controller("/uploads/file")
@UsePipes(
    new ValidationPipe({
        whitelist:true,
        transform:true,
    })
)
export class fileUploader{
  constructor(private readonly uploadService:UploadService){}

    @Post("/uploadFile")
    @ApiConsumes("multipart/form-data")
    @uploadFile('filename')
    @UseInterceptors(
        FileInterceptor('filename',{
            fileFilter:imageFileFilter
        })
    )


    public async uploadFile(@Req() req:any, @UploadedFile() file:Express.Multer.File){
       if(!file || req.fileValidationError){
        throw new BadRequestException("invalid file provided, [ image files allowed ]") 
       }
        return await this.uploadService.addAvatar(file.buffer,file.originalname);
    }
}   

