import {inject} from '@loopback/core';
import {DefaultKeyValueRepository} from '@loopback/repository';
import {RedisDataSource} from '../datasources';
import {Registry} from '../models';

export class RegistryRepository extends DefaultKeyValueRepository<
  Registry
> {
  constructor(
    @inject('datasources.Redis') dataSource: RedisDataSource,
  ) {
    super(Registry, dataSource);
  }
}
