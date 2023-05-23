import { injectable } from "inversify";
import { GetPetsRepository } from "../domain";
import { PetDynamoModel, PETS_TABLE_NAME } from "./models/pet.model.dynamo";
import { dynamo } from '../../api/shared/services/aws/aws.provider';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { NumberCapability } from "aws-sdk/clients/sns";
import { AverageSpecies } from "../domain/models/average-age.model";

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
        } catch (error) {
            console.log('ERROR GET PETS METHOD => ', error);
            throw new Error(error as any)
        }

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
                            reject(err);
                        } else {
                            const items = data.Items;
                            const pets: PetDynamoModel[] = items ? items.map((e: any) => ({
                                name: e.name,
                                specie: e.specie,
                                gender: e.gender,
                                birthDate: e.birthDate
                            })) : [];

                            resolve(pets);
                        }
                    });
                }
            );

        } catch (error) {
            throw error;
        }
    }


    async GetMostNumerousSpecies(): Promise<string> {
        try {
            return await new Promise(
                async (resolve, reject) => {
                    return this.dynamoClient.scan({ TableName: PETS_TABLE_NAME }, (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            const speciesCount: any = {};

                            data.Items?.forEach(item => {
                                speciesCount[item.specie] = (speciesCount[item.specie] || 0) + 1;
                            });

                            let specieMax = '';
                            let maxFrecuency = 0;

                            for (const specie in speciesCount) {
                                if (speciesCount[specie] > maxFrecuency) {
                                    specieMax = specie;
                                    maxFrecuency = speciesCount[specie];
                                }
                            };
                         
                            resolve(specieMax);
                        }
                    });

                }
            )
        } catch (error) {
            throw new Error(error as any);
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

            const standarDeviation = this.calculateStandarDeviation(totalAges);

            const averageSpecies: AverageSpecies = {
                averageAge: averageAge,
                standarDeviation: standarDeviation
            };

            return averageSpecies;
        } catch (error) {
            console.error('Error', error);
            throw error;
        }

    }

    private calculateStandarDeviation(ages: number[]): number {
        const average = ages.reduce((total, edad) => total + edad, 0) / ages.length;
        const differences = ages.reduce((total, edad) => total + Math.pow(edad - average, 2), 0);
        const variance = differences / ages.length;
        const standarDeviation = Math.sqrt(variance);

        return standarDeviation;
    }

    private calculateAge(birthDate: Date) {
        const diffMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(diffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}