document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-leitura");

  // Torna o array global
  window.leiturasRegistradas = [];

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

    leiturasRegistradas.push(novaLeitura);

    // popup dos crias
    alert("✅ Leitura registrada com sucesso!");


    form.reset();

    // (Opcional) Log no console automático
    console.log("Leituras registradas:", leiturasRegistradas);
  });
});
