import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Fingerprint from "express-fingerprint";
import cookieParser from "cookie-parser";
import AuthRootRouter from "./routers/Auth.js"
import PsychologistRootRouter from "./routers/Psychologist.js"
import ProcedureRootRouter from "./routers/Procedure.js"
import AcademicRootRouter from "./routers/AcademicDegree.js"
import ReviewRootRouter from "./routers/Review.js"
import SpecializationRootRouter from "./routers/Specialization.js"
import TokenService from "./services/Token.js";
import ClientRootRouter from "./routers/Client.js"
import AdminRootRouter from "./routers/Admin.js"
import {v2 as cloudinary} from "cloudinary"
import bodyParser from "body-parser"
import { Server } from "socket.io"
import https from "https"
import fs from "fs"
import { setTimerNotifyUsers } from "./utils/Timer.js";


import SocketService from "./services/Socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const options = {
  key: fs.readFileSync("./cert/localhost-key.pem"),
  cert: fs.readFileSync("./cert/localhost.pem")
}
const server = https.createServer(options, app);
const io = new Server(server,{
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
}
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
 });

 

app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

// Увеличение максимального размера тела запроса до 50 мегабайт
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

app.use("/auth", AuthRootRouter);
app.use("/client",TokenService.checkAccess, ClientRootRouter);
app.use("/admin",TokenService.checkAccessAdmin, AdminRootRouter);
app.use("/psychologist", PsychologistRootRouter);
app.use("/procedure", ProcedureRootRouter);
app.use("/academicdegree", AcademicRootRouter);
app.use("/specialization", SpecializationRootRouter);
app.use("/review",ReviewRootRouter);


io.use(TokenService.socketCheckAccess)
io.on('connection', (socket) => {
  socket.on('get-user-data', async() => {
    console.log('Запрос данных пользователя с ID:', socket.user.Id_client);
    await SocketService.addUser(socket.user.Id_client,socket.id);
  });
  socket.on('disconnect', async() => {
    await SocketService.deleteUser(socket.id);
  });
});
setTimerNotifyUsers(io);



server.listen(PORT, () => {
  console.log("Сервер успешно запущен");
});
