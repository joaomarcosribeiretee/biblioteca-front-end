document.addEventListener("DOMContentLoaded", () => {
    const botaoAtualizar = document.getElementById("botaoAtualizar");
    const form = document.getElementById("formAtualizar");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Impede o recarregamento da página
  
      const nomeLivro = document.getElementById("nomeLivro").value.trim();
      const nomeAutor = document.getElementById("autor").value.trim();
      const paginaAtual = document.getElementById("novaPagina").value.trim();
  
      // Validação: todos os campos precisam estar preenchidos
      if (!nomeLivro || !nomeAutor || !paginaAtual) {
        alert("Por favor, preencha todos os campos antes de atualizar.");
        return;
      }
  
      // Monta o corpo da requisição
      const dados = {
        nomeLivro: nomeLivro,
        nomeAutor: nomeAutor,
        paginaAtualizada: paginaAtual
      };
  
      // Envia a requisição PATCH
      fetch("http://localhost:8080/atualizarLeitura", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        alert("📖 Progresso atualizado com sucesso!");
        form.reset(); // Limpa os campos do formulário
      })
      .catch(error => {
        console.error("Erro ao atualizar:", error);
        alert("❌ Ocorreu um erro ao atualizar o progresso. Verifique os dados e tente novamente.");
      });
    });
  });
  