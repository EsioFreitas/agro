import { IsString } from 'class-validator';

export class CropDto {
  @IsString()
  name: string;
}
