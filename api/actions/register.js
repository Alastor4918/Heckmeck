export default function login(req) {
  const user = {
    nickname: req.body.nickname,
    username: req.body.username,
    password: req.body.password
  };
  req.session.user = user;
  return Promise.resolve(user);
}
