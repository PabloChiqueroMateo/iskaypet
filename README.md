# Iskaypet

this project is created for post pets, get list of pets, get pets by specie, get most numerous of species and get average age by specie.


# Technologies
    - nodejs
    - express
    - inversify

# dependencies
    - AWS (dynamoDB)

# how to run in local?
    - 1º: npm i 
    - 2º: create a .env file into src folder => ISKAYPET/src/.env and paste the env vars of the email.
    - type in your terminal => npm run serve
    - call from postman or similar


# postman

    - post:
        - URL: http://localhost:3003/createPet
        - BODY: {
                    "name": "lolo",
                    "specie": "dog",
                    "gender": "male",
                    "birthDate": "20/06/2014"
                }

    - get:
        - get pets: http://localhost:3003/pets
        - get pets by name: http://localhost:3003/pets?name=lima
        - get numerous species: http://localhost:3003/pets/most_numerous_species
        - get average age & standar deviation: http://localhost:3003/pets/species/average/dog