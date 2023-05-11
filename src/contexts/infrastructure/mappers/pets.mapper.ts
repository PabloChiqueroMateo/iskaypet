import { PetDynamoModel } from "../models/pet.model.dynamo";

export class PetsMapper {

    public static async mapPets(data: any): Promise<PetDynamoModel> {
        return {
            name: data.name,
            specie: data.specie,
            gender: data.gender,
            birthDate: data.birthDate
        }
    }
}