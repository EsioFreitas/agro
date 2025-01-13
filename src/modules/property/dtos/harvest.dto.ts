import { IsInt, IsString, Min } from 'class-validator';

export class HarvestDto {
  @IsString()
  propertyId: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(1900)
  year: number;
}
