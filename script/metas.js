// Carrega os livros salvos do localStorage
function getLivrosSalvos() {
    const data = localStorage.getItem("leituras");
    return data ? JSON.parse(data) : [];
  }
  
  // Armazena a meta diária
  window.metaDiaria = null;
  
  // Aguarda DOM carregado para popular o seletor de livros
  window.addEventListener("DOMContentLoaded", () => {
    const seletorLivros = document.getElementById("livro-verificacao");
    const livrosSalvos = getLivrosSalvos();
  
    livrosSalvos.forEach((livro, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = livro.titulo;
      seletorLivros.appendChild(option);
    });
  });
  
  function verificarMetaPrincipal() {
    const seletor = document.getElementById("livro-verificacao");
    const index = parseInt(seletor.value);
    const livros = getLivrosSalvos();
  
    if (!livros.length || isNaN(index)) {
      alert("❌ Nenhum livro selecionado ou lista vazia.");
      return;
    }
  
    const livro = livros[index];
    const hoje = new Date().toISOString().split("T")[0];
  
    let status = "📖 Meta EM ANDAMENTO.";
    if (livro.paginaAtual === livro.totalPaginas && hoje <= livro.dataMeta) {
      status = "✅ Meta CUMPRIDA no prazo.";
    } else if (livro.paginaAtual === livro.totalPaginas && hoje > livro.dataMeta) {
      status = "⚠️ Meta CUMPRIDA com ATRASO.";
    } else if (hoje > livro.dataMeta) {
      status = "❌ Meta FALHADA. Livro ainda não foi finalizado.";
    }
  
    const dados = {
      status,
      titulo: livro.titulo,
      paginaAtual: livro.paginaAtual,
      totalPaginas: livro.totalPaginas,
      dataInicio: livro.dataInicio,
      dataMeta: livro.dataMeta,
      dataAtual: hoje
    };
  
    localStorage.setItem("statusMeta", JSON.stringify(dados));
    window.location.href = "statusMeta.html";
  }
  
  function adicionarMetaDiaria() {
    const paginas = parseInt(document.getElementById("paginas-dia").value);
  
    if (isNaN(paginas) || paginas <= 0) {
      alert("❌ Informe um valor válido para páginas por dia.");
      return;
    }
  
    window.metaDiaria = {
      paginasPorDia: paginas,
      dataDefinicao: new Date().toISOString().split("T")[0]
    };
  
    alert("✅ Meta diária salva com sucesso!");
    document.getElementById("paginas-dia").value = "";
  }
  
  function verMetaDiaria() {
    const resultado = document.getElementById("resultado-meta-diaria");
    if (window.metaDiaria) {
      resultado.textContent = `📚 Meta diária: ${metaDiaria.paginasPorDia} páginas/dia (definida em ${metaDiaria.dataDefinicao})`;
    } else {
      resultado.textContent = "⚠️ Nenhuma meta diária definida.";
    }
  }
  
  function excluirMetaDiaria() {
    if (window.metaDiaria) {
      window.metaDiaria = null;
      alert("🗑️ Meta diária excluída com sucesso.");
    } else {
      alert("❌ Nenhuma meta diária para excluir.");
    }
  
    document.getElementById("resultado-meta-diaria").textContent = "";
  }