import { PetDynamoModel } from "../../infrastructure/models/pet.model.dynamo";

export interface GetPetsRepository {

    getPets(): Promise<PetDynamoModel[]>;

    getPetsById(id:string): Promise<PetDynamoModel[]>;
}