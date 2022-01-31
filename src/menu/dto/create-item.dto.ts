import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  ingredients: string;
}
