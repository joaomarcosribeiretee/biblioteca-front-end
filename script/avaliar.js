// js/avaliar.js

document.addEventListener("DOMContentLoaded", () => {

    //const leituras = JSON.parse(localStorage.getItem("leituras")) || [];
  
    // Preencher select com livros
    //if (leituras.length === 0) {
    //  const option = document.createElement("option");
    //  option.textContent = "Nenhum livro encontrado";
    //  option.disabled = true;
    //  option.selected = true;
    //  select.appendChild(option);
    //  return;
    //}
  
    //leituras.forEach((livro, index) => {
    //  const option = document.createElement("option");
    //  option.value = index;
    // option.textContent = livro.titulo;
    // select.appendChild(option);
    //});
  
    // Evento de envio da avaliação
    document.getElementById("formAvaliacao").addEventListener("submit", async function(e) {
      e.preventDefault();
  
      //const livroIndex = select.value;
      const nota = parseFloat(document.getElementById("nota").value);
      const autor = document.getElementById("autor").value;
      const titulo = document.getElementById("titulo").value;
  
      if (nota < 0 || nota > 10) {
        alert("❌ Nota inválida. Insira um valor entre 0 e 10.");
        return;
      }
  
      if(titulo != "" && autor != ""){
        //const livroSelecionado = leituras[livroIndex];
        try{
          const resposta = await
          fetch("http://localhost:8080/addAvaliacao", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                nomeLivro: titulo,
                nomeAutor: autor,
                nota: nota
              })
          });

          const dados = await resposta.json();

          if(dados.status !== "OK"){
              alert("❌ Erro ao avaliar.");
              return;
          }

          alert(`✅ Leitura avaliada com sucesso!\n`);

          window.location.href='Menu.html'

        }catch (erro) {
          console.error("Erro:", erro);
          alert("❌ Erro ao conectar com o backend.");
        }
      }else{
        document.getElementById("resultado").textContent = "Por favor, preencha os dois campos.";
      }
      

      //const novaAvaliacao = {
      //  nomeLivro: titulo,
      //  nomeAutor: autor,
      //  nota: nota
      //};
  
      //const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
      //avaliacoes.push(novaAvaliacao);
      //localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
      this.reset();
    });
  });
  