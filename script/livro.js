document.addEventListener("DOMContentLoaded", () => {
  // Elementos do formulário de adicionar leitura
  const formAdicionar = document.getElementById("form-leitura");
  // Elementos do formulário de remover livro
  const formRemover = document.getElementById("form-remover");
  const paginaAtualInput = document.getElementById("paginaAtual");
  const paginasInput = document.getElementById("paginas");
  const statusInput = document.getElementById("status");

  // Função para mostrar/esconder campos de data conforme progresso
  async function verificarCamposData() {
    const paginaAtual = parseInt(paginaAtualInput.value);
    const totalPaginas = parseInt(paginasInput.value);

    if (isNaN(paginaAtual) || isNaN(totalPaginas)) return;
  }

  // Event listeners para campos de páginas
  if (paginaAtualInput && paginasInput) {
    paginaAtualInput.addEventListener("input", verificarCamposData);
    paginasInput.addEventListener("input", verificarCamposData);
  }

  // Configura formulário de adicionar leitura
  if (formAdicionar) {
    formAdicionar.addEventListener("submit", async function (e) {
      e.preventDefault();

      const titulo = document.getElementById("titulo").value.trim();
      const autor = document.getElementById("autor").value.trim();
      const totalPaginas = parseInt(document.getElementById("paginas").value);
      const paginaAtual = parseInt(document.getElementById("paginaAtual").value);
      let status = document.getElementById("status").value;

      if (paginaAtual > totalPaginas) {
        alert("❌ Erro: a página atual não pode ser maior que o total de páginas.");
        return;
      }

      try {
        const resposta = await fetch("http://localhost:8080/addLeitura", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            livro: {
              nomeAutor: autor,
              nomeLivro: titulo,
              numPaginasLivro: totalPaginas
            },
            leitura: {
              paginasLidas: paginaAtual
            }
          })
        });

        const dados = await resposta.json();

        if (dados.status !== "OK") {
          alert("❌ Erro ao registrar leitura.");
          return;
        }

        if (dados.statusLeitura === "Finalizado") status = 'finalizado';
        else if (dados.statusLeitura === "NaoIniciado") status = 'naoIniciado';
        else status = 'emAndamento';

        const novaLeitura = {
          titulo,
          autor,
          totalPaginas,
          paginaAtual,
          status
        };

        localStorage.setItem("leitura", JSON.stringify(novaLeitura));

        alert(`✅ Leitura registrada com sucesso!\nStatus: ${status}`);

        formAdicionar.reset();

        if (status === 'emAndamento') {
          window.location.href = 'metasPrincipais.html';
        } else {
          window.location.href = 'Menu.html';
        }

      } catch (erro) {
        console.error("Erro:", erro);
        alert("❌ Erro ao conectar com o backend.");
      }
    });
  }

  // Configura formulário de remover livro
  if (formRemover) {
    const resultadoDiv = document.getElementById("resultado");

    formRemover.addEventListener("submit", async function (e) {
      e.preventDefault();

      const titulo = document.getElementById("tituloRemover").value.trim();
      const autor = document.getElementById("autorRemover").value.trim();

      if (!titulo || !autor) {
        resultadoDiv.innerHTML = "<p class='error'>❌ Por favor, preencha ambos os campos: título e autor.</p>";
        return;
      }

      try {
        const resposta = await fetch("http://localhost:8080/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nomeAutor: autor,
            nomeLivro: titulo
          })
        });

        const dados = await resposta.json();

        if (dados.status !== "OK") {
          alert("❌ Erro ao deletar livro.");
          return;
        }

        alert(`✅ Livro deletado com sucesso!\n`);
        window.location.href = 'Menu.html';

      } catch (erro) {
        console.error("Erro:", erro);
        alert("❌ Erro ao conectar com o backend.");
      }
    });
  }
  
  // Função para carregar e exibir a lista de leituras

 document.getElementById("botaoLeitura").addEventListener("click", async function (e) {
    e.preventDefault();

    const listaLeituras = document.getElementById("lista-leituras");

    alert("oi");
    //if (!listaLeituras) return;
    alert("oi2");

    try {
      const resposta = await fetch("http://localhost:8080/getListLeitura", {
        method: "GET"
      });

      const leituras = await resposta.json();

      alert(JSON.stringify(leituras));
      
      if (leituras.status !== "OK") {
        alert("❌ Erro ao mostrar.");
        return;
      }


      if (!leituras.livros) {
        alert("❌ leituras.livros está indefinido ou vazio.");
        return;
      }

      const livros = leituras.livros;
    
      alert(JSON.stringify(livros));


      //listaLeituras.innerHTML = "";

      if (livros.length === 0) {
        listaLeituras.innerHTML = "<p class='empty-list'>📚 Nenhum livro registrado ainda.</p>";
        return;
      }

      livros.forEach(livro => {
        const livroCard = document.createElement("div");
        livroCard.className = "livro-card";

        const statusClass = livro.status === "finalizado" ? "status-finalizado" : "status-andamento";
        const progresso = livro.status === "finalizado"
          ? "✅ Concluído"
          : `📖 ${livro.paginaAtual}/${livro.qtdPaginas} páginas`;

        livroCard.innerHTML = `
          <h3>${livro.nome}</h3>
          <p><strong>Autor:</strong> ${livro.autor}</p>
          <p><strong>Status:</strong> <span class="${statusClass}">${livro.status}</span></p>
          <p><strong>Progresso:</strong> ${progresso}</p>
        `;

        window.location.href='visualizar-leituras.html'

        listaLeituras.appendChild(livroCard);
      });

      

    } catch (erro) {
      console.error("Erro:", erro);
      alert("❌ Erro ao conectar com o backend.");
    }

    
  });

  //async function carregarLeituras() {
  //  const listaLeituras = document.getElementById("lista-leituras");

    
  //}

  // Configura botão de atualizar lista (se existir na página)
  //const atualizarBtn = document.getElementById("atualizar-lista");
  //if (atualizarBtn) {
  //  carregarLeituras();
  //  atualizarBtn.addEventListener("click", carregarLeituras);
  //}
});
