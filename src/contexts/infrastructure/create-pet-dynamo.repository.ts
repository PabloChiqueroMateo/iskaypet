import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { injectable } from "inversify";
import { CreatePetRepository } from "../domain";
import { PetDynamoModel, PETS_TABLE_NAME } from "./models/pet.model.dynamo";
import { dynamo } from '../../../src/apps/api/shared/services/aws/aws.provider';

@injectable()
export class CreatePetDyanmoRepository implements CreatePetRepository {
    private dynamoClient: DocumentClient;

    constructor() {
        this.dynamoClient = dynamo;
    }


    async createPet(itemToInsert: PetDynamoModel): Promise<boolean> {
        const putInput: DocumentClient.PutItemInput = {
            Item: itemToInsert,
            TableName: PETS_TABLE_NAME
        };
        try {
            const result = await new Promise((resolve, reject) => {
                this.dynamoClient.put(putInput, (err) => {
                    if (err) {
                        console.log('errorrrr');
                        reject(err);
                    } else {
                        resolve(true);
                    }
                })
            });

            return Boolean(result);
        } catch (error) {
            throw error;
        }


    }
}