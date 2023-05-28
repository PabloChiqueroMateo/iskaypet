import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { injectable } from "inversify";
import { dynamo } from '../../api/shared/services/aws/aws.provider';
import { GetPetsRepository } from "../domain";
import { AverageSpecies } from "../domain/models/average-age.model";
import { PetDynamoModel, PETS_TABLE_NAME } from "./models/pet.model.dynamo";

@injectable()
export class GetPetsDynamoRepository implements GetPetsRepository {
    private dynamoClient: DocumentClient;
    constructor() {
        this.dynamoClient = dynamo
    }


    async getPets(): Promise<PetDynamoModel[]> {
        try {
            const params = {
                TableName: PETS_TABLE_NAME,
            };

            const data = await this.dynamoClient.scan(params).promise();

            if (data.Items) {
                const pets: PetDynamoModel[] = data.Items.map((item) => ({
                    name: item.name,
                    specie: item.specie,
                    gender: item.gender,
                    birthDate: item.birthDate,
                }));
                return pets;
            } else {
                return [];
            }
        } catch (error) {
            console.log('ERROR GET PETS METHOD => ', error);
            throw new Error(error as any)
        }

    };

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

            const data = await this.dynamoClient.query(params).promise();

            const items = data.Items;
            const pets: PetDynamoModel[] = items ? items.map((e: any) => ({
                name: e.name,
                specie: e.specie,
                gender: e.gender,
                birthDate: e.birthDate
            })) : [];

            return pets;
        } catch (error) {
            throw error;
        }
    };

   
    async GetMostNumerousSpecies(): Promise<string> {
        try {
          const data = await this.dynamoClient.scan({ TableName: PETS_TABLE_NAME }).promise();

          const speciesCount: { [key: string]: number } = {};

          data.Items?.forEach((item: any) => {
            speciesCount[item.specie] = (speciesCount[item.specie] || 0) + 1;
          });

          let speciesMax = '';
          let maxFrequency = 0;

          for (const species in speciesCount) {
            if (speciesCount[species] > maxFrequency) {
              speciesMax = species;
              maxFrequency = speciesCount[species];
            }
          }

          return speciesMax;
        } catch (error) {
          throw new Error(error);
        }
      }


    async GetAverageAgeBySpecie(specie: string): Promise<AverageSpecies> {
        try {
            const params = {
                TableName: PETS_TABLE_NAME,
                FilterExpression: 'specie = :specie',
                ExpressionAttributeValues: {
                    ':specie': specie
                },
                ProjectionExpression: 'birthDate'
            };

            const data = await this.dynamoClient.scan(params).promise();

            let totalAge = 0;
            let totalRecords = 0;
            let totalAges: number[] = []

            data.Items?.forEach(item => {
                const part = item.birthDate.split('/');
                const day = parseInt(part[0]);
                const month = parseInt(part[1]) - 1;
                const year = parseInt(part[2]);

                const birthDate = new Date(year, month, day);

                const age = this.calculateAge(birthDate);
                totalAges.push(age);

                totalAge += age;
                totalRecords++;
            });

            const averageAge = totalAge / totalRecords;

            const standardDeviation = this.calculateStandardDeviation(totalAges);

            const averageSpecies: AverageSpecies = {
                averageAge: averageAge,
                standardDeviation: standardDeviation
            };

            return averageSpecies;
        } catch (error) {
            console.error('Error', error);
            throw error;
        }

    }

    private calculateStandardDeviation(ages: number[]): number {
        const average = ages.reduce((total, edad) => total + edad, 0) / ages.length;
        const differences = ages.reduce((total, edad) => total + Math.pow(edad - average, 2), 0);
        const variance = differences / ages.length;
        const standardDeviation = Math.sqrt(variance);

        return standardDeviation;
    }

    private calculateAge(birthDate: Date) {
        const diffMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(diffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}