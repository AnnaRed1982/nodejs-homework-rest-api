const elasticemail = require("elasticemail");
require("dotenv").config();

const client = elasticemail.createClient({
  username: "Anna",
  apiKey: process.env.EM_APIKEY_PRIVATE,
});

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "annared1982@gmail.com",
    from_name: "Anna",
  };
  await client.mailer.send(email, function (err, result) {
    if (err) {
      return console.error(err);
    }
    console.log(result);
  });
  return true;
};

module.exports = sendEmail;
