/*
Autor: Allan Furlani
Versão: 2.0
Descrição: Aplicação para gerenciamento de um armazém utilizando matrizes
 */

import {
    vetProdutos, vetMeses, carregarDados, criarTableHtml,
    acrescentarProduto, alterarProduto, consultarQtd,
    produtoMaisVendidoMes, faturamentoMensal, filtrarEstoque
} from "./armazemOperacoes.js";

var inProduto = document.getElementById("inProduto");
var inMes = document.getElementById("inMes");
var inQtd = document.getElementById("inQtd");

var btOk = document.getElementById("btOk");

var outResultado = document.getElementById("outResultado");

var selectOpcao = document.getElementById("selectOpcao");

var sectionResultado = document.querySelector(".resultado");

document.addEventListener("DOMContentLoaded", carregarDados);

btOk.addEventListener("click", executarFunc);

selectOpcao.addEventListener("change", function () {
    let opcao = selectOpcao.value;

    if (opcao != "") {
        verificarOpcao(opcao);
    }
});

function verificarOpcao(opcao) {

    inQtd.disabled = true;
    inQtd.placeholder = "";
    inQtd.value = "";
    inMes.disabled = true;
    inMes.placeholder = "";
    inMes.value = "";
    inProduto.disabled = true;
    inProduto.placeholder = "";
    inProduto.value = "";
    outResultado.textContent = "";
    sectionResultado.textContent = "";


    switch (opcao) {
        case "Acrescentar":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            break;
        case "Alterar":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            inMes.disabled = false;
            inMes.placeholder = "Digite um mês [1-6]";
            inQtd.disabled = false;
            inQtd.placeholder = "Digite a quantidade";
            break;
        case "ConsultarQtd":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            break;
        case "ConsultarProd":
        case "FaturamentoMensal":
            inMes.disabled = false;
            inMes.placeholder = "Digite um mês [1-6]";
            break;
        case "FiltrarEstoque":
            inQtd.disabled = false;
            inQtd.placeholder = "Digite a quantidade";
            break;
    }
}


function executarFunc() {
    let opcao = selectOpcao.value;
    let descrProduto = (inProduto.value).toUpperCase();
    let mes = Number(inMes.value);
    let quantidade = Number(inQtd.value);

    switch (opcao) {
        case "Listar":
            let htmlTable = criarTableHtml(vetProdutos, vetMeses);
            if (htmlTable != null) {
                document.querySelector(".resultado").appendChild(htmlTable);
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro! Divergência entre os dados do vetor de Produtos e de Mêses!";
            }
            break;

        case "Acrescentar":

            if (descrProduto == "") {
                outResultado.style.color = "red";
                outResultado.textContent = "Para acrescentar produto novo, o campo deve ser preenchido!";
                inProduto.focus();
            } else {
                if (acrescentarProduto(descrProduto) == true) {
                    outResultado.style.color = "blue";
                    outResultado.textContent = "O novo produto foi acrescentado com sucesso!";
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Erro! O produto " + descrProduto + " já estava cadastrado!";
                    inProduto.focus();
                }
            }
            break;

        case "Alterar":
            if (mes < 1 || mes > 6) {
                outResultado.style.color = "red";
                outResultado.textContent = "Ops, digite um mês de 1-6!";
                inMes.focus();
            } else {
                if (inQtd.value == "" || quantidade < 0) {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Para alterar quantidade vendida, o campo Quantidade deve ser preenchido com valor >= 0 !";
                    inQtd.focus();
                } else {
                    let produto = alterarProduto(descrProduto, mes, quantidade);
                    if (produto != null) {
                        outResultado.style.color = "blue";
                        outResultado.textContent = "O produto " + produto.descricao + " foi alterado no mês " + mes + " tendo como quantidade vendida : " + produto.getQtdVendasMes(mes);
                    } else {
                        outResultado.style.color = "red";
                        outResultado.textContent = "O produto que deseja alterar não está cadastrado";
                    }
                }
            }
            break;

        case "ConsultarQtd":

            if (descrProduto == "") {
                outResultado.style.color = "red";
                outResultado.textContent = "Para consultar a quantidade deve-se preencher o campo Produto!";
                inProduto.focus();

            } else {
                let somaVendasProduto = consultarQtd(descrProduto, 1, 6);
                if (somaVendasProduto >= 0) {
                    outResultado.style.color = "blue";
                    outResultado.textContent = "O produto " + descrProduto + " vendeu " + somaVendasProduto + " unidades no semestre."
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Erro! O produto " + descrProduto + " não existe!";
                    inProduto.focus();
                }
            }
            break;

        case "ConsultarProd":
            if (mes <= 0 || mes > 6) {
                outResultado.style.color = "red";
                outResultado.textContent = "Ops! digite o mês de 1-6";
                inMes.focus();
            } else {
                let produto = produtoMaisVendidoMes(mes);
                outResultado.style.color = "blue";
                outResultado.textContent = "O produto mais vendido no mês " + vetMeses[mes - 1] + " foi: "
                    + produto.descricao
                    + " => " + produto.getQtdVendasMes(mes) + " unidades";
            }
            break;

        case "FaturamentoMensal":
            if (mes <= 0 || mes > 6) {
                outResultado.style.color = "red";
                outResultado.textContent = "Ops! digite o mês de 1-6";
                inMes.focus();
            } else {
                let produto = faturamentoMensal(mes);
                outResultado.style.color = "blue";
                outResultado.textContent = "O Faturamento Mensal do Mês de " + vetMeses[mes - 1] + " foi: "
                    + " => " + produto.toFixed(2) + " unidades"; ''
            }
            break;
        case "FiltrarEstoque":
            if (inQtd.value == "" || quantidade < 0) {
                outResultado.style.color = "red";
                outResultado.textContent = "O campo Quantidade deve ser preenchido com valor >= 0 !";
                inQtd.focus();
            } else {
                let prodEstoque = filtrarEstoque(quantidade);
                outResultado.style.color = "blue";
                outResultado.textContent = "Os Produtos com a quantidade em estoque são: " + prodEstoque;
            }
    }
}