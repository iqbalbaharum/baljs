import {
  authenticate,
  AuthenticationBindings
} from '@loopback/authentication';
import {Getter, inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Entity} from '../models';
import {EntityRepository} from '../repositories';

export class EntityController {
  constructor(
    @repository(EntityRepository)
    public entityRepository : EntityRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<UserProfile>,
  ) {}

  @post('/entity', {
    responses: {
      '200': {
        description: 'Entity model instance',
        content: {'application/json': {schema: getModelSchemaRef(Entity)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entity, {
            title: 'NewEntity',
            exclude: ['uuid'],
          }),
        },
      },
    })
    entity: Omit<Entity, 'uuid'>,
  ): Promise<Entity> {
    return this.entityRepository.create(entity);
  }

  @get('/entity/count', {
    responses: {
      '200': {
        description: 'Entity model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Entity) where?: Where<Entity>,
  ): Promise<Count> {
    return this.entityRepository.count(where);
  }

  @get('/entity', {
    responses: {
      '200': {
        description: 'Array of Entity model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Entity, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Entity) filter?: Filter<Entity>,
  ): Promise<Entity[]> {
    return this.entityRepository.find(filter);
  }

  @patch('/entity', {
    responses: {
      '200': {
        description: 'Entity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entity, {partial: true}),
        },
      },
    })
    entity: Entity,
    @param.where(Entity) where?: Where<Entity>,
  ): Promise<Count> {
    return this.entityRepository.updateAll(entity, where);
  }

  @get('/entity/{id}', {
    responses: {
      '200': {
        description: 'Entity model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Entity, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Entity, {exclude: 'where'}) filter?: FilterExcludingWhere<Entity>
  ): Promise<Entity> {
    return this.entityRepository.findById(id, filter);
  }

  @patch('/entity/{id}', {
    responses: {
      '204': {
        description: 'Entity PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entity, {partial: true}),
        },
      },
    })
    entity: Entity,
  ): Promise<void> {
    await this.entityRepository.updateById(id, entity);
  }

  @put('/entity/{id}', {
    responses: {
      '204': {
        description: 'Entity PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() entity: Entity,
  ): Promise<void> {
    await this.entityRepository.replaceById(id, entity);
  }

  @del('/entity/{id}', {
    responses: {
      '204': {
        description: 'Entity DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.entityRepository.deleteById(id);
  }

  @get('/entity/state/{state}', {
    responses: {
      '200': {
        description: 'Return the latest entity with requested state and status',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Entity, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findLatestEntityState(
    @param.path.string('state') state: string
  ): Promise<Entity> {

    const user = await this.getCurrentUser();

    const entity = await this.entityRepository.findOne({
      where: {
        and: [
          { userId: user.user },
          { state: state }
        ]
      }
    });

    if(!entity) {
      throw new HttpErrors.NotFound('No entity found')
    }

    return entity;
  }

  @get('/entity/not/state/{state}', {
    responses: {
      '200': {
        description: 'Return the active entity',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Entity, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findLatestEntityNotEqualState(
    @param.path.string('state') state: string
  ): Promise<Entity> {

    const user = await this.getCurrentUser();

    const entity = await this.entityRepository.findOne({
      where: {
        and: [
          { userId: user.user },
          { state: { neq: state } }
        ]
      }
    });

    if(!entity) {
      throw new HttpErrors.NotFound('No entity found')
    }

    return entity;
  }
}

