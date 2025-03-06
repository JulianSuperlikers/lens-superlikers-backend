import { Body, Controller, Post } from '@nestjs/common';
import { VeryfiService } from './veryfi.service';
import { UploadDocumentDto } from './dtos/upload-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { AddTagToDocumentDto } from './dtos/add-tag-document.dto';
import { GetDocumentDto } from './dtos/get-document.dto';

@Controller('veryfi')
export class VeryfiController {
  constructor(private readonly veryfiService: VeryfiService) {}

  @Post('upload')
  uploadDocument(@Body() uploadDocumentDto: UploadDocumentDto) {
    return this.veryfiService.uploadDocument(uploadDocumentDto);
  }

  @Post('update')
  updateDocument(@Body() updateDocumentDto: UpdateDocumentDto) {
    return this.veryfiService.updateDocument(updateDocumentDto);
  }

  @Post('tags')
  addTagToDocument(@Body() addTagToDocumentDto: AddTagToDocumentDto) {
    return this.veryfiService.addTagToDocument(addTagToDocumentDto);
  }

  @Post('document')
  getDocument(@Body() getDocumentDto: GetDocumentDto) {
    return this.veryfiService.getDocument(getDocumentDto);
  }
}
