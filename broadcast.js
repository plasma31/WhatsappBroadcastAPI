const fs = require("fs");
var data = fs.readFileSync(__dirname + "/data.json");
const Path = require("path");
var contacts = Object.keys(JSON.parse(data));
const token = process.env.WHATSAPP_TOKEN;
const phone_no_id = process.env.PHONE_NO_ID;
const axios = require("axios").default;
for (let contact of contacts) {
  console.log(contact);
  var data = JSON.stringify({
    messaging_product: "whatsapp",
    to: contact,
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US",
      },
    },
  });

  var config = {
    method: "post",
    url: "https://graph.facebook.com/v13.0/" + phone_no_id + "/messages",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };
  
  console.log(config);

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(JSON.stringify(error));
    });
}
