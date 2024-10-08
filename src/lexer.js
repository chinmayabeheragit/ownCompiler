class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.currentChar = this.input[this.position];
    }

    advance() {
        this.position++;
        this.currentChar = this.position >= this.input.length ? null : this.input[this.position];
    }

    skipWhitespace() {
        while (this.currentChar && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    getNextToken() {
        while (this.currentChar) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (/\d/.test(this.currentChar)) {
                return this.number();
            }

            if (this.currentChar === '+') {
                this.advance();
                return { type: 'PLUS', value: '+' };
            }

            if (this.currentChar === '-') {
                this.advance();
                return { type: 'MINUS', value: '-' };
            }

            if (this.currentChar === '*') {
                this.advance();
                return { type: 'MUL', value: '*' };
            }

            if (this.currentChar === '/') {
                this.advance();
                return { type: 'DIV', value: '/' };
            }

            if (this.currentChar === '=') {
                this.advance();
                return { type: 'EQUALS', value: '=' };
            }

            if (this.currentChar === '(') {
                this.advance();
                return { type: 'LPAREN', value: '(' };
            }

            if (this.currentChar === ')') {
                this.advance();
                return { type: 'RPAREN', value: ')' };
            }

            if (this.currentChar === ';') {
                this.advance();
                return { type: 'SEMI', value: ';' };
            }

            if (/[a-zA-Z_]/.test(this.currentChar)) {
                return this.identifier();
            }

            throw new Error(`Unknown character: ${this.currentChar}`);
        }

        return { type: 'EOF', value: null };
    }

    number() {
        let result = '';
        while (this.currentChar && /\d/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return { type: 'NUMBER', value: Number(result) };
    }

    identifier() {
        let result = '';
        while (this.currentChar && /[a-zA-Z_]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return { type: 'IDENTIFIER', value: result };
    }
}

module.exports = Lexer;
