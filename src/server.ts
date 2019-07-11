import app from "./app";

const server = app.listen(app.get("port"), () => {
  console.log(  "Example app listening on port 3000!");
});

export default server;
