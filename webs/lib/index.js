import Hapi from "hapi"
import inert from "inert"
import { CreateNetworkRoute } from './routes/NetworkRoutes'
import { StatusRoute } from './routes/PlatformRoutes'

const server = new Hapi.Server();

server.connection({
    port: 4343
});
server.register(inert, err => {

    if (err)
        throw err;

    server.route(StatusRoute);
    server.route(CreateNetworkRoute);

    // Start the server
    server.start(err => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});