import { IsEnum } from 'class-validator';
import { ItemStatus } from '../item-status.enum';

export class UpdateItemStatusDto {
  @IsEnum(ItemStatus)
  status: ItemStatus;
}
