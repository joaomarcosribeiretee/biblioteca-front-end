window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-leitura").addEventListener("submit", async function (e) {
        e.preventDefault(); // Impede o comportamento padrão de enviar o formulário
    
        const leituras = JSON.parse(localStorage.getItem("leituras")) || [];
    
        const dataInicio = document.getElementById("dataInicio").value;
        const dataMeta = document.getElementById("dataMeta").value;
    
        const leitura = JSON.parse(localStorage.getItem("leitura"));

        if (!leitura) {
            alert("❌ Nenhuma leitura encontrada.");
            return;
        }

        const nomeAutor = leitura.autor;
        const nomeLivro = leitura.titulo;
        
        if (dataInicio !== "" && dataMeta !== "") {
            // Enviar requisição POST para o backend
            try{
                const resposta = await
                fetch("http://localhost:8080/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dataInicio: dataInicio,
                        dataPrevista: dataMeta,
                        nomeLivro: nomeLivro,
                        nomeAutor: nomeAutor
                    })
                });
    
                const dados = await resposta.json();
    
                if(dados.status !== "OK"){
                    alert("❌ Erro ao registrar meta.");
                    return;
                }
    
                alert(`✅ Leitura registrada com sucesso!\n`);
    
                window.location.href='Menu.html'
    
            }catch (erro) {
                console.error("Erro:", erro);
                alert("❌ Erro ao conectar com o backend.");
            }
            
        } else {
            document.getElementById("resultado").textContent = "Por favor, preencha as duas datas.";
        }
    });
});

