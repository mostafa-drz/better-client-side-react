const fetch = require("node-fetch");

const body = {
  messageId: "new-version",
  messageBody: {
    version: "1.1.1",
  },
};

fetch("https://thawing-depths-04303.herokuapp.com/api/message", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})
  .then((resp) => resp.text())
  .then((data) => console.log(data))
  .catch((error) => console.log("Ooops", error));
