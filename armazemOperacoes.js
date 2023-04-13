import { Produto } from "./Produto.js";

export var vetProdutos;
export var vetMeses;

export function carregarDados() {
    vetMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

    vetProdutos = [
        new Produto("Abacaxi", 5, 10, [17, 15, 11, 10, 3, 9]),
        new Produto("Chocolate", 4, 30, [15, 0, 16, 9, 1, 20]),
        new Produto("Café", 12.5, 15, [19, 12, 17, 4, 12, 16]),
        new Produto("Xampu", 22, 12, [2, 8, 4, 16, 18, 0]),
        new Produto("Sabão em pó", 17, 10, [3, 4, 1, 15, 17, 2]),
        new Produto("Detergente", 6, 16, [11, 20, 15, 8, 20, 11]),
        new Produto("Maçã", 16.9, 32, [10, 6, 8, 18, 7, 4]),
        new Produto("Iogurte", 4, 4, [2, 17, 16, 7, 16, 4]),
        new Produto("Frango", 30, 25, [15, 16, 2, 5, 1, 13]),
        new Produto("Picanha", 60, 3, [6, 11, 5, 1, 3, 15]),
        new Produto("Pasta de dente", 12, 20, [3, 6, 19, 0, 8, 1]),
        new Produto("Desodorante", 13, 10, [5, 9, 16, 12, 13, 3]),
        new Produto("Alface", 2, 12, [15, 20, 19, 17, 9, 1]),
        new Produto("Geléia", 24, 18, [19, 20, 13, 14, 12, 9]),
        new Produto("Duzia de ovos", 8, 10, [1, 8, 4, 10, 19, 19]),
        new Produto("Cerveja", 5, 18, [10, 13, 9, 0, 9, 13]),
        new Produto("Trigo", 6, 15, [1, 7, 2, 10, 16, 10]),
        new Produto("Milho de pipoca", 7.5, 7, [14, 2, 14, 10, 7, 0]),
        new Produto("Biscoito", 2.6, 10, [11, 10, 7, 12, 3, 4]),
        new Produto("Achocolatado", 11.7, 10, [4, 11, 6, 8, 10, 15])
    ]

}

export function criarTableHtml(vetProdutos, vetMeses) {
    
    //esta function retorna null caso haja erro nos parâmetros
    //por exemplo: vetProdutos não tenha elementos ou tamanho
    // de vetVendas do produto e vetMeses não compatíveis.

    if (vetProdutos.length > 0 && vetMeses.length == vetProdutos[0].lengthVetVendas()) {
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        //criando a primeira célula da thead com elemento de texto vazio
        thead.appendChild(document.createElement("th"));

        for (let i = 0; i < vetMeses.length; i++) {
            let th = document.createElement("th");
            th.textContent = vetMeses[i];
            thead.appendChild(th);
        }

        table.appendChild(thead);

        thead.appendChild(document.createElement("th")).textContent = "Qtd Estoque";
        thead.appendChild(document.createElement("th")).textContent = "Preço";
        thead.appendChild(document.createElement("th")).textContent = "Total";


        for (let lin = 0; lin < vetProdutos.length; lin++) {

            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = vetProdutos[lin].descricao;
            tr.appendChild(td);


            for (let col = 1; col <= vetProdutos[lin].lengthVetVendas(); col++) {

                //os meses para usar objProduto.getQtdVendasMes(mes), são de 1 a 6
                td = document.createElement("td");
                td.textContent = vetProdutos[lin].getQtdVendasMes(col);
                tr.appendChild(td);

            }

            var qtd = document.createElement("td");
            qtd.textContent = vetProdutos[lin].qtdEstoque;
            tr.appendChild(qtd);


            var preco = document.createElement("td");
            preco.textContent = vetProdutos[lin].preco;
            tr.appendChild(preco);

            var total = document.createElement("td");
            total.textContent = vetProdutos[lin].getVendasPeriodo(1, 6);
            tr.appendChild(total);


            tbody.appendChild(tr);

        }
        table.appendChild(tbody);

        return table;
    } else {
        return null;
    }
}

export function pesquisarProdVet(descrProduto) {
    //retorna o produto pesquisado ou null se produto não cadastrado
    let produto = null;
    for (let i = 0; i < vetProdutos.length && produto == null; i++) {
        if (vetProdutos[i].descricao == descrProduto) {
            produto = vetProdutos[i];
        }
    }
    return produto;
}

export function acrescentarProduto(descrProduto) {
    let produto = pesquisarProdVet(descrProduto);

    if (produto == null) { //indica que produto não existe no vetor
        produto = new Produto(descrProduto);
        vetProdutos.push(produto);
        return true;
    }
    return false;
}

export function alterarProduto(descrProduto, mes, quantidade) {
    let produto = pesquisarProdVet(descrProduto);

    if (produto != null) { //indica que produto existe no vetor
        produto.setQtdVendasMes(quantidade, mes);
    }
    return produto;
}

export function consultarQtd(descrProduto, mesInic, mesFinal) {
    let produto = pesquisarProdVet(descrProduto);
    let qtdVendida = -1;
    if (produto != null) { //indica que produto existe no vetor
        qtdVendida = produto.getVendasPeriodo(mesInic, mesFinal);
    }
    return qtdVendida;
}

export function produtoMaisVendidoMes(mes) {
    let produtoMaisVendidoMes = vetProdutos[0];

    for (let i = 1; i < vetProdutos.length; i++) {
        if (produtoMaisVendidoMes.getQtdVendasMes(mes) < vetProdutos[i].getQtdVendasMes(mes)) {
            produtoMaisVendidoMes = vetProdutos[i];
        }
    }
    return produtoMaisVendidoMes;
}

export function faturamentoMensal(mes) {

    let faturamentoMensal = 0;

    for (let i = 0; i < vetProdutos.length; i++) {
        faturamentoMensal += vetProdutos[i].preco * vetProdutos[i].getQtdVendasMes(mes)
    }
    return faturamentoMensal;
}

export function filtrarEstoque(quantidade) {

    let estoqueFiltrado = [];

    for (let i = 0; i < vetProdutos.length; i++) {

        let prodEstoque = vetProdutos[i].qtdEstoque;

        if (prodEstoque <= quantidade) {

            let z = " " + vetProdutos[i].descricao;

            estoqueFiltrado.push(z);
        }
    }
    return estoqueFiltrado;
}