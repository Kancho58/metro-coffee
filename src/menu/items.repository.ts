import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.entity';

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {
  async getItems(filterDto: GetItemsFilterDto, user: User): Promise<Item[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('item');
    query.where({ user });

    if (status) {
      query.andWhere('item.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LIKE LOWER(item.category )LIKE LOWER (:search) OR LOWER(item.ingredients) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const items = await query.getMany();
    return items;
  }

  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { category, ingredients } = createItemDto;

    const item = this.create({
      category,
      ingredients,
      status: ItemStatus.AVAILABLE,
      user,
    });
    await this.save(item);
    return item;
  }
}
