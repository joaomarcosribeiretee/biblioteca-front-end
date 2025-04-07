// js/verAvaliacao.js

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("avaliacoesContainer");
    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
  
    if (avaliacoes.length === 0) {
      container.innerHTML = "<p>Nenhuma avaliação registrada.</p>";
      return;
    }
  
    avaliacoes.forEach(av => {
      const div = document.createElement("div");
      div.classList.add("avaliacao-card");
  
      const estrelas = "★".repeat(Math.round(av.nota)) + "☆".repeat(10 - Math.round(av.nota));
  
      div.innerHTML = `
        <strong>${av.titulo}</strong> - ${av.autor}<br>
        Nota: ${av.nota}/10 <br>
        <span class="estrelas">${estrelas}</span>
      `;
  
      container.appendChild(div);
    });
  });
  