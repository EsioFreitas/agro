import { IsNumber, IsString, Min } from 'class-validator';

export class PropertyDto {
  @IsString()
  producerId: string;

  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsNumber()
  @Min(0)
  totalArea: number;

  @IsNumber()
  @Min(0)
  farmableArea: number;

  @IsNumber()
  @Min(0)
  vegetationArea: number;
}
