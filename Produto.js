export class Produto {
    #descricao;
    #preco;
    #qtdEstoque;
    #vetVendas; //vetor de 6 posições com as quantidades vendidas entre os meses de Jan e Jun

    constructor(descricao, preco = 0.0, qtdEstoque = 0.0,
                vetVendas = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]) {
        this.#descricao = descricao.toUpperCase();
        this.#preco = (preco >= 0) ? preco : 0;
        this.#qtdEstoque = (qtdEstoque >= 0) ? qtdEstoque : 0;
        
        if(vetVendas.length == 6) {
            let temNegativo = false;
            for(let i = 0; i < vetVendas.length && temNegativo == false; i++){
                if (vetVendas[i] < 0){
                    temNegativo = true;
                }
            }

            if (temNegativo){
                this.#vetVendas = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
            } else {
                this.#vetVendas = vetVendas;
            }
        } else {
            this.#vetVendas = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        }
    }

    get descricao(){
        return this.#descricao;
    }

    get preco(){
        return this.#preco;
    }

    set preco(_preco){
        if (_preco >= 0){
            this.#preco = _preco;
        }
    }
    
    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(_qtdEstoque){
        if (_qtdEstoque >= 0){
            this.#qtdEstoque = _qtdEstoque;
        }
    }

    setQtdVendasMes (qtd, mes){
        if(qtd >= 0 && mes >= 1 && mes <= this.#vetVendas.length){
            this.#vetVendas[mes-1] = qtd;
            return true;
        }
        return false;
    }

    getQtdVendasMes(mes){
        //retorna a quantidade vendida do produto no mês informados
        //ou retorna -1, caso o mês não exista

        if (mes > 0 && mes <= this.#vetVendas.length){
            return this.#vetVendas[mes-1];
        }
        return -1;
    }

    lengthVetVendas(){
        return this.#vetVendas.length;
    }

    /**
     * Soma as vendas efetuadas entre mesInic e mesFinal
     * @example objProduto.getVendasPeriodo(1, 6)
     * @param {int} mesInic 
     * @param {int} mesFinal 
     * @returns Quantidade vendida do produto no mês informados
       ou retorna -1, caso o mês não exista
     */
    
    getVendasPeriodo(mesInic, mesFinal){
        let somaVendas = -1;
        if (mesInic > 0 && mesInic <= this.#vetVendas.length &&
            mesFinal >= mesInic && mesFinal <= this.#vetVendas.length){
            
            somaVendas = 0
            for (let i = mesInic - 1; i <= mesFinal - 1; i++){
                somaVendas += this.#vetVendas[i];
            }
        }
        return somaVendas;
    }
}


var prod1 = new Produto("Jujuba", 2.0, 30, [0.0, -2.0, 3.0, 4.0, -5.0, 0.0]);
console.log(prod1);

console.log ("Alteração Qtd_Mês de Prod1: ", prod1.setQtdVendasMes(5, 1) );
console.log(prod1);

console.log ("Alteração Qtd_Mês de Prod1: ", prod1.setQtdVendasMes(10, 7) );
console.log(prod1);

prod1.preco = -1.5;
console.log ("Novo preço de Prod1: ", prod1.preco);
