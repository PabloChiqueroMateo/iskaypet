import "reflect-metadata";
import { Container } from 'inversify';

import { CreatePetRepository, GetPetsRepository } from "../../contexts/domain";
import { CreatePetDyanmoRepository, GetPetsDynamoRepository } from "../../contexts/infrastructure";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { CreatePet, GetPets, GetPetsByName } from "../../contexts/application";

const container = new Container();
container.bind<DocumentClient>(DocumentClient).toConstantValue(new DocumentClient());

container.bind<CreatePet>(CreatePet).toSelf();
container.bind<CreatePetRepository>('CreatePetRepository').to(CreatePetDyanmoRepository);

container.bind<GetPets>(GetPets).toSelf();
container.bind<GetPetsByName>(GetPetsByName).toSelf();
container.bind<GetPetsRepository>('GetPetsRepository').to(GetPetsDynamoRepository);


export default container;
