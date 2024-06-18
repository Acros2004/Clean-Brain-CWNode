import StaticClass from "../static/StaticClass.js";
import cloudinary from "cloudinary"
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js";

class ProcedureService{
    static async getAllProcedures(){
        const allProcedures = await StaticClass.unit.proceduresRepository.getAll();
        return allProcedures;
    }
    static async createProcedure(data){
        const {Name_Procedure,Price,Depiction,Spezialization_Procedure,Photo_Procedure} = data;
        const procedureData =  await StaticClass.unit.proceduresRepository.findByName(Name_Procedure);
        if (procedureData.length != 0){
          throw new Conflict("Процедура с таким названием уже существует");
        }
        const myCloud = await cloudinary.v2.uploader.upload(Photo_Procedure)
        const procedure = await StaticClass.unit.proceduresRepository.create({Name_Procedure,Depiction,Spezialization_Procedure,Price: parseInt(Price, 10),Photo_Procedure:myCloud.secure_url});
        return procedure;
    }

    static async updateProcedure(data){
        const {Id_Procedure,Name_Procedure,Price,Depiction,Spezialization_Procedure,Photo_Procedure} = data;
        
        const procedureData =  await StaticClass.unit.proceduresRepository.findByName(Name_Procedure);

        if (procedureData.length != 0){
            if(procedureData[0].Id_Procedure != Id_Procedure)
                throw new Conflict("Процедура с таким именем уже существует");
        }
        const myCloud = await cloudinary.v2.uploader.upload(Photo_Procedure)
        await StaticClass.unit.proceduresRepository.update(Id_Procedure,{Name_Procedure,Depiction,Spezialization_Procedure,Price: parseInt(Price, 10),Photo_Procedure:myCloud.secure_url});
        const procedure =  await StaticClass.unit.proceduresRepository.findById(Id_Procedure);
        return procedure;
    }

    static async deleteProcedure(Id_Procedure){
        const procedure = await StaticClass.unit.proceduresRepository.findById(Id_Procedure);
        if(!procedure)
            throw new Conflict("Процедуры не существует");
        await StaticClass.unit.bookingRepository.deleteByProcedureId(Id_Procedure);
        await StaticClass.unit.proceduresRepository.delete(Id_Procedure);
    }
    static async getProcedure(Id_Procedure){
        const procedure = await StaticClass.unit.proceduresRepository.findById(Id_Procedure);
        if(!procedure)
            throw new Conflict("Процедуры не существует");
        return procedure;
    }

  
}

export default ProcedureService;