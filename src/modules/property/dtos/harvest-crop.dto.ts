import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreateHarvestCropDto {
  @IsUUID()
  cropId: string;

  @IsNumber()
  @Min(0)
  area: number;
}
