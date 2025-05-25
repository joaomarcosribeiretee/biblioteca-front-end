document.addEventListener("DOMContentLoaded", () => {
    const addForm = document.getElementById("addEmprestimoForm");
    const listarBtn = document.getElementById("listarEmprestimosBtn");
    const listaEmprestimosDiv = document.getElementById("listaEmprestimos");

    // Adicionar Empréstimo
    if (addForm) {
        addForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nomeLivro = document.getElementById("nomeLivro").value.trim();
            const nomeAutor = document.getElementById("nomeAutor").value.trim();
            const dataInicio = document.getElementById("dataInicio").value;
            const dataPrevista = document.getElementById("dataPrevista").value;

            if (!nomeLivro || !nomeAutor || !dataInicio || !dataPrevista) {
                alert("❌ Por favor, preencha todos os campos do empréstimo.");
                return;
            }

            const dados = {
                nomeLivro: nomeLivro,
                nomeAutor: nomeAutor,
                dataInicio: dataInicio,
                dataPrevista: dataPrevista
            };

            try {
                const response = await fetch("http://localhost:8080/addEmprestimo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados)
                });

                const result = await response.json();

                if (response.ok && result.status === "OK") {
                    alert("✅ Empréstimo adicionado com sucesso!");
                    addForm.reset();
                } else {
                    alert(`❌ Erro ao adicionar empréstimo: ${result.message || 'Erro desconhecido'}`);
                }
            } catch (error) {
                console.error("Erro ao adicionar empréstimo:", error);
                alert("❌ Ocorreu um erro de conexão ao adicionar o empréstimo.");
            }
        });
    }

    // Função para Carregar e Listar Empréstimos
    async function carregarEmprestimos() {
        if (!listaEmprestimosDiv) return;

        listaEmprestimosDiv.textContent = 'Carregando...';

        try {
            const response = await fetch("http://localhost:8080/getListEmprestimos", {
                method: "GET"
            });

            if (!response.ok) {
                 throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.emprestimos && Array.isArray(data.emprestimos) && data.emprestimos.length > 0) {
                const listaFormatada = data.emprestimos.map(emp => 
                    `Livro: ${emp.nomeLivro}\nAutor: ${emp.nomeAutor}\nInício: ${emp.dataInicio}\nDevolução Prevista: ${emp.dataPrevista}\n--------------------\n`
                ).join('');
                listaEmprestimosDiv.textContent = listaFormatada;
            } else {
                listaEmprestimosDiv.textContent = 'Nenhum empréstimo encontrado.';
            }

        } catch (error) {
            console.error("Erro ao listar empréstimos:", error);
            listaEmprestimosDiv.textContent = '❌ Erro ao carregar a lista de empréstimos.';
        }
    }

    if (listarBtn) {
        listarBtn.addEventListener("click", carregarEmprestimos);
    }
});

