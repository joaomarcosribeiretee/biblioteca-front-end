document.addEventListener("DOMContentLoaded", () => {
  // Elementos do formulário de adicionar leitura
  const formAdicionar = document.getElementById("form-leitura");
  // Elementos do formulário de remover livro
  const formRemover = document.getElementById("form-remover");
  // Elementos para controle das datas
  const datasContainer = document.getElementById("datas-container");
  const paginaAtualInput = document.getElementById("paginaAtual");
  const paginasInput = document.getElementById("paginas");
  const statusInput = document.getElementById("status");

  // Recupera leituras do localStorage ou inicializa array vazio
  window.leiturasRegistradas = JSON.parse(localStorage.getItem("leituras")) || [];
  
  // Função para mostrar/esconder campos de data conforme progresso
  function verificarCamposData() {
    const paginaAtual = parseInt(paginaAtualInput.value);
    const totalPaginas = parseInt(paginasInput.value);
    
    if (isNaN(paginaAtual) || isNaN(totalPaginas)) return;
    
    if (paginaAtual < totalPaginas) {
      datasContainer.style.display = "block";
      document.getElementById("dataInicio").required = true;
      document.getElementById("dataMeta").required = true;
      statusInput.value = "em andamento";
    } else {
      datasContainer.style.display = "none";
      document.getElementById("dataInicio").required = false;
      document.getElementById("dataMeta").required = false;
      statusInput.value = "finalizado";
    }
  }

  // Event listeners para campos de páginas
  if (paginaAtualInput && paginasInput) {
    paginaAtualInput.addEventListener("input", verificarCamposData);
    paginasInput.addEventListener("input", verificarCamposData);
  }

  // Configura formulário de adicionar leitura
  if (formAdicionar) {
    formAdicionar.addEventListener("submit", function (e) {
      e.preventDefault();

      const titulo = document.getElementById("titulo").value.trim();
      const autor = document.getElementById("autor").value.trim();
      const totalPaginas = parseInt(document.getElementById("paginas").value);
      const paginaAtual = parseInt(document.getElementById("paginaAtual").value);
      const dataInicio = document.getElementById("dataInicio").value;
      const dataMeta = document.getElementById("dataMeta").value;
      const status = document.getElementById("status").value;

      // Validação
      if (paginaAtual > totalPaginas) {
        alert("❌ Erro: a página atual não pode ser maior que o total de páginas.");
        return;
      }

      // Cria objeto da nova leitura
      const novaLeitura = {
        titulo,
        autor,
        totalPaginas,
        paginaAtual,
        status
      };

      // Adiciona datas apenas se livro não estiver completo
      if (paginaAtual < totalPaginas) {
        novaLeitura.dataInicio = dataInicio;
        novaLeitura.dataMeta = dataMeta;
      }

      // Adiciona e salva no localStorage
      leiturasRegistradas.push(novaLeitura);
      localStorage.setItem("leituras", JSON.stringify(leiturasRegistradas));

      alert(`✅ Leitura registrada com sucesso!\nStatus: ${status}`);
      formAdicionar.reset();
      if (datasContainer) datasContainer.style.display = "none";
    });
  }

  // Configura formulário de remover livro
  if (formRemover) {
    const resultadoDiv = document.getElementById("resultado");
    
    formRemover.addEventListener("submit", function (e) {
      e.preventDefault();

      const titulo = document.getElementById("tituloRemover").value.trim();
      const autor = document.getElementById("autorRemover").value.trim();

      if (!titulo || !autor) {
        resultadoDiv.innerHTML = "<p class='error'>❌ Por favor, preencha ambos os campos: título e autor.</p>";
        return;
      }

      // Busca livro para remover
      const index = leiturasRegistradas.findIndex(
        livro => livro.titulo.toLowerCase() === titulo.toLowerCase() && 
                 livro.autor.toLowerCase() === autor.toLowerCase()
      );

      if (index === -1) {
        resultadoDiv.innerHTML = "<p class='error'>❌ Livro não encontrado. Verifique o título e autor.</p>";
        return;
      }

      // Remove e atualiza localStorage
      leiturasRegistradas.splice(index, 1);
      localStorage.setItem("leituras", JSON.stringify(leiturasRegistradas));

      resultadoDiv.innerHTML = "<p class='success'>✅ Livro removido com sucesso!</p>";
      
      // Limpa formulário após 2 segundos
      setTimeout(() => {
        formRemover.reset();
        resultadoDiv.innerHTML = "";
      }, 2000);
    });
  }

  // Função para carregar e exibir a lista de leituras
  function carregarLeituras() {
    const listaLeituras = document.getElementById("lista-leituras");
    
    // Verifica se está na página de visualização
    if (!listaLeituras) return;

    // Limpa lista antes de recarregar
    listaLeituras.innerHTML = "";

    // Mensagem para lista vazia
    if (leiturasRegistradas.length === 0) {
      listaLeituras.innerHTML = "<p class='empty-list'>📚 Nenhum livro registrado ainda.</p>";
      return;
    }

    // Ordena por status (em andamento primeiro) e depois por título
    leiturasRegistradas.sort((a, b) => {
      if (a.status === "em andamento" && b.status !== "em andamento") return -1;
      if (a.status !== "em andamento" && b.status === "em andamento") return 1;
      return a.titulo.localeCompare(b.titulo);
    });

    // Cria cards para cada livro
    leiturasRegistradas.forEach(livro => {
      const livroCard = document.createElement("div");
      livroCard.className = "livro-card";
      
      const statusClass = livro.status === "finalizado" ? "status-finalizado" : "status-andamento";
      const progresso = livro.status === "finalizado" ? 
        "✅ Concluído" : 
        `📖 ${livro.paginaAtual}/${livro.totalPaginas} páginas`;
      
      livroCard.innerHTML = `
        <h3>${livro.titulo}</h3>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Status:</strong> <span class="${statusClass}">${livro.status}</span></p>
        <p><strong>Progresso:</strong> ${progresso}</p>
      `;
      
      listaLeituras.appendChild(livroCard);
    });
  }
