import { Module } from '@nestjs/common';
import { fileUploader } from 'src/controllers/file.controller';
import { UploadService } from 'src/service/upload.service';
import {FileService} from "src/service/file.service"
@Module({
    imports:[/* MulterModule.register({
        dest:"/files",
    }) */ ],
    controllers:[fileUploader],
    providers:[
        UploadService,
        FileService
    ]
})
export class FileModule{}