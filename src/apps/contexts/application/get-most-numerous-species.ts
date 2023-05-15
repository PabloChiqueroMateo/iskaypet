import { inject, injectable } from "inversify";
import { GetPetsRepository } from "../domain";

@injectable()
export class GetMostNumerousSpecies {

    constructor(@inject('GetPetsRepository') private getPetsRepository: GetPetsRepository) { }
    
    async run() {
        return await this.getPetsRepository.GetMostNumerousSpecies();
    }
}