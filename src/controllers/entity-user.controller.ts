import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Entity,
  User
} from '../models';
import {EntityRepository} from '../repositories';

export class EntityUserController {
  constructor(
    @repository(EntityRepository)
    public entityRepository: EntityRepository,
  ) { }

  @get('/entity/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Entity',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Entity.prototype.uuid,
  ): Promise<User> {
    return this.entityRepository.user(id);
  }
}
