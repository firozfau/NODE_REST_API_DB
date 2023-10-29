const app = require("./app");
const config = require("./config/config");
const server_port = config.app.port;
 


app.listen(server_port, () => {
    console.log(`Server is running at http://localhost:${server_port}`);
});

