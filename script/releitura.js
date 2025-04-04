function getLivrosSalvos() {
    const data = localStorage.getItem("leituras");
    return data ? JSON.parse(data) : [];
  }
  
  function salvarLivros(livros) {
    localStorage.setItem("leituras", JSON.stringify(livros));
  }
  
  function renderizarLivros() {
    const container = document.getElementById("lista-livros");
    container.innerHTML = "";
    const livros = getLivrosSalvos();
  
    livros.forEach((livro, index) => {
      const div = document.createElement("div");
      div.className = "livro";
      div.innerHTML = `
        <h3>${livro.titulo}</h3>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Página Atual:</strong> ${livro.paginaAtual}</p>
        <button onclick="marcarComoReleitura(${index})">Releitura</button>
      `;
      container.appendChild(div);
    });
  }
  
  function marcarComoReleitura(index) {
    const livros = getLivrosSalvos();
    livros[index].paginaAtual = 0;
    salvarLivros(livros);
    renderizarLivros();
  }
  
  document.addEventListener("DOMContentLoaded", renderizarLivros);

document.getElementById("btn-retornar-menu").addEventListener("click", () => {
    window.location.href = "../pages/Menu.html"; // Ajuste o caminho conforme necessário
});
  