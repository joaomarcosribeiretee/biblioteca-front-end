const botao = document.getElementById("botaoLeitura")

function carregarLeituras() {
    fetch("http://localhost:8080/getListLeitura")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const lista = document.getElementById("lista-leituras");
            lista.innerHTML = ""; // limpa a lista atual

            data.livros.forEach(livro => {
                const card = document.createElement("div");
                card.className = "livro-card";
                const statusFormatado = livro.status === "Finalizado" ? "finalizado" : "em andamento";
                const corStatus = livro.status === "Finalizado" ? "green" : "orange";
                const progresso = livro.status === "Finalizado" ?
                    "✅ Concluído" : `📖 ${livro.paginaAtual}/${livro.qtdPaginas} páginas`;

                card.innerHTML = `
                    <h3>${livro.nome}</h3>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Status:</strong> <span style="color: ${corStatus}">${statusFormatado}</span></p>
                    <p><strong>Progresso:</strong> ${progresso}</p>
                `;
                lista.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os dados:", error);
        });
}

// Carrega automaticamente ao abrir a página
window.addEventListener("DOMContentLoaded", carregarLeituras);

// Ainda permite atualizar manualmente se quiser
document.addEventListener("DOMContentLoaded", () => {
    const botaoAtualizar = document.getElementById("atualizar-lista");
    if (botaoAtualizar) {
        botaoAtualizar.addEventListener("click", carregarLeituras);
    }
});
