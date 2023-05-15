import { PetDynamoModel } from "../../infrastructure/models/pet.model.dynamo";
import { AverageSpecies } from "../models/average-age.model";

export interface GetPetsRepository {

    getPets(): Promise<PetDynamoModel[]>;

    getPetsByName(name:string): Promise<PetDynamoModel[]>;

    GetMostNumerousSpecies(): Promise<string>;

    GetAverageAgeBySpecie(specie:string): Promise<AverageSpecies>;
}