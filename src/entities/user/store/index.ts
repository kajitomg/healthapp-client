import { default as usersReducers} from './users/reducer.ts';
import { default as sessionReducers} from './session/reducer.ts';


const userState = {
  users:usersReducers,
  session:sessionReducers
}

export {userState}