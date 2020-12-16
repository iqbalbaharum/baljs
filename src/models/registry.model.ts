import {Model, model, property} from '@loopback/repository';

@model()
export class Registry extends Model {
  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    type: 'string',
  })
  value?: string;


  constructor(data?: Partial<Registry>) {
    super(data);
  }
}

export interface RegistryRelations {
  // describe navigational properties here
}

export type RegistryWithRelations = Registry & RegistryRelations;
