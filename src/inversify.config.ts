import "reflect-metadata";
import { Container } from 'inversify';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { CreatePetRepository, GetPetsRepository } from "./apps/contexts/domain";
import { CreatePet, GetAverageAgeBySpecie, GetMostNumerousSpecies, GetPets, GetPetsByName } from "./apps/contexts/application";
import { CreatePetDyanmoRepository, GetPetsDynamoRepository } from "./apps/contexts/infrastructure";

const container = new Container();
container.bind<DocumentClient>(DocumentClient).toConstantValue(new DocumentClient());

container.bind<CreatePet>(CreatePet).toSelf();
container.bind<CreatePetRepository>('CreatePetRepository').to(CreatePetDyanmoRepository);

container.bind<GetPets>(GetPets).toSelf();
container.bind<GetPetsByName>(GetPetsByName).toSelf();
container.bind<GetMostNumerousSpecies>(GetMostNumerousSpecies).toSelf();
container.bind<GetAverageAgeBySpecie>(GetAverageAgeBySpecie).toSelf();

container.bind<GetPetsRepository>('GetPetsRepository').to(GetPetsDynamoRepository);


export default container;
