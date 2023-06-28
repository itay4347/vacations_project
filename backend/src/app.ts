import express from "express";
import expressFileUpload from 'express-fileupload';
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationsController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import CONFIG from './config';

const server = express();

server.use(cors({
    origin:CONFIG.FRONT_END_URL
}));
server.use(express.json());
server.use(expressFileUpload());
server.use("/api", vacationsController);
server.use("/api", authController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(CONFIG.PORT, () => {
    console.log(`listening on http://localhost:${CONFIG.PORT}`)
});