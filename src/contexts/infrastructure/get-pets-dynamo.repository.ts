import { injectable } from "inversify";
import { GetPetsRepository } from "../domain";
import { PetDynamoModel, PETS_TABLE_NAME } from "./models/pet.model.dynamo";
import { dynamo } from '../../../src/apps/api/shared/services/aws/aws.provider';
import { DocumentClient } from "aws-sdk/clients/dynamodb";

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
                        console.error('Error Scan', error);
                        reject(error)
                    } else {
                        console.log('Elements', data.Items);
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

    async getPetsByName(namePet: string): Promise<PetDynamoModel[]> {
        try {
            const params = {
                TableName: PETS_TABLE_NAME,
                KeyConditionExpression: '#name = :name',
                ExpressionAttributeNames: {
                    '#name': 'name',
                },
                ExpressionAttributeValues: {
                    ':name': namePet,
                },
            };

            return await new Promise(
                async (resolve, reject) => {
                    return this.dynamoClient.query(params, function (err, data) {
                        if (err) {
                            console.error('Error query:', err);
                            reject(err);
                        } else {
                            const items = data.Items;
                            const pets: PetDynamoModel[] = items ? items.map((e: any) => ({
                                name: e.name,
                                specie: e.specie,
                                gender: e.gender,
                                birthDate: e.birthDate
                            })) : [];
                            console.log('Elements:', items);
                            resolve(pets);
                        }
                    });
                }
            );

        } catch (error) {
            throw error;
        }
    }
}