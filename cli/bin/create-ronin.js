#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { chmodSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const binary = join(__dirname, 'create-ronin');

// Ensure the binary is executable
chmodSync(binary, '755');

// Run the Rust binary and forward CLI arguments
const process = spawn(binary, process.argv.slice(2), { stdio: 'inherit' });

process.on('exit', (code) => {
    process.exit(code);
});
