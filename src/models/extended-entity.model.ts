import {model, property} from '@loopback/repository';
import {BaseEntity} from '.';

@model()
export class ExtendedEntity extends BaseEntity {
  @property({
    type: 'string',
    id: true,
    useDefaultIdType: false,
    defaultFn: 'uuidv4',
  })
  uuid?: string;

  @property({
    type: 'string',
  })
  entityId?: string;

  constructor(data?: Partial<ExtendedEntity>) {
    super(data);
  }
}

export interface ExtendedEntityRelations {
  // describe navigational properties here
}

export type ExtendedEntityWithRelations = ExtendedEntity & ExtendedEntityRelations;
