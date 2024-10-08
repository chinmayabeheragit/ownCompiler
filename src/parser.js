class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  parse() {
    const ast = { type: 'Program', body: [] };
    while (this.currentToken) {
      ast.body.push(this.parseStatement());
    }
    return ast;
  }

  parseStatement() {
    if (this.currentToken.type === 'LET') {
      return this.parseVariableDeclaration();
    }
  }

  parseVariableDeclaration() {
    this.eat('LET');
    const identifier = this.eat('IDENTIFIER');
    this.eat('ASSIGN');  // Changed from 'EQUALS' to 'ASSIGN'
    const expression = this.parseExpression();
    this.eat('SEMICOLON');
    return {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: identifier.value },
      init: expression,
    };
  }

  parseExpression() {
    const left = this.eat('NUMBER');
    const operator = this.eat('PLUS');
    const right = this.eat('NUMBER');
    return {
      type: 'BinaryExpression',
      operator: operator.value,
      left: { type: 'Literal', value: Number(left.value) },
      right: { type: 'Literal', value: Number(right.value) },
    };
  }

  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      const token = this.currentToken;
      this.currentToken = this.lexer.getNextToken();
      return token;
    } else {
      throw new Error(`Expected token ${tokenType}, got ${this.currentToken.type}`);
    }
  }
}

module.exports = Parser;
