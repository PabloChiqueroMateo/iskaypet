import { Container } from "inversify";
import { CreatePetDyanmoRepository } from '../../../apps/contexts/infrastructure/create-pet-dynamo.repository';
import { PetDynamoModel } from "../../../apps/contexts/infrastructure/models/pet.model.dynamo";
import { PetsModule } from "../../../apps/contexts/pets.module";
import { createTestingModule } from "../../lib/create-testing-module";
import { dynamo } from "../../../apps/api/shared/services/aws/aws.provider";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

describe('CreatePetDyanmoRepository', () => {
  let container: Container;
  let repo: CreatePetDyanmoRepository;
  let mockPut = jest.fn();

  beforeEach(() => {
    container = createTestingModule(PetsModule);
    repo = container.resolve(CreatePetDyanmoRepository);

    (dynamo as DocumentClient).put = mockPut;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("createPet", () => {
    it('should return a true because the put is okay', async () => {

      const itemToInsert: PetDynamoModel = {
        name: 'asdasd',
        specie: 'Dog',
        gender: 'Male',
        birthDate: '2022-01-01'
      };

      mockPut.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({ Items: true })
      });

      const result = await repo.createPet(itemToInsert);
      expect(result).toBe(true)
    }, 100000);


    it('should return a false because the put is a error', async () => {

      const itemToInsert: PetDynamoModel = {
        name: 'asdasd',
        specie: 'Dog',
        gender: 'Male',
        birthDate: '2022-01-01'
      };

      const errorMessage = 'Scan error';
      mockPut.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error(errorMessage))
      });

      await expect(repo.createPet(itemToInsert as PetDynamoModel)).rejects.toThrow(errorMessage);
    }, 100000);
  });
})