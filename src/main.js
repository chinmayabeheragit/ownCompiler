const Lexer = require('../src/lexer');
const Parser = require('../src/parser');
const CodeGenerator = require('../src/codeGenerator');
const fs = require('fs');

// Read the input code from a file (or use direct input)
const path = require('path');
const inputCode = fs.readFileSync(path.join(__dirname, '../test/exampleCode.txt'), 'utf8');

// Lexing -> Parsing -> Code Generation Pipeline
const lexer = new Lexer(inputCode);
const parser = new Parser(lexer);
const ast = parser.parse();
const codegen = new CodeGenerator();
const outputCode = codegen.generate(ast);

// Output the generated code
console.log(outputCode);
