import 'main.module.ts';
import { ILogger, LoggerService } from 'helpers/logger/logger';

/**
 * Displays the about screen.
 */
export class AboutController {

  version: string;

  private logger: ILogger;

  constructor(logger: LoggerService,
              config: any) {

    this.logger = logger.getLogger('about');
    this.version = config.version;

    this.logger.log('init');
  }

}

angular
  .module('app')
  .controller('aboutController', AboutController);
