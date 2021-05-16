module.exports = (req, res, next) => {
  console.log(`validInfo: ${JSON.stringify(req.body)}`);
  const { email, name, password } = req.body;

  // General Email Regex (RFC 5322 Official Standard)
  const validEmail = (userEmail) => {
    console.log(userEmail);
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      userEmail
    );
  };

  // check path and reject if any passed information is empty or email is invalid
  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  // continue if email is valid
  next();
};
