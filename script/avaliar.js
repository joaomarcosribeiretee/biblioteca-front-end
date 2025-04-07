// js/avaliar.js

document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("livroSelecionado");
    const leituras = JSON.parse(localStorage.getItem("leituras")) || [];
  
    // Preencher select com livros
    if (leituras.length === 0) {
      const option = document.createElement("option");
      option.textContent = "Nenhum livro encontrado";
      option.disabled = true;
      option.selected = true;
      select.appendChild(option);
      return;
    }
  
    leituras.forEach((livro, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = livro.titulo;
      select.appendChild(option);
    });
  
    // Evento de envio da avaliação
    document.getElementById("formAvaliacao").addEventListener("submit", function(e) {
      e.preventDefault();
  
      const livroIndex = select.value;
      const nota = parseFloat(document.getElementById("nota").value);
  
      if (nota < 0 || nota > 10) {
        alert("❌ Nota inválida. Insira um valor entre 0 e 10.");
        return;
      }
  
      const livroSelecionado = leituras[livroIndex];
      const novaAvaliacao = {
        titulo: livroSelecionado.titulo,
        autor: livroSelecionado.autor,
        nota
      };
  
      const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
      avaliacoes.push(novaAvaliacao);
      localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
  
      alert("✅ Avaliação enviada com sucesso!");
      this.reset();
    });
  });
  