let contadorprodutos = 1
let listaprodutos = []
let codproduto = contadorprodutos


function cadastrar(){
    let secao = document.querySelector('div.corpo__caixa')
    secao.innerHTML=`
<div class=corpo__cadastro>
    <span id="corpo__cadastro__codpeca">Código da peça:</span>
            <form class="corpo__cadastro__form">
                <div class="corpo__cadastro__form__item">
                    <label for="peca">Nome da peça:</label>
                    <input type="text" name="peca" id="peca">
                </div >
                <div class="corpo__cadastro__form__item">
                    <label for="marca">Marca da peça:</label>
                    <input type="text" name="marca" id="marca">
                </div>
                <div class="corpo__cadastro__form__item">
                    <label for="valor">Valor da peça:</label>
                    <input type="number" name="valor" id="valor" min="0.01">
                </div>
                <div class="corpo__cadastro__form__item">
                    <input type="button" value="Cadastrar" class="botao" onclick="cadastrarProduto()">
                </div>
            </form>
        </div>
    <div id="corpo__cadastro__resultado"></div>
</div>`
    let espacocod = document.querySelector('span#corpo__cadastro__codpeca')
    espacocod.innerHTML=`Código da peça: ${codproduto}`
}

function cadastrarProduto(){
    let txtnome = document.querySelector('input#peca')
    let nome = txtnome.value 
    let txtmarca = document.querySelector('input#marca')
    let marca = txtmarca.value
    let txtvalor = document.querySelector('input#valor')
    let valor = txtvalor.value
    let produtos = new Map();
    produtos.set("codigo", codproduto)
    produtos.set("nome", nome)
    produtos.set("marca", marca)
    produtos.set("valor", valor)
    listaprodutos.push(produtos)
    codproduto++
    resultadocadastro = document.querySelector('div#corpo__cadastro__resultado')
    resultadocadastro.innerHTML=`Produto cadastrado com sucesso <input type="button" class="botao" value="Fechar aviso" onclick="fecharAviso(), cadastrar()">`
}

function consultar(){
    let secao = document.querySelector('div.corpo__caixa')
    secao.innerHTML=`
<div class="consulta">
    <span class="consulta__texto">Consulte a peça por:</span>
    <div>
        <input type="button" value="Todas" class="botao" onclick="consultarTodasPecas()">
    </div>
    <div>
        <input type="button" value="Código" class="botao" onclick="consultarCodigo()">
    </div>
    <div>
        <input type="button" value="Fabricante" class="botao" onclick="consultarFabricante()">
    </div>
</div>
    `
}

function fecharAviso(){
    resultadocadastro = document.querySelector('div#corpo__cadastro__resultado')
    resultadocadastro.innerHTML=``
}

function consultarTodasPecas(){
    let resultado = document.querySelector('div.consulta')
    resultado.innerHTML = `
    <select id="selectres" size="10"></select>`
    let selres = document.querySelector('select#selectres')
    for (let i = 0; i < listaprodutos.length ; i++){
        for (const [key, value] of listaprodutos[i].entries()) {
            selres.innerHTML+=`<option>${key}: ${value}</option>`
        }
    }
}

function consultarCodigo(){
    let resultado = document.querySelector('div.consulta')
    resultado.innerHTML = `
    <div class="consulta__codigo">
    <span>Digite o código da peça</span>
    <input type="number" id="codconsulta">
    <input type="button" value="Consultar código" class="botao" onclick="consultarCodigo2()">
    </div>
    <select id="selectres" size="10"></select>`
}

function consultarCodigo2(){
    let txtconsultacod = document.querySelector('input#codconsulta')
    let consultacod = Number(txtconsultacod.value)
    let selres = document.querySelector('select#selectres')
    for (let i = 0; i < listaprodutos.length ; i++){
        for (const [key, value] of listaprodutos[i].entries()) {
            if (consultacod == listaprodutos[i].get('codigo')){
                selres.innerHTML+=`<option>${key}: ${value}</option>`
            }
        }
    }
}

function consultarFabricante(){
    let resultado = document.querySelector('div.consulta')
    resultado.innerHTML = `
    <div class="consulta__fabricante">
    <span>Digite o fabricante da peça</span>
    <input type="text" id="fabricante">
    <input type="button" value="Consultar fabricante" class="botao" onclick="consultarFabricante2()">
    </div>
    <select id="selectres" size="10"></select>`
}

function consultarFabricante2(){
    let txtfabricante = document.querySelector('input#fabricante')
    let fabricante = txtfabricante.value
    let selres = document.querySelector('select#selectres')
    for (let i = 0; i < listaprodutos.length ; i++){
        for (const [key, value] of listaprodutos[i].entries()) {
            if (fabricante == listaprodutos[i].get('marca')){
                selres.innerHTML+=`<option>${key}: ${value}</option>`
            }
        }
    }
}

function remover() {
    let remocao = document.querySelector('div.corpo__caixa')
    remocao.innerHTML=`
    <div class="consulta__remocao">
        <span>Digite o código da peça que deseja remover</span>
        <input type="number" id="codremover">
        <input type="button" value="Remover peça" onclick="removerpeca()" class="botao">
    </div>`
}

function removerpeca() {
    let txtcodremover = document.querySelector('input#codremover')
    let codremover = txtcodremover.value
    for (let i = 0; i < listaprodutos.length ; i++){
        for (const [key, value] of listaprodutos[i].entries()) {
            if (codremover == listaprodutos[i].get('codigo')){
                listaprodutos.splice(i, 1)
            }
        }
    }
    let remocao = document.querySelector('div.corpo__caixa')
    remocao.innerHTML+=`<div class="remocao">
    <span>O item foi removido</span>
    <input type="button" class="botao" value="Fechar aviso" onclick="fecharAvisoRemover()">
    </div>`
}

function fecharAvisoRemover(){
    let remocaoAviso = document.querySelector('div.remocao')
    remocaoAviso.innerHTML = ``
}