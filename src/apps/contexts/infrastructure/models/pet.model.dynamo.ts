export const PETS_TABLE_NAME = 'pets';

export type PetDynamoModel = {
    name: string;
    specie: string;
    gender: string;
    birthDate: string;
}