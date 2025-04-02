document.addEventListener("DOMContentLoaded", () => {
    const dados = JSON.parse(localStorage.getItem("statusMeta"));
    const detalhes = document.getElementById("detalhes");
    const barra = document.getElementById("progresso");
  
    if (!dados) {
      detalhes.innerHTML = "❌ Nenhuma meta encontrada.";
      return;
    }
  
    const progressoPercentual = Math.min(100, Math.round((dados.paginaAtual / dados.totalPaginas) * 100));
  
    const hojeDate = new Date();
    const metaDate = new Date(dados.dataMeta);
    const diffTime = metaDate - hojeDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    let infoMeta = "";
    let metaClass = "meta-ok";
  
    if (diffDays > 0) {
      infoMeta = `⏳ Meta termina em <strong>${diffDays}</strong> dia(s).`;
    } else if (diffDays === 0) {
      infoMeta = "⚠️ Hoje é o último dia da meta!";
      metaClass = "meta-alerta";
    } else {
      infoMeta = `❌ Meta atrasada há <strong>${Math.abs(diffDays)}</strong> dia(s).`;
      metaClass = "meta-atrasada";
    }
  
    detalhes.innerHTML = `
      <strong>Status:</strong> ${dados.status}<br>
      <strong>Livro:</strong> ${dados.titulo}<br>
      <strong>Página Atual:</strong> ${dados.paginaAtual}<br>
      <strong>Total de Páginas:</strong> ${dados.totalPaginas}<br>
      <strong>Data de Início:</strong> ${dados.dataInicio}<br>
      <strong class="${metaClass}">Data Meta: ${dados.dataMeta}</strong><br>
      <strong>Data Atual:</strong> ${dados.dataAtual}<br><br>
      ${infoMeta}
    `;
  
    barra.style.width = progressoPercentual + "%";
    barra.textContent = progressoPercentual + "%";
  });