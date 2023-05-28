import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { injectable } from "inversify";
import { CreatePetRepository } from "../domain";
import { PetDynamoModel, PETS_TABLE_NAME } from "./models/pet.model.dynamo";
import { dynamo } from '../../api/shared/services/aws/aws.provider';

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
            const data = await this.dynamoClient.put(putInput).promise();        
            return true;
          } catch (error) {
            throw error;
          }
    }
}