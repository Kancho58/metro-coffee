import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';
import { Item } from './item.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsRepository)
    private itemsRepository: ItemsRepository,
  ) {}

  getItems(filterDto: GetItemsFilterDto, user: User): Promise<Item[]> {
    return this.itemsRepository.getItems(filterDto, user);
  }

  async getItemById(id: string, user: User): Promise<Item> {
    const found = await this.itemsRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    return found;
  }

  createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return this.itemsRepository.createItem(createItemDto, user);
  }

  async deleteItem(id: string, user: User): Promise<void> {
    const result = await this.itemsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Item with this ID "${id}" not found`);
    }
  }
  async updateItemStatus(
    id: string,
    status: ItemStatus,
    user: User,
  ): Promise<Item> {
    const item = await this.getItemById(id, user);

    item.status = status;
    await this.itemsRepository.save(item);

    return item;
  }
}
