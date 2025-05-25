document.addEventListener("DOMContentLoaded", () => {
    const addForm = document.getElementById("addDesejoForm");
    const removeForm = document.getElementById("removerDesejoForm");

    // Adicionar Livro à Lista de Desejos
    if (addForm) {
        addForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nomeLivro = document.getElementById("nomeLivroDesejo").value.trim();
            const nomeAutor = document.getElementById("nomeAutorDesejo").value.trim();
            const prioridade = document.getElementById("prioridade").value;

            if (!nomeLivro || !nomeAutor) {
                alert("❌ Por favor, preencha o nome do livro e do autor.");
                return;
            }

            const dados = {
                nomeLivro: nomeLivro,
                nomeAutor: nomeAutor,
                prioridade: prioridade
            };

            try {
                const response = await fetch("http://localhost:8080/addListaDesejo", { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados)
                });

                const result = await response.json();

                if (response.ok && result.status === "OK") {
                    alert("✅ Livro adicionado à lista de desejos com sucesso!");
                    addForm.reset();
                } else {
                    alert(`❌ Erro ao adicionar livro: ${result.message || 'Erro desconhecido'}`);
                }
            } catch (error) {
                console.error("Erro ao adicionar à lista de desejos:", error);
                alert("❌ Ocorreu um erro de conexão ao adicionar o livro.");
            }
        });
    }

    // Remover Livro da Lista de Desejos
    if (removeForm) {
        removeForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nomeLivro = document.getElementById("nomeLivroRemover").value.trim();

            if (!nomeLivro) {
                alert("❌ Por favor, preencha o nome do livro a ser removido.");
                return;
            }

            const dados = {
                nomeLivro: nomeLivro
            };

            try {
                const response = await fetch("http://localhost:8080/deleteLivroDesejado", { 
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados) 
                });

                const result = await response.json();

                if (response.ok && result.status === "OK") {
                    alert("🗑️ Livro removido da lista de desejos com sucesso!");
                    removeForm.reset();
                } else {
                     alert(`❌ Erro ao remover livro: ${result.message || 'Verifique o nome do livro e tente novamente.'}`);
                }
            } catch (error) {
                console.error("Erro ao remover da lista de desejos:", error);
                alert("❌ Ocorreu um erro de conexão ao remover o livro.");
            }
        });
    }
});

