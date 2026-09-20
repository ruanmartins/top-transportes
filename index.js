const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: "top-transportes-segredo",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.get("/login", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login - Top Transportes</title>
      <style>
        body {
          margin: 0;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #080808;
          font-family: Arial, sans-serif;
          color: white;
        }

        .login {
          width: 90%;
          max-width: 400px;
          padding: 35px;
          background: #111;
          border: 1px solid #d4af37;
          border-radius: 15px;
          box-shadow: 0 0 30px rgba(212,175,55,.2);
          text-align: center;
        }

        h1 {
          color: #d4af37;
          margin-bottom: 30px;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          margin: 8px 0;
          border: 1px solid #444;
          border-radius: 8px;
          background: #222;
          color: white;
          font-size: 16px;
        }

        button {
          width: 100%;
          padding: 14px;
          margin-top: 18px;
          border: none;
          border-radius: 8px;
          background: #d4af37;
          color: #000;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="login">
        <h1>TOP TRANSPORTES</h1>

        <form method="POST" action="/login">
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            required
          >

          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
          >

          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

app.post("/login", (req, res) => {
const usuario = process.env.APP_USER;
const senha = process.env.APP_PASSWORD;
  if (req.body.username === usuario && req.body.password === senha) {
    req.session.loggedIn = true;
    res.redirect("/");
  } else {
    res.status(401).send("Usuário ou senha incorretos.");
  }
});

app.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Top Transportes</title>

<style>
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

body{
  font-family:Arial,Helvetica,sans-serif;
  background:
    radial-gradient(circle at top right,#3b0808 0%,#100000 30%,#050505 70%);
  color:#fff;
  min-height:100vh;
}

button{
  font-family:inherit;
  cursor:pointer;
}

.tela{
  min-height:100vh;
  padding:25px 18px 40px;
}

.inicio{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  min-height:100vh;
  text-align:center;
}

.logo{
  font-size:48px;
  font-weight:900;
  letter-spacing:3px;
  color:#d4af37;
  text-shadow:0 0 25px rgba(212,175,55,.25);
}

.subtitulo{
  margin-top:10px;
  font-size:15px;
  letter-spacing:3px;
  color:#ddd;
}

.caminhao-imagem{
  font-size:120px;
  margin:45px 0 25px;
  filter:drop-shadow(0 0 20px rgba(212,175,55,.25));
}

.frase{
  font-size:18px;
  color:#ddd;
  margin-bottom:30px;
}

.btn-comecar{
  border:1px solid #d4af37;
  background:linear-gradient(135deg,#d4af37,#9c7918);
  color:#080808;
  font-size:18px;
  font-weight:bold;
  padding:17px 55px;
  border-radius:10px;
  box-shadow:0 0 25px rgba(212,175,55,.18);
}

.btn-comecar:hover{
  transform:translateY(-2px);
}

.faixa{
  margin-top:55px;
  display:flex;
  gap:30px;
  justify-content:center;
  flex-wrap:wrap;
  color:#aaa;
  font-size:12px;
  letter-spacing:1px;
}

.faixa span{
  color:#d4af37;
}

/* CABEÇALHO */

.cabecalho{
  max-width:1100px;
  margin:0 auto 25px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.titulo-pagina{
  color:#d4af37;
  font-size:27px;
  font-weight:800;
}

.btn-voltar{
  background:#111;
  border:1px solid #444;
  color:#fff;
  padding:10px 16px;
  border-radius:8px;
}

/* RESUMO EMPRESA */

.resumo-empresa{
  max-width:1100px;
  margin:0 auto 30px;
  background:linear-gradient(145deg,#151515,#080808);
  border:1px solid #4d3c0d;
  border-radius:18px;
  padding:25px;
  box-shadow:0 15px 40px rgba(0,0,0,.4);
}

.resumo-titulo{
  color:#d4af37;
  font-size:20px;
  font-weight:bold;
  margin-bottom:20px;
  letter-spacing:1px;
}

.resumo-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px;
}

.resumo-item{
  background:#101010;
  border:1px solid #292929;
  border-radius:12px;
  padding:18px;
}

.resumo-item .rotulo{
  color:#999;
  font-size:12px;
  margin-bottom:8px;
  text-transform:uppercase;
}

.resumo-item .valor{
  color:#fff;
  font-size:20px;
  font-weight:bold;
}

.resumo-total{
  margin-top:18px;
  background:linear-gradient(135deg,#1b1404,#0c0c0c);
  border:1px solid #d4af37;
  border-radius:13px;
  padding:22px;
  text-align:center;
}

.resumo-total .rotulo{
  color:#d4af37;
  font-size:13px;
  letter-spacing:2px;
}

.resumo-total .valor{
  font-size:32px;
  font-weight:900;
  margin-top:7px;
}

/* CAMINHÕES */

.lista-caminhoes{
  max-width:1100px;
  margin:0 auto;
}

.lista-titulo{
  color:#fff;
  font-size:19px;
  margin-bottom:15px;
}

.caminhoes-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:20px;
}

.card-caminhao{
  background:linear-gradient(145deg,#151515,#090909);
  border:1px solid #333;
  border-radius:18px;
  padding:25px;
  transition:.2s;
}

.card-caminhao:hover{
  border-color:#d4af37;
  transform:translateY(-2px);
}

.card-caminhao-topo{
  display:flex;
  align-items:center;
  gap:15px;
}

.card-icone{
  font-size:45px;
}

.card-nome{
  font-size:21px;
  font-weight:bold;
}

.card-placa{
  color:#d4af37;
  margin-top:5px;
  letter-spacing:2px;
}

.card-total{
  margin-top:20px;
  border-top:1px solid #292929;
  padding-top:17px;
}

.card-total small{
  color:#888;
}

.card-total strong{
  display:block;
  margin-top:5px;
  font-size:24px;
  color:#fff;
}

.btn-abrir{
  width:100%;
  margin-top:20px;
  background:#111;
  border:1px solid #d4af37;
  color:#d4af37;
  padding:13px;
  border-radius:9px;
  font-weight:bold;
}

/* PAINEL */

.painel{
  max-width:1100px;
  margin:0 auto;
}

.painel-cabecalho{
  background:linear-gradient(145deg,#161616,#090909);
  border:1px solid #3b2d09;
  border-radius:18px;
  padding:22px;
  margin-bottom:20px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.painel-cabecalho h2{
  color:#d4af37;
}

.painel-cabecalho p{
  color:#aaa;
  margin-top:5px;
}

.menu{
  position:relative;
}

.btn-menu{
  width:45px;
  height:45px;
  border-radius:50%;
  border:1px solid #d4af37;
  background:#111;
  color:#d4af37;
  font-size:24px;
}

.menu-opcoes{
  display:none;
  position:absolute;
  right:0;
  top:52px;
  width:230px;
  background:#111;
  border:1px solid #444;
  border-radius:12px;
  padding:8px;
  z-index:20;
  box-shadow:0 15px 35px #000;
}

.menu-opcoes button{
  display:block;
  width:100%;
  padding:13px;
  text-align:left;
  background:none;
  border:0;
  color:#fff;
  border-radius:8px;
}

.menu-opcoes button:hover{
  background:#242424;
  color:#d4af37;
}

/* DASHBOARD */

.dashboard{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:12px;
  margin-bottom:20px;
}

.card-valor{
  background:#111;
  border:1px solid #292929;
  border-radius:13px;
  padding:17px;
}

.card-valor .nome{
  font-size:11px;
  color:#888;
  text-transform:uppercase;
}

.card-valor .numero{
  font-size:18px;
  font-weight:bold;
  margin-top:8px;
}

.card-total-painel{
  border-color:#d4af37;
}

.card-total-painel .nome{
  color:#d4af37;
}

/* GRAFICO */

.grafico-box{
  background:linear-gradient(145deg,#151515,#090909);
  border:1px solid #292929;
  border-radius:18px;
  padding:22px;
  margin-bottom:22px;
}

.grafico-titulo{
  color:#d4af37;
  font-weight:bold;
  margin-bottom:18px;
}

.grafico{
  display:flex;
  align-items:flex-end;
  justify-content:space-around;
  gap:12px;
  height:220px;
  border-bottom:1px solid #333;
  padding:20px 5px 0;
}

.barra-area{
  height:100%;
  flex:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-end;
}

.barra{
  width:70%;
  min-height:4px;
  border-radius:6px 6px 0 0;
  background:linear-gradient(to top,#7b5c0b,#d4af37);
}

.barra.vermelha{
  background:linear-gradient(to top,#650000,#d11);
}

.barra-label{
  font-size:10px;
  color:#aaa;
  margin-top:8px;
  text-align:center;
}

/* LANÇAMENTOS */

.lancamentos-box{
  background:linear-gradient(145deg,#151515,#090909);
  border:1px solid #292929;
  border-radius:18px;
  padding:22px;
  margin-bottom:25px;
}

.lancamentos-topo{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:15px;
  margin-bottom:18px;
}

.lancamentos-topo h3{
  color:#d4af37;
}

.filtro{
  background:#0d0d0d;
  color:#fff;
  border:1px solid #444;
  border-radius:8px;
  padding:9px;
}

.lancamento{
  background:#0e0e0e;
  border:1px solid #292929;
  border-radius:12px;
  padding:15px;
  margin-bottom:10px;
  display:grid;
  grid-template-columns:110px 1fr 130px auto;
  align-items:center;
  gap:15px;
}

.lancamento-tipo{
  color:#d4af37;
  font-weight:bold;
  font-size:12px;
}

.lancamento-data{
  color:#888;
  font-size:12px;
  margin-top:4px;
}

.lancamento-descricao{
  color:#fff;
}

.lancamento-valor{
  font-weight:bold;
  text-align:right;
}

.acoes{
  display:flex;
  gap:6px;
}

.btn-editar,
.btn-excluir{
  border-radius:7px;
  padding:8px 10px;
  border:1px solid #444;
  background:#151515;
  color:#fff;
}

.btn-editar{
  color:#d4af37;
}

.btn-excluir{
  color:#ff5555;
}

.vazio{
  text-align:center;
  color:#777;
  padding:30px;
}

/* BOTAO RELATORIO */

.btn-relatorio{
  width:100%;
  background:linear-gradient(135deg,#d4af37,#9c7918);
  color:#080808;
  border:0;
  padding:15px;
  border-radius:10px;
  font-weight:900;
  margin-top:8px;
}

/* FORMULARIO */

.formulario{
  background:#101010;
  border:1px solid #d4af37;
  border-radius:15px;
  padding:22px;
  margin-bottom:20px;
}

.formulario h2{
  color:#d4af37;
  margin-bottom:18px;
}

.formulario input,
.formulario textarea{
  width:100%;
  background:#080808;
  color:#fff;
  border:1px solid #444;
  border-radius:8px;
  padding:13px;
  margin-bottom:12px;
  outline:none;
}

.formulario textarea{
  min-height:90px;
  resize:vertical;
}

.btn-salvar{
  background:#d4af37;
  border:0;
  padding:13px 20px;
  border-radius:8px;
  font-weight:bold;
  margin-right:8px;
}

.btn-cancelar{
  background:#222;
  color:#fff;
  border:1px solid #444;
  padding:13px 20px;
  border-radius:8px;
}

/* RESPONSIVO */

@media(max-width:800px){
  .resumo-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .caminhoes-grid{
    grid-template-columns:1fr;
  }

  .dashboard{
    grid-template-columns:repeat(2,1fr);
  }

  .lancamento{
    grid-template-columns:1fr;
  }

  .lancamento-valor{
    text-align:left;
  }

  .acoes{
    margin-top:5px;
  }

  .logo{
    font-size:38px;
  }
}

@media(max-width:500px){
  .resumo-grid{
    grid-template-columns:1fr;
  }

  .dashboard{
    grid-template-columns:1fr 1fr;
  }

  .painel-cabecalho{
    align-items:flex-start;
  }
}
</style>
</head>

<body>

<div id="app"></div>

<script>

const dados = {
  RJA9C06: {
    nome: "Caminhão 01",
    placa: "RJA9C06",
    fretes: [],
    combustivel: [],
    despesas: [],
    manutencao: []
  },

  RIY3D36: {
    nome: "Caminhão 02",
    placa: "RIY3D36",
    fretes: [],
    combustivel: [],
    despesas: [],
    manutencao: []
  }
};

let caminhaoAtual = null;

const app = document.getElementById("app");

function dinheiro(valor){
  return Number(valor || 0).toLocaleString("pt-BR", {
    style:"currency",
    currency:"BRL"
  });
}

function escaparHtml(texto){
  return String(texto || "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function somar(lista){
  return lista.reduce(function(total,item){
    return total + Number(item.valor || 0);
  },0);
}

function calcularValores(placa){
  const c = dados[placa];

  const fretes = somar(c.fretes);
  const combustivel = somar(c.combustivel);
  const despesas = somar(c.despesas);
  const manutencao = somar(c.manutencao);

  const total = fretes - combustivel - despesas - manutencao;

  return {
    fretes:fretes,
    combustivel:combustivel,
    despesas:despesas,
    manutencao:manutencao,
    total:total
  };
}

/* =========================
   TELA INICIAL
========================= */

function telaInicial(){

  app.innerHTML =
    '<div class="tela inicio">' +

      '<div class="logo">TOP TRANSPORTES</div>' +

      '<div class="subtitulo">GESTÃO INTELIGENTE DA SUA FROTA</div>' +

      '<div class="caminhao-imagem">🚛</div>' +

      '<div class="frase">Mais controle para ir mais longe!</div>' +

      '<button class="btn-comecar" onclick="abrirCaminhoes()">COMEÇAR</button>' +

      '<div class="faixa">' +
        '<div><span>◆</span> SEGURANÇA</div>' +
        '<div><span>◆</span> EFICIÊNCIA</div>' +
        '<div><span>◆</span> PARCERIA</div>' +
      '</div>' +

    '</div>';
}

/* =========================
   RESUMO DA EMPRESA
========================= */

function calcularEmpresa(){

  let fretes = 0;
  let combustivel = 0;
  let despesas = 0;
  let manutencao = 0;

  Object.keys(dados).forEach(function(placa){

    const valores = calcularValores(placa);

    fretes += valores.fretes;
    combustivel += valores.combustivel;
    despesas += valores.despesas;
    manutencao += valores.manutencao;

  });

  return {
    fretes:fretes,
    combustivel:combustivel,
    despesas:despesas,
    manutencao:manutencao,
    total:fretes - combustivel - despesas - manutencao
  };
}

function abrirCaminhoes(){

  const empresa = calcularEmpresa();

  const totalEmpresaClass =
    empresa.total >= 0 ? "" : "color:#ff5555;";

  app.innerHTML =

    '<div class="tela">' +

      '<div class="cabecalho">' +
        '<div class="titulo-pagina">TOP TRANSPORTES</div>' +
        '<button class="btn-voltar" onclick="telaInicial()">← Voltar</button>' +
      '</div>' +

      '<div class="resumo-empresa">' +

        '<div class="resumo-titulo">RESUMO DA EMPRESA</div>' +

        '<div class="resumo-grid">' +

          '<div class="resumo-item">' +
            '<div class="rotulo">Total de Fretes</div>' +
            '<div class="valor">' + dinheiro(empresa.fretes) + '</div>' +
          '</div>' +

          '<div class="resumo-item">' +
            '<div class="rotulo">Total de Combustível</div>' +
            '<div class="valor">' + dinheiro(empresa.combustivel) + '</div>' +
          '</div>' +

          '<div class="resumo-item">' +
            '<div class="rotulo">Total de Despesas</div>' +
            '<div class="valor">' + dinheiro(empresa.despesas) + '</div>' +
          '</div>' +

          '<div class="resumo-item">' +
            '<div class="rotulo">Total de Manutenção</div>' +
            '<div class="valor">' + dinheiro(empresa.manutencao) + '</div>' +
          '</div>' +

        '</div>' +

        '<div class="resumo-total">' +
          '<div class="rotulo">TOTAL DA EMPRESA</div>' +
          '<div class="valor" style="' + totalEmpresaClass + '">' +
            dinheiro(empresa.total) +
          '</div>' +
        '</div>' +

      '</div>' +

      '<div class="lista-caminhoes">' +

        '<div class="lista-titulo">SELECIONE O CAMINHÃO</div>' +

        '<div class="caminhoes-grid">' +

          criarCardCaminhao("RJA9C06") +
          criarCardCaminhao("RIY3D36") +

        '</div>' +

      '</div>' +

    '</div>';
}

function criarCardCaminhao(placa){

  const c = dados[placa];
  const valores = calcularValores(placa);

  const totalStyle =
    valores.total < 0 ? "color:#ff5555;" : "color:#fff;";

  return (

    '<div class="card-caminhao">' +

      '<div class="card-caminhao-topo">' +

        '<div class="card-icone">🚛</div>' +

        '<div>' +
          '<div class="card-nome">' + c.nome + '</div>' +
          '<div class="card-placa">' + c.placa + '</div>' +
        '</div>' +

      '</div>' +

      '<div class="card-total">' +
        '<small>TOTAL DO CAMINHÃO</small>' +
        '<strong style="' + totalStyle + '">' +
          dinheiro(valores.total) +
        '</strong>' +
      '</div>' +

      '<button class="btn-abrir" onclick="abrirPainel(\\'' + placa + '\\')">' +
        'ABRIR CAMINHÃO' +
      '</button>' +

    '</div>'

  );
}

/* =========================
   PAINEL DO CAMINHÃO
========================= */

function abrirPainel(placa){

  caminhaoAtual = placa;

  app.innerHTML =

    '<div class="tela">' +

      '<div class="painel">' +

        '<div class="painel-cabecalho">' +

          '<div>' +
            '<h2>' + dados[placa].nome + '</h2>' +
            '<p>Placa: ' + dados[placa].placa + '</p>' +
          '</div>' +

          '<div class="menu">' +

            '<button class="btn-menu" onclick="abrirMenu()">⋮</button>' +

            '<div class="menu-opcoes" id="menuOpcoes">' +

              '<button onclick="abrirCadastro(\\'fretes\\')">＋ Registrar Frete</button>' +
              '<button onclick="abrirCadastro(\\'combustivel\\')">＋ Registrar Combustível</button>' +
              '<button onclick="abrirCadastro(\\'despesas\\')">＋ Registrar Despesa</button>' +
              '<button onclick="abrirCadastro(\\'manutencao\\')">＋ Registrar Manutenção</button>' +

            '</div>' +

          '</div>' +

        '</div>' +

        '<div id="areaCadastro"></div>' +

        '<div class="dashboard" id="dashboard"></div>' +

        '<div class="grafico-box">' +
          '<div class="grafico-titulo">RESUMO GRÁFICO</div>' +
          '<div class="grafico" id="grafico"></div>' +
        '</div>' +

        '<div class="lancamentos-box">' +

          '<div class="lancamentos-topo">' +

            '<h3>LANÇAMENTOS</h3>' +

            '<select class="filtro" id="filtroLancamento" onchange="renderLancamentos()">' +
              '<option value="todos">Todos</option>' +
              '<option value="fretes">Fretes</option>' +
              '<option value="combustivel">Combustível</option>' +
              '<option value="despesas">Despesas</option>' +
              '<option value="manutencao">Manutenção</option>' +
            '</select>' +

          '</div>' +

          '<div id="listaLancamentos"></div>' +

          '<button class="btn-relatorio" onclick="gerarRelatorio()">' +
            '📄 GERAR RELATÓRIO' +
          '</button>' +

        '</div>' +

        '<button class="btn-voltar" onclick="abrirCaminhoes()">← Voltar para caminhões</button>' +

      '</div>' +

    '</div>';

  atualizarPainel();
  renderLancamentos();
}

function abrirMenu(){

  const menu = document.getElementById("menuOpcoes");

  if(!menu) return;

  menu.style.display =
    menu.style.display === "block" ? "none" : "block";
}

/* =========================
   CADASTRO
========================= */

function abrirCadastro(tipo, id){

  const area = document.getElementById("areaCadastro");

  let titulo = "";
  let placeholder = "";

  if(tipo === "fretes"){
    titulo = id ? "Editar Frete" : "Registrar Frete";
    placeholder = "Valor do frete";
  }

  if(tipo === "combustivel"){
    titulo = id ? "Editar Combustível" : "Registrar Combustível";
    placeholder = "Valor do combustível";
  }

  if(tipo === "despesas"){
    titulo = id ? "Editar Despesa" : "Registrar Despesa";
    placeholder = "Valor da despesa";
  }

  if(tipo === "manutencao"){
    titulo = id ? "Editar Manutenção" : "Registrar Manutenção";
    placeholder = "Valor da manutenção";
  }

  let registro = null;

  if(id){

    registro = dados[caminhaoAtual][tipo].find(function(item){
      return String(item.id) === String(id);
    });

  }

  area.innerHTML =

    '<div class="formulario">' +

      '<h2>' + titulo + '</h2>' +

      '<input id="valorCadastro" type="number" step="0.01" placeholder="' +
        placeholder +
        '" value="' +
        (registro ? registro.valor : "") +
      '">' +

      '<input id="dataCadastro" type="date" value="' +
        (registro ? registro.data : "") +
      '">' +

      '<textarea id="descricaoCadastro" placeholder="Descrição / observação">' +
        (registro ? escaparHtml(registro.descricao) : "") +
      '</textarea>' +

      '<button class="btn-salvar" id="btnSalvar">' +
        (id ? "ATUALIZAR LANÇAMENTO" : "SALVAR CADASTRO") +
      '</button>' +

      '<button class="btn-cancelar" id="btnCancelar">CANCELAR</button>' +

    '</div>';

  document.getElementById("btnSalvar").onclick = function(){

    salvarCadastro(tipo,id);

  };

  document.getElementById("btnCancelar").onclick = function(){

    area.innerHTML = "";

  };
}

function salvarCadastro(tipo,id){

  const valor = Number(
    document.getElementById("valorCadastro").value
  );

  const data =
    document.getElementById("dataCadastro").value;

  const descricao =
    document.getElementById("descricaoCadastro").value;

  if(!valor){

    alert("Digite um valor.");

    return;
  }

  if(!data){

    alert("Informe a data.");

    return;
  }

  if(id){

    const lista = dados[caminhaoAtual][tipo];

    const indice = lista.findIndex(function(item){

      return String(item.id) === String(id);

    });

    if(indice !== -1){

      lista[indice] = {
        id:id,
        valor:valor,
        data:data,
        descricao:descricao
      };

    }

  }else{

    dados[caminhaoAtual][tipo].push({

      id:
        String(Date.now()) +
        Math.random().toString(36).substring(2),

      valor:valor,
      data:data,
      descricao:descricao

    });

  }

  document.getElementById("areaCadastro").innerHTML = "";

  atualizarPainel();
  renderLancamentos();

}

/* =========================
   LANÇAMENTOS
========================= */

function obterLancamentos(){

  const lista = [];

  const categorias = [
    {
      tipo:"fretes",
      nome:"Frete"
    },
    {
      tipo:"combustivel",
      nome:"Combustível"
    },
    {
      tipo:"despesas",
      nome:"Despesa"
    },
    {
      tipo:"manutencao",
      nome:"Manutenção"
    }
  ];

  categorias.forEach(function(cat){

    dados[caminhaoAtual][cat.tipo].forEach(function(item){

      lista.push({

        id:item.id,
        valor:item.valor,
        data:item.data,
        descricao:item.descricao,
        tipo:cat.tipo,
        nomeTipo:cat.nome

      });

    });

  });

  lista.sort(function(a,b){

    return String(b.data).localeCompare(String(a.data));

  });

  return lista;
}

function renderLancamentos(){

  const area = document.getElementById("listaLancamentos");

  if(!area) return;

  const filtroElement =
    document.getElementById("filtroLancamento");

  const filtro =
    filtroElement ? filtroElement.value : "todos";

  let lista = obterLancamentos();

  if(filtro !== "todos"){

    lista = lista.filter(function(item){

      return item.tipo === filtro;

    });

  }

  if(lista.length === 0){

    area.innerHTML =
      '<div class="vazio">Nenhum lançamento registrado.</div>';

    return;

  }

  area.innerHTML = lista.map(function(item){

    return (

      '<div class="lancamento">' +

        '<div>' +

          '<div class="lancamento-tipo">' +
            escaparHtml(item.nomeTipo) +
          '</div>' +

          '<div class="lancamento-data">' +
            formatarData(item.data) +
          '</div>' +

        '</div>' +

        '<div class="lancamento-descricao">' +
          (item.descricao
            ? escaparHtml(item.descricao)
            : "Sem descrição") +
        '</div>' +

        '<div class="lancamento-valor">' +
          dinheiro(item.valor) +
        '</div>' +

        '<div class="acoes">' +

          '<button class="btn-editar" onclick="editarLancamento(\\'' +
            item.tipo +
            '\\',\\'' +
            item.id +
          '\\')">✏️</button>' +

          '<button class="btn-excluir" onclick="excluirLancamento(\\'' +
            item.tipo +
            '\\',\\'' +
            item.id +
          '\\')">🗑️</button>' +

        '</div>' +

      '</div>'

    );

  }).join("");

}

function formatarData(data){

  if(!data) return "";

  const partes = data.split("-");

  if(partes.length !== 3) return data;

  return partes[2] + "/" + partes[1] + "/" + partes[0];

}

function editarLancamento(tipo,id){

  abrirCadastro(tipo,id);

  window.scrollTo({
    top:document.getElementById("areaCadastro").offsetTop - 20,
    behavior:"smooth"
  });

}

function excluirLancamento(tipo,id){

  const confirmar =
    confirm("Deseja realmente excluir este lançamento?");

  if(!confirmar) return;

  dados[caminhaoAtual][tipo] =
    dados[caminhaoAtual][tipo].filter(function(item){

      return String(item.id) !== String(id);

    });

  atualizarPainel();
  renderLancamentos();

}

/* =========================
   PAINEL / GRAFICO
========================= */

function atualizarPainel(){

  const valores = calcularValores(caminhaoAtual);

  const totalStyle =
    valores.total < 0 ? "color:#ff5555;" : "color:#fff;";

  document.getElementById("dashboard").innerHTML =

    '<div class="card-valor">' +
      '<div class="nome">Fretes</div>' +
      '<div class="numero">' + dinheiro(valores.fretes) + '</div>' +
    '</div>' +

    '<div class="card-valor">' +
      '<div class="nome">Combustível</div>' +
      '<div class="numero">' + dinheiro(valores.combustivel) + '</div>' +
    '</div>' +

    '<div class="card-valor">' +
      '<div class="nome">Despesas</div>' +
      '<div class="numero">' + dinheiro(valores.despesas) + '</div>' +
    '</div>' +

    '<div class="card-valor">' +
      '<div class="nome">Manutenção</div>' +
      '<div class="numero">' + dinheiro(valores.manutencao) + '</div>' +
    '</div>' +

    '<div class="card-valor card-total-painel">' +
      '<div class="nome">Total</div>' +
      '<div class="numero" style="' + totalStyle + '">' +
        (valores.total < 0
          ? "- " + dinheiro(Math.abs(valores.total))
          : dinheiro(valores.total)) +
      '</div>' +
    '</div>';

  atualizarGrafico(valores);

}

function atualizarGrafico(valores){

  const valoresGrafico = [

    {
      nome:"Fretes",
      valor:valores.fretes
    },

    {
      nome:"Combustível",
      valor:valores.combustivel
    },

    {
      nome:"Despesas",
      valor:valores.despesas
    },

    {
      nome:"Manutenção",
      valor:valores.manutencao
    },

    {
      nome:"TOTAL",
      valor:Math.abs(valores.total),
      negativo:valores.total < 0
    }

  ];

  const maior =
    Math.max.apply(null,
      valoresGrafico.map(function(item){
        return item.valor;
      }).concat([1])
    );

  document.getElementById("grafico").innerHTML =

    valoresGrafico.map(function(item){

      const altura =
        Math.max(4,(item.valor / maior) * 170);

      return (

        '<div class="barra-area">' +

          '<div class="barra ' +
            (item.negativo ? "vermelha" : "") +
            '" style="height:' + altura + 'px"></div>' +

          '<div class="barra-label">' +
            item.nome +
          '<br>' +
            dinheiro(item.valor) +
          '</div>' +

        '</div>'

      );

    }).join("");

}

/* =========================
   RELATÓRIO
========================= */

function gerarRelatorio(){

  const c = dados[caminhaoAtual];
  const valores = calcularValores(caminhaoAtual);
  const lista = obterLancamentos();

  let linhas = "";

  lista.forEach(function(item){

    linhas +=

      '<tr>' +

        '<td>' + escaparHtml(item.nomeTipo) + '</td>' +

        '<td>' + formatarData(item.data) + '</td>' +

        '<td>' +
          (item.descricao
            ? escaparHtml(item.descricao)
            : "-") +
        '</td>' +

        '<td class="direita">' +
          dinheiro(item.valor) +
        '</td>' +

      '</tr>';

  });

  const dataGeracao =
    new Date().toLocaleString("pt-BR");

  const totalStyle =
    valores.total < 0
      ? "color:#b00000;"
      : "color:#222;";

  const janela = window.open("", "_blank");

  if(!janela){

    alert("O navegador bloqueou a abertura do relatório.");

    return;

  }

  janela.document.write(

    '<!DOCTYPE html>' +
    '<html lang="pt-BR">' +

    '<head>' +

      '<meta charset="UTF-8">' +

      '<title>Relatório - Top Transportes</title>' +

      '<style>' +

        'body{' +
          'font-family:Arial,sans-serif;' +
          'margin:35px;' +
          'color:#222;' +
        '}' +

        '.topo{' +
          'border-bottom:3px solid #222;' +
          'padding-bottom:15px;' +
          'margin-bottom:25px;' +
        '}' +

        '.topo h1{' +
          'margin:0;' +
          'font-size:28px;' +
        '}' +

        '.topo p{' +
          'margin:6px 0;' +
          'color:#555;' +
        '}' +

        '.resumo{' +
          'display:grid;' +
          'grid-template-columns:repeat(4,1fr);' +
          'gap:10px;' +
          'margin-bottom:20px;' +
        '}' +

        '.box{' +
          'border:1px solid #ccc;' +
          'padding:14px;' +
          'border-radius:6px;' +
        '}' +

        '.box small{' +
          'display:block;' +
          'color:#666;' +
        '}' +

        '.box strong{' +
          'display:block;' +
          'font-size:18px;' +
          'margin-top:5px;' +
        '}' +

        '.total{' +
          'border:2px solid #222;' +
          'padding:18px;' +
          'text-align:center;' +
          'margin-bottom:30px;' +
        '}' +

        '.total h2{' +
          'margin:0 0 8px;' +
        '}' +

        'table{' +
          'width:100%;' +
          'border-collapse:collapse;' +
        '}' +

        'th,td{' +
          'border:1px solid #ccc;' +
          'padding:9px;' +
          'text-align:left;' +
        '}' +

        'th{' +
          'background:#eee;' +
        '}' +

        '.direita{' +
          'text-align:right;' +
        '}' +

        '.botoes{' +
          'margin-bottom:25px;' +
        '}' +

        '.botoes button{' +
          'padding:12px 20px;' +
          'margin-right:8px;' +
          'cursor:pointer;' +
        '}' +

        '@media print{' +
          '.botoes{' +
            'display:none;' +
          '}' +
          'body{' +
            'margin:15px;' +
          '}' +
        '}' +

      '</style>' +

    '</head>' +

    '<body>' +

      '<div class="botoes">' +
        '<button onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>' +
        '<button onclick="window.close()">Fechar</button>' +
      '</div>' +

      '<div class="topo">' +
        '<h1>TOP TRANSPORTES</h1>' +
        '<p><strong>' + escaparHtml(c.nome) + '</strong></p>' +
        '<p>Placa: ' + escaparHtml(c.placa) + '</p>' +
        '<p>Relatório gerado em: ' + dataGeracao + '</p>' +
      '</div>' +

      '<div class="resumo">' +

        '<div class="box">' +
          '<small>Fretes</small>' +
          '<strong>' + dinheiro(valores.fretes) + '</strong>' +
        '</div>' +

        '<div class="box">' +
          '<small>Combustível</small>' +
          '<strong>' + dinheiro(valores.combustivel) + '</strong>' +
        '</div>' +

        '<div class="box">' +
          '<small>Despesas</small>' +
          '<strong>' + dinheiro(valores.despesas) + '</strong>' +
        '</div>' +

        '<div class="box">' +
          '<small>Manutenção</small>' +
          '<strong>' + dinheiro(valores.manutencao) + '</strong>' +
        '</div>' +

      '</div>' +

      '<div class="total">' +
        '<h2>TOTAL</h2>' +
        '<strong style="' + totalStyle + ';font-size:28px;">' +
          (valores.total < 0
            ? "- " + dinheiro(Math.abs(valores.total))
            : dinheiro(valores.total)) +
        '</strong>' +
      '</div>' +

      '<h2 style="margin-bottom:15px;">Lançamentos</h2>' +

      '<table>' +

        '<thead>' +
          '<tr>' +
            '<th>Categoria</th>' +
            '<th>Data</th>' +
            '<th>Descrição</th>' +
            '<th>Valor</th>' +
          '</tr>' +
        '</thead>' +

        '<tbody>' +
          (linhas ||
            '<tr><td colspan="4">Nenhum lançamento.</td></tr>') +
        '</tbody>' +

      '</table>' +

    '</body>' +

    '</html>'

  );

  janela.document.close();

}

/* INÍCIO */

telaInicial();

</script>

</body>
</html>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Top Transportes rodando em http://localhost:" + PORT);
});