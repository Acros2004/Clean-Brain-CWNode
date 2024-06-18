import StaticClass from "../static/StaticClass.js";

class CollectionSpezializationService{
    static async createCollectionSpezialization(Id_Psychologist,data){
        for (const spezializationName of data) {
            await StaticClass.unit.collectionSpezializationRepository.create(Id_Psychologist,spezializationName);
        };
    }
    static async updateCollectionSpezialization(Id_Psychologist,data){
        await StaticClass.unit.collectionSpezializationRepository.deleteByPsychologistId(Id_Psychologist);
        for (const spezializationName of data) {
            await StaticClass.unit.collectionSpezializationRepository.create(Id_Psychologist,spezializationName);
        };
    }
    static async deleteCollectionSpezialization(Id_Psychologist){
        await StaticClass.unit.collectionSpezializationRepository.deleteByPsychologistId(Id_Psychologist);
    }
}

export default CollectionSpezializationService;