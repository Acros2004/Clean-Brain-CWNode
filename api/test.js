
import express from "express";
import cors from "cors";
import UnitOfWork from "./UnitOfWork/UnitOfWork.js";
import { PrismaClient } from '@prisma/client';
import StaticClass from "./static/StaticClass.js";


// const unit = new UnitOfWork();

// const app = express();

// app.listen(3001, ()=>{
//     console.log(`Server is running on port ${3001}`);
// })

// const PrismaClient1 = new PrismaClient();

// const check = async() =>{
//     PrismaClient1.Client.findUnique({ where: { Id_client : 1 } });
// }
// const checkArray = async() =>{
//     check();
//     check();
//     check();
// }
// checkArray();
// app.use(express.json())

// app.use(cors());

// app.get('/abonnements', async (req, res) =>{
//     const abonnements = await unit.clientRepository.getAll();
//     console.log('abonnements: '+JSON.stringify(abonnements, null, 2));

//     res.status(200).json(abonnements);
// })



console.log(await StaticClass.unit.psychologistRepository.findByIdWithAllInfo(12))