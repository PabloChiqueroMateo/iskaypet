import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['../routes/pets/*.ts'],
    paths: {
        '/createPet': {
            post: {
                tags: ['Pets'],
                summary: 'Crear una nueva mascota',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    specie: { type: 'string' },
                                    gender: { type: 'string' },
                                    birthDate: { type: 'string' },
                                },
                                required: ['name', 'specie', 'gender', 'birthDate'],
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Pet creada con éxito',
                    },
                    '400': {
                        description: 'Datos de pet no válidos',
                    },
                    '500': {
                        description: 'Error del servidor',
                    },
                },
            },
        },
        '/pets': {
            get: {
                tags: ['Pets'],
                summary: 'Obtener todas las mascotas',
                responses: {
                    '200': {
                        description: 'Mascotas obtenidas con éxito',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Pet',
                                    },
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Error del servidor',
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            Pet: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    specie: { type: 'string' },
                    gender: { type: 'string' },
                    birthDate: { type: 'string' },
                },
                required: ['name', 'specie', 'gender', 'birthDate'],
            },
        },
    },

};

const specs = swaggerJsdoc(options);

export default specs;