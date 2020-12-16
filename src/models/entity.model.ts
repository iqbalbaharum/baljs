import {belongsTo, hasOne, model, property} from '@loopback/repository';
import {BaseEntity} from '.';
import {ExtendedEntity} from './extended-entity.model';
import {User} from './user.model';

@model()
export class Entity extends BaseEntity {
  @property({
    type: 'string',
    id: true,
    useDefaultIdType: false,
    defaultFn: 'uuidv4',
  })
  uuid?: string;

  @property({
    type: 'object',
    mysql: {
      dataType: 'json'
    }
  })
  metadata?: object;

  @property({
    type: 'string',
  })
  state: string;

  @property({
    type: 'string',
  })
  status?: string;

  @belongsTo(() => User)
  userId: string;

  @hasOne(() => ExtendedEntity)
  extendedEntity: ExtendedEntity;

  constructor(data?: Partial<Entity>) {
    super(data);
  }
}

export interface EntityRelations {
  // describe navigational properties here
}

export type EntityWithRelations = Entity & EntityRelations;
