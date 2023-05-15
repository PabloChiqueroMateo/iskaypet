import { PetDynamoModel } from "../../infrastructure/models/pet.model.dynamo";

export interface CreatePetRepository {
    createPet(itemToInsert: PetDynamoModel): Promise<boolean>;
}