import { inject, injectable } from "inversify";
import { GetPetsRepository } from "../domain";

@injectable()
export class GetAverageAgeBySpecie {
    constructor(@inject('GetPetsRepository') private getPetsRepository: GetPetsRepository) { }

    async run(specie: string) {
        return await this.getPetsRepository.GetAverageAgeBySpecie(specie);
    }
}