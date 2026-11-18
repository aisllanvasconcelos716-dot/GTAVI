let categoriaAtual = "todos";

const campoBusca = document.getElementById("busca");
const botoesFiltro = document.querySelectorAll(".filtro");
const cartoes = document.querySelectorAll(".cartao");
const textoResultado = document.getElementById("resultado");
const botoesFavorito = document.querySelectorAll(".favorito");
const elementoContador = document.getElementById("contador");
const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const areaAvisos = document.getElementById("avisos");

function mostrarAviso(mensagem) {
  const avisoAntigo = areaAvisos.querySelector(".toast");
  if (avisoAntigo) {
    avisoAntigo.remove();
  }

  const novoAviso = document.createElement("div");
  novoAviso.classList.add("toast");
  novoAviso.textContent = mensagem;
  areaAvisos.appendChild(novoAviso);

  setTimeout(function () {
    novoAviso.remove();
  }, 3000);
}

function filtrarCartoes() {
  const textoDigitado = campoBusca.value.trim().toLowerCase();
  let visiveis = 0;

  cartoes.forEach(function (cartao) {
    const nome = cartao.dataset.nome.toLowerCase();
    const categoria = cartao.dataset.categoria.toLowerCase();

    const bateNome = nome.includes(textoDigitado);
    const bateCategoria = categoriaAtual === "todos" || categoria === categoriaAtual;

    if (bateNome && bateCategoria) {
      cartao.classList.remove("oculto");
      visiveis++;
    } else {
      cartao.classList.add("oculto");
    }
  });

  if (visiveis === 0) {
    textoResultado.textContent = "Nenhum cartão encontrado.";
  } else if (visiveis === 1) {
    textoResultado.textContent = "1 cartão encontrado.";
  } else {
    textoResultado.textContent = visiveis + " cartões encontrados.";
  }
}

botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () {
    categoriaAtual = botao.dataset.categoria;

    botoesFiltro.forEach(function (btn) {
      btn.classList.remove("ativo");
    });
    botao.classList.add("ativo");

    filtrarCartoes();
  });
});

botoesFavorito.forEach(function (botao) {
  botao.addEventListener("click", function () {
    botao.classList.toggle("marcado");

    const cartao = botao.parentElement.parentElement;
    const titulo = cartao.querySelector("h3").textContent;

    if (botao.classList.contains("marcado")) {
      botao.textContent = "♥ Favoritado";
      botao.setAttribute("aria-pressed", "true");
      mostrarAviso(titulo + " foi adicionado aos favoritos.");
    } else {
      botao.textContent = "♡ Favoritar";
      botao.setAttribute("aria-pressed", "false");
      mostrarAviso(titulo + " foi removido dos favoritos.");
    }
  });
});

function atualizarContador() {
  const dataLancamento = new Date("2026-11-19T00:00:00-05:00");
  const agora = new Date();
  const diferenca = dataLancamento - agora;

  if (diferenca <= 0) {
    elementoContador.textContent = "Data de lançamento atingida!";
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  elementoContador.textContent =
    dias + "d " + horas + "h " + minutos + "m " + segundos + "s";
}


formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();

  if (nome === "" || email === "") {
    mostrarAviso("Preencha o nome e o e-mail antes de enviar.");
    return;
  }

  mostrarAviso("Obrigado, " + nome + "! Cadastro registrado para " + email + ".");
  formulario.reset();
});


campoBusca.addEventListener("input", filtrarCartoes);

filtrarCartoes();
atualizarContador();
setInterval(atualizarContador, 1000);