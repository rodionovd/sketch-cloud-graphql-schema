#!/usr/bin/env node

const fs = require('node:fs');
const { normalizeGQLSource } = require('@autotelic/graphql-schema-tools');

if (process.argv.length < 3) {
    console.error('Expected a .graphql file path as an argument');
    process.exit(1);
}

const schemaPath = process.argv[2];
try {
    const schema = fs.readFileSync(schemaPath, 'utf8').toString();
    const { source, error } = normalizeGQLSource(schema);
    if (error != null) {
        console.error(error);
        process.exit(1);
    }
    try {
        fs.writeFileSync(schemaPath, source);
    } catch (error) {
        console.error(`Could not write the output schema: ${error}`);
        process.exit(1);
    }
} catch (error) {
    console.error(`Could not read the input schema: ${error}`);
    process.exit(1);
}
