import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:42069',
    documents: ['**/*.tsx'],
    ignoreNoDocuments: true,
    generates: {
        './graphql/': {
            preset: 'client',
            config: {
                documentMode: 'string'
            }
        },
        './schema.graphql': {
            plugins: ['schema-ast'],
            config: {
                includeDirectives: true
            }
        }
    }
}

export default config