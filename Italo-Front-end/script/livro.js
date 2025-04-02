document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-leitura");

    // Recupera leituras salvas ou inicializa um array vazio
    window.leiturasRegistradas = JSON.parse(localStorage.getItem("leituras")) || [];
    
    form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const totalPaginas = parseInt(document.getElementById("paginas").value);
    const paginaAtual = parseInt(document.getElementById("paginaAtual").value);
    const dataInicio = document.getElementById("dataInicio").value;
    const dataMeta = document.getElementById("dataMeta").value;
  
    if (paginaAtual > totalPaginas) {
        alert("❌ Erro: a página atual não pode ser maior que o total de páginas.");
        return;
    }
  
    const novaLeitura = {
        titulo,
        autor,
        totalPaginas,
        paginaAtual,
        dataInicio,
        dataMeta
    };
  
      // Adiciona a nova leitura e salva no LocalStorage
    leiturasRegistradas.push(novaLeitura);
    localStorage.setItem("leituras", JSON.stringify(leiturasRegistradas));
  
    alert("✅ Leitura registrada com sucesso!");
  
    form.reset();
  
    console.log("Leituras registradas:", leiturasRegistradas);
    });
  }); 