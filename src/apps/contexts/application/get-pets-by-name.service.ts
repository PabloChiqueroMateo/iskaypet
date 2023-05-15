import { inject, injectable } from "inversify";
import { GetPetsRepository } from "../domain";

@injectable()
export class GetPetsByName {
    constructor(@inject('GetPetsRepository') private getPetsRepository: GetPetsRepository) { }

    async run(name:string) {
        return this.getPetsRepository.getPetsByName(name);
    }
}