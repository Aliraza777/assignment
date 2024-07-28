import { MemoryStoredFile } from 'nestjs-form-data';

export class UploadImageDTO {
  from: string;
  uid: string;
  id: number = null;
  file: MemoryStoredFile;
  currentPath: string = null;
}
