import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { ListResponseDto } from './dtos/list-respone.dto';
import { PageOptionDto } from './dtos/page-option.dto';

export async function paginate<Entity>(
  repository: Repository<any>,
  options: PageOptionDto,
  where: FindOptionsWhere<Entity>,
  relations: FindOptionsRelations<Entity>,
): Promise<ListResponseDto<Entity>> {
  const {
    page = 1,
    limit = 10,
    sort = 'createdAt',
    sortOrder = 'DESC',
  } = options;
  const [data, total] = await repository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { [sort]: sortOrder },
    where,
    relations,
  });
  return { data: data as Entity[], total, page, limit };
}
