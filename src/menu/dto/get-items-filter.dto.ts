import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ItemStatus } from '../item-status.enum';

export class GetItemsFilterDto {
  @IsOptional()
  @IsEnum(ItemStatus)
  status?: ItemStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
