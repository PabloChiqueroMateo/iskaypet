import { PetDynamoModel } from "../../infrastructure/models/pet.model.dynamo";

export interface GetPetsRepository {

    getPets(): Promise<PetDynamoModel[]>;

    getPetsByName(name:string): Promise<PetDynamoModel[]>;

    getMostNumerousEspecies(): Promise<string>;
}