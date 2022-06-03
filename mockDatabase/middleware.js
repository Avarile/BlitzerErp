const users = [
  {
    id: 1,
    username: "Avarile",
    password: "000000",
    token: "1234567zxc",
  },
  {
    id: 2,
    username: "Lee",
    password: "111111",
    token: "2sdf897g6",
  },
  {
    id: 3,
    username: "Emily",
    password: "222222",
    token: "09870asdfx",
  },
  {
    id: 4,
    username: "Tomas",
    password: "333333",
    token: "sdfg623ja8df",
  },
];

// module.exports = (req, res, next) => {
//   if (req.method === "POST" && req.path === "login") {
//     if (req.body.username === "Avarile" && req.body.password === "000000") {
//       return res.status(200).json({
//         user: {
//           token: "1234567890x",
//           username: "Avarile",
//         },
//       });
//     }
//   }
//   next();
// };

module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "login") {
    for (let user of users) {
      if (user.username === req.body.username && req.body.password === user.password) {
        return res.status(200).json({
          user: {
            token: user.token,
            username: user.username,
          },
        });
      } else {
        return res.status(401).json({
          errorMessage: "unable to identify the credential",
        });
      }
    }
  }
  next();
};
