import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Container } from 'inversify';
import { dynamo } from '../../../apps/api/shared/services/aws/aws.provider';
import { GetPetsDynamoRepository } from '../../../apps/contexts/infrastructure/get-pets-dynamo.repository';
import { PetsModule } from '../../../apps/contexts/pets.module';
import { createTestingModule } from '../../lib/create-testing-module';
import { PETS_RESPONSE } from './mocks/get-pets.mocks';


describe("GetPetsDynamoRepository", () => {
  let repo: GetPetsDynamoRepository;
  let container: Container;
  let mockScan = jest.fn();
  let mockQuery = jest.fn();

  beforeEach(() => {
    container = createTestingModule(PetsModule);
    repo = container.resolve(GetPetsDynamoRepository);
    mockScan = jest.fn();
    mockQuery = jest.fn();
    (dynamo as DocumentClient).scan = mockScan;
    (dynamo as DocumentClient).query = mockQuery;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe("getPets", () => {

    it('should return a list of getPets correct', async () => {
      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({ Items: PETS_RESPONSE })
      });

      const pets = await repo.getPets();
      expect(pets).toHaveLength(PETS_RESPONSE.length);
      expect(pets).toStrictEqual(PETS_RESPONSE);
    }, 20000);

    it('should return a list empty of getPets correct', async () => {
      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({ Items: [] })
      });

      const pets = await repo.getPets();
      expect(pets).toHaveLength(0);
      expect(pets).toStrictEqual([]);
    }, 20000);

    it('should return a error ', async () => {
      const errorMessage = 'Scan error';

      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error(errorMessage))
      });

      await expect(repo.getPets()).rejects.toThrow(errorMessage);
    }, 20000);
  });

  describe("getPetsByName", () => {
    it("should return a pet correct", async () => {
      const namePet = "Fluffy";

      const mockData = {
        Items: [
          {
            name: "Fluffy",
            specie: "Dog",
            gender: "Male",
            birthDate: "2022-01-01"
          }
        ]
      };

      const expectedPets: any[] = [
        {
          name: "Fluffy",
          specie: "Dog",
          gender: "Male",
          birthDate: "2022-01-01"
        }
      ];

      mockQuery.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce(mockData)
      });

      const pets = await repo.getPetsByName(namePet);

      expect(mockQuery).toHaveBeenCalledWith({
        TableName: expect.any(String),
        KeyConditionExpression: '#name = :name',
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        ExpressionAttributeValues: {
          ':name': namePet,
        },
      });

      expect(pets).toEqual(expectedPets);
    }, 20000);

    it('should return an empty array when no pets are found', async () => {
      const namePet = "Fluffy";

      const mockDataEmpty = {
        Items: [] as any[]
      };

      mockQuery.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce(mockDataEmpty)
      });

      const expectedPets: any[] = [];

      const pets = await repo.getPetsByName(namePet);

      expect(mockQuery).toHaveBeenCalledWith({
        TableName: expect.any(String),
        KeyConditionExpression: '#name = :name',
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        ExpressionAttributeValues: {
          ':name': namePet,
        },
      });

      expect(pets).toEqual(expectedPets);
    });

    it('should throw an error when there is an error querying pets', async () => {
      const namePet = "Fluffy";
      const errorMessage = "Error querying pets";

      mockQuery.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error(errorMessage))
      });

      await expect(repo.getPetsByName(namePet)).rejects.toThrowError(errorMessage);

      expect(mockQuery).toHaveBeenCalledWith({
        TableName: expect.any(String),
        KeyConditionExpression: '#name = :name',
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        ExpressionAttributeValues: {
          ':name': namePet,
        },
      });
    });
  });


  describe("GetMostNumerousSpecies", () => {
    it('should return the most numerous species', async () => {
      const items = [
        { specie: 'cat' },
        { specie: 'dog' },
        { specie: 'cat' },
        { specie: 'dog' },
        { specie: 'dog' },
      ];

      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({ Items: items })
      });

      const result = await repo.GetMostNumerousSpecies();
      console.log('Result:', result);

      expect(result).toBe('dog');
      expect(mockScan).toHaveBeenCalledWith({ TableName: expect.any(String) });
    });

    it('should throw an error', async () => {
      const error = new Error('Scan error');
      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(error)
      });

      await expect(repo.GetMostNumerousSpecies()).rejects.toThrowError("Error: Scan error");
      expect(mockScan).toHaveBeenCalledWith({ TableName: expect.any(String) });
    });
  });

  describe("GetAverageAgeBySpecie", () => {
    it('should return the correct average age and standard deviation for a given specie', async () => {
      const specie = 'Dog';
      const items = [
        { birthDate: '01/01/2010' },
        { birthDate: '02/02/2011' },
        { birthDate: '03/03/2012' }
      ];
      const expectedAverageAge = 12;
      const expectedStandardDeviation = 0.816496580927726;

      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({ Items: items })
      });

      const result = await repo.GetAverageAgeBySpecie(specie);

      expect(mockScan).toHaveBeenCalledWith({
        TableName: expect.any(String),
        FilterExpression: 'specie = :specie',
        ExpressionAttributeValues: {
          ':specie': specie
        },
        ProjectionExpression: 'birthDate'
      });
      expect(result.averageAge).toBe(expectedAverageAge);
      expect(result.standardDeviation).toBe(expectedStandardDeviation);
    });

    it('should throw an error because scan fail', async () => {
      const specie = 'Dog';
      const error = new Error('Scan error');

      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(error)
      });

      await expect(repo.GetAverageAgeBySpecie(specie)).rejects.toThrowError(error);
      expect(mockScan).toHaveBeenCalledWith({
        TableName: expect.any(String),
        FilterExpression: 'specie = :specie',
        ExpressionAttributeValues: {
          ':specie': specie
        },
        ProjectionExpression: 'birthDate'
      });
    });
  });

});
