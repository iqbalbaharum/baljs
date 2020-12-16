import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {Entity, EntityRelations, User, ExtendedEntity} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {ExtendedEntityRepository} from './extended-entity.repository';

export class EntityRepository extends DefaultCrudRepository<
  Entity,
  typeof Entity.prototype.uuid,
  EntityRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Entity.prototype.uuid>;

  public readonly extendedEntity: HasOneRepositoryFactory<ExtendedEntity, typeof Entity.prototype.uuid>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ExtendedEntityRepository') protected extendedEntityRepositoryGetter: Getter<ExtendedEntityRepository>,
  ) {
    super(Entity, dataSource);
    this.extendedEntity = this.createHasOneRepositoryFactoryFor('extendedEntity', extendedEntityRepositoryGetter);
    this.registerInclusionResolver('extendedEntity', this.extendedEntity.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
