import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ContainerModule } from "inversify";
import { CreatePet } from "./application/create-pet.service";
import { GetAverageAgeBySpecie } from "./application/get-average-age-by-specie";
import { GetMostNumerousSpecies } from "./application/get-most-numerous-species";
import { GetPetsByName } from "./application/get-pets-by-name.service";
import { GetPets } from "./application/get-pets.service";
import { CreatePetRepository } from "./domain/repositories/create-pet.repository";
import { GetPetsRepository } from "./domain/repositories/get-pets.repository";
import { CreatePetDyanmoRepository } from "./infrastructure/create-pet-dynamo.repository";
import { GetPetsDynamoRepository } from "./infrastructure/get-pets-dynamo.repository";

export class PetsModule extends ContainerModule {
    public constructor() {
        super((bind) => {

            bind<DocumentClient>(DocumentClient).toConstantValue(new DocumentClient());
            bind<CreatePet>(CreatePet).toSelf();
            bind<CreatePetRepository>('CreatePetRepository').to(CreatePetDyanmoRepository);
            bind<GetPets>(GetPets).toSelf();
            bind<GetPetsByName>(GetPetsByName).toSelf();
            bind<GetMostNumerousSpecies>(GetMostNumerousSpecies).toSelf();
            bind<GetAverageAgeBySpecie>(GetAverageAgeBySpecie).toSelf();
            bind<GetPetsRepository>('GetPetsRepository').to(GetPetsDynamoRepository);

        })
    }
}