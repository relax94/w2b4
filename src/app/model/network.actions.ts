import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

@Injectable()
export class NetworkActions {

    public static CREATE_NETWORK: string = "CREATE_NETWORK";
    createNetwork(): Action {
        return {
            type: NetworkActions.CREATE_NETWORK
        };
    }


}
