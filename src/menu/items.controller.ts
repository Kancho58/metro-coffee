import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { UpdateItemStatusDto } from './dto/update-item-status.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

@Controller('items')
@UseGuards(AuthGuard())
export class ItemsController {
  constructor(private itemsSercice: ItemsService) {}

  @Get()
  getItems(@Query() filterDto: GetItemsFilterDto, user: User): Promise<Item[]> {
    return this.itemsSercice.getItems(filterDto, user);
  }

  @Get('/:id')
  getItemById(@Param('id') id: string, @GetUser() user: User): Promise<Item> {
    return this.itemsSercice.getItemById(id, user);
  }

  @Post()
  createItem(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.itemsSercice.createItem(createItemDto, user);
  }

  @Delete('/:id')
  deleteItem(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.itemsSercice.deleteItem(id, user);
  }

  @Patch('/:id/status')
  updateItemStatus(
    @Param('id') id: string,
    @Body() updateItemStatusDto: UpdateItemStatusDto,
    @GetUser() user: User,
  ): Promise<Item> {
    const { status } = updateItemStatusDto;
    return this.itemsSercice.updateItemStatus(id, status, user);
  }
}
