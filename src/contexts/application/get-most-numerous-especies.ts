import { inject, injectable } from "inversify";
import { GetPetsRepository } from "../domain";

@injectable()
export class GetMostNumerousEspecies {

    constructor(@inject('GetPetsRepository') private getPetsRepository: GetPetsRepository) { }
    
    async run() {
        return await this.getPetsRepository.getMostNumerousEspecies();
    }
}