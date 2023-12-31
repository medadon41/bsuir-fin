import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const routesDir = resolve('src/routes/')
const currentDir = dirname(fileURLToPath(import.meta.url))

const doc = {
    info: {
        title: 'Fin project api',
        description: 'yet another api, now on express'
    },
    host: 'localhost:5000',
    schemes: ['http']
}

const outputFile = join(currentDir, 'swagger_output.json')
const endpointsFiles = ['../../app.js']

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(({ success }) => {
    console.log(`Generated: ${success}`)
})