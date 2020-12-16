import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Entity,
  ExtendedEntity
} from '../models';
import {EntityRepository} from '../repositories';

export class EntityExtendedEntityController {
  constructor(
    @repository(EntityRepository) protected entityRepository: EntityRepository,
  ) { }

  @get('/entity/{id}/extended-entity', {
    responses: {
      '200': {
        description: 'Entity has one ExtendedEntity',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ExtendedEntity),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ExtendedEntity>,
  ): Promise<ExtendedEntity> {
    return this.entityRepository.extendedEntity(id).get(filter);
  }

  @post('/entity/{id}/extended-entity', {
    responses: {
      '200': {
        description: 'Entity model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExtendedEntity)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Entity.prototype.uuid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtendedEntity, {
            title: 'NewExtendedEntityInEntity',
            exclude: ['uuid'],
            optional: ['entityId']
          }),
        },
      },
    }) extendedEntity: Omit<ExtendedEntity, 'uuid'>,
  ): Promise<ExtendedEntity> {
    return this.entityRepository.extendedEntity(id).create(extendedEntity);
  }

  @patch('/entity/{id}/extended-entity', {
    responses: {
      '200': {
        description: 'Entity.ExtendedEntity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtendedEntity, {partial: true}),
        },
      },
    })
    extendedEntity: Partial<ExtendedEntity>,
    @param.query.object('where', getWhereSchemaFor(ExtendedEntity)) where?: Where<ExtendedEntity>,
  ): Promise<Count> {
    return this.entityRepository.extendedEntity(id).patch(extendedEntity, where);
  }

  @del('/entity/{id}/extended-entity', {
    responses: {
      '200': {
        description: 'Entity.ExtendedEntity DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ExtendedEntity)) where?: Where<ExtendedEntity>,
  ): Promise<Count> {
    return this.entityRepository.extendedEntity(id).delete(where);
  }
}
