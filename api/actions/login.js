import { User } from '../models/index';

export function login(username, password) {
  return User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if (!user) {
      return {
        result: null,
        error: "Incorrect username"
      };
    }
    if(password === user.password){
      return {
        result: user,
        error: null
      };
    }
  });
}