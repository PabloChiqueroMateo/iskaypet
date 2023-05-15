import { inject, injectable } from "inversify";
import { GetPetsRepository } from "../domain";

@injectable()
export class GetPets {
    constructor(@inject('GetPetsRepository') private getPetsRepository: GetPetsRepository) { }

    async run() {
        return this.getPetsRepository.getPets()
    }
}