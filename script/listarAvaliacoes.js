document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8080/getListAvaliacao")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar avaliações: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        const container = document.getElementById("avaliacoesContainer");
  
        if (data.livros && Array.isArray(data.livros)) {
          container.innerHTML = ""; // Limpa antes de preencher
          data.livros.forEach(livro => {
            const card = document.createElement("div");
            card.className = "avaliacao-card";
  
            // Gera estrelas com base na nota
            const estrelas = "⭐".repeat(Math.round(livro.nota));
  
            card.innerHTML = `
              <strong>${livro.nome}</strong>
              <p><strong>Autor:</strong> ${livro.autor}</p>
              <p><strong>Nota:</strong> ${livro.nota} <span class="estrelas">${estrelas}</span></p>
            `;
            container.appendChild(card);
          });
        } else {
          container.innerHTML = "<p>Nenhuma avaliação encontrada.</p>";
        }
      })
      .catch(error => {
        console.error("Erro ao carregar avaliações:", error);
        document.getElementById("avaliacoesContainer").innerHTML = "<p>Erro ao carregar avaliações.</p>";
      });
  });
  