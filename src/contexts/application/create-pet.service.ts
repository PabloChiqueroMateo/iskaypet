import { inject, injectable } from "inversify";
import { CreatePetRepository } from "../domain";
import { Pet } from "../domain/models/pet.model";

@injectable()
export class CreatePet {
    constructor(
        @inject('CreatePetRepository') private petRepository: CreatePetRepository
        ) { }

    async run(createPetParams: Pet) {
        return this.petRepository.createPet(createPetParams);
    }
}