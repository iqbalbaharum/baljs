import {
  lifeCycleObserver,
  LifeCycleObserver
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {RegistryRepository} from '../repositories';
import {Registry} from './../models';
import * as kvs from './../server/kv.json';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('Seeder')
export class RegistrySeederObserver implements LifeCycleObserver {

  constructor(
    @repository(RegistryRepository)
    protected registryRepository: RegistryRepository
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    const kvLoaded : Registry = await this.registryRepository.get('base_kv_loaded')
    if (kvLoaded && kvLoaded['value'] === 'true') return;

    kvs.data.forEach(kv => {
      this.registryRepository.set(kv.key, new Registry(kv));
    });
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
