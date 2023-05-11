import { injectable } from "inversify";
import { GetPetsRepository } from "../domain";
import { PetDynamoModel, PETS_TABLE_NAME } from "./models/pet.model.dynamo";
import { dynamo } from '../../../src/apps/api/shared/services/aws/aws.provider';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { PetsMapper } from "./mappers/pets.mapper";

@injectable()
export class GetPetsDynamoRepository implements GetPetsRepository {
    private dynamoClient: DocumentClient;
    constructor() {
        this.dynamoClient = dynamo
    }


    async getPets(): Promise<PetDynamoModel[]> {

        const params = {
            TableName: PETS_TABLE_NAME,
        };
        return await new Promise(
            async (resolve, reject) => {
                return this.dynamoClient.scan(params, (error, data) => {
                    if (error) {
                        console.error('Error al realizar la operación Scan:', error);
                        reject(error)
                    } else {
                        console.log('Elementos de la tabla:', data.Items);
                        const pets: PetDynamoModel[] = data.Items ? data.Items.map((item) => ({
                            name: item.name,
                            specie: item.specie,
                            gender: item.gender,
                            birthDate: item.birthDate
                        })) : [];

                        resolve(pets);
                    }
                });
            }
        );
    }

    async getPetsById(id: string): Promise<PetDynamoModel[]> {
        try {
            let array: PetDynamoModel[] = [];
            // const params: DocumentClient.QueryInput = {
            //     TableName: PETS_TABLE_NAME,

            // }

            // let params: DocumentClient.GetItemInput = {
            //     TableName: PETS_TABLE_NAME,
            //     Key: {
            //         nickname: itemToGet.nickname,
            //     },
            // }
            return array;

        } catch (error) {
            throw error;
        }
    }
}