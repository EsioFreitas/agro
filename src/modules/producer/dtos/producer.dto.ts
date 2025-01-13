import { IsCpfOrCnpj } from 'src/common/decorators/is-cpf-or-cnpj.decorator';
import { IsString } from 'class-validator';

export class ProducerDto {
  @IsString()
  @IsCpfOrCnpj({ message: 'Document must be a valid CPF or CNPJ' })
  document: string;

  @IsString()
  name: string;
}
