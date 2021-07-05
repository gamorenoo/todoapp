/* import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from '../actions';
import { User } from 'src/app/models/user';

export interface AuthState {
    current: User;
}

const initialState: AuthState = {
    current: null
};

const setAuthReducer = createReducer(
    initialState,
    on(
        authActions.setUser, (state, { user: user }) => ({
            ...state,
            current: { ...user }
        })
    )

);

export function authReducer(state: AuthState, action: Action) {
    return setAuthReducer(state, action);
}
 */