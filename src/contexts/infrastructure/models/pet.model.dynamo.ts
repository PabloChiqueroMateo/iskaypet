export const PETS_TABLE_NAME = 'pets'

export type PetDynamoModel = {
    name: string;
    especie: string;
    gender: string;
    birthDate: string;
}