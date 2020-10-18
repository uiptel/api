import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger {
    constructor() {  
        super('', false);
    }
    
    setContext(context: unknown):void {
        super.setContext(context?.constructor ? context.constructor.name : context + '');
    }
}