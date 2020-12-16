import {DefaultCrudRepository} from '@loopback/repository';
import {ExtendedEntity, ExtendedEntityRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ExtendedEntityRepository extends DefaultCrudRepository<
  ExtendedEntity,
  typeof ExtendedEntity.prototype.uuid,
  ExtendedEntityRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ExtendedEntity, dataSource);
  }
}
