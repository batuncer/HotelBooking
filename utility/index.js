const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const secret = "thisissecret";

function createToken(userId) {
  // TODO: it is confusing at the moment that we are using Slack title as the role here
  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });

  return token;
}

module.exports = createToken;
