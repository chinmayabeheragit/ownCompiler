class CodeGenerator {
    generate(node) {
        switch (node.type) {
            case 'Assignment':
                return `${node.variable} = ${this.generate(node.expr)}\n`;
            case 'BinaryOperation':
                return `${this.generate(node.left)} ${node.operator} ${this.generate(node.right)}`;
            case 'NumberLiteral':
                return node.value;
            case 'Variable':
                return node.name;
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }
}

module.exports = CodeGenerator;
