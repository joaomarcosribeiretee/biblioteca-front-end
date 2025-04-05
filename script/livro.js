document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-leitura");

  // Recupera leituras salvas ou inicializa um array vazio
  window.leiturasRegistradas = JSON.parse(localStorage.getItem("leituras")) || [];
  
  form.addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const totalPaginas = parseInt(document.getElementById("paginas").value);
  const paginaAtual = parseInt(document.getElementById("paginaAtual").value);
  const dataInicio = document.getElementById("dataInicio").value;
  const dataMeta = document.getElementById("dataMeta").value;

  if (paginaAtual > totalPaginas) {
      alert("❌ Erro: a página atual não pode ser maior que o total de páginas.");
      return;
  }

  const novaLeitura = {
      titulo,
      autor,
      totalPaginas,
      paginaAtual,
      dataInicio,
      dataMeta
  };

    // Adiciona a nova leitura e salva no LocalStorage
  leiturasRegistradas.push(novaLeitura);
  localStorage.setItem("leituras", JSON.stringify(leiturasRegistradas));

  alert("✅ Leitura registrada com sucesso!");

  form.reset();

  console.log("Leituras registradas:", leiturasRegistradas);
  });
}); 

function carregarLivros() {
  const lista = document.getElementById('listaLivros');
  const template = document.getElementById('livro-template');
  const leituras = JSON.parse(localStorage.getItem('leituras')) || [];

  lista.innerHTML = '';

  if (leituras.length === 0) {
    lista.innerHTML = '<p>Nenhuma leitura registrada.</p>';
    return;
  }

  leituras.forEach((livro, index) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector('.titulo').textContent = livro.titulo;
    clone.querySelector('.autor').textContent = livro.autor;

    const status = clone.querySelector('.status');
    const botao = clone.querySelector('.botao');
    const devolucao = clone.querySelector('.devolucao');
    const inputData = clone.querySelector('.input-data');
    const campoData = clone.querySelector('.form-devolucao');

    if (livro.emprestado) {
      status.innerHTML = '<span style="color:red;">Emprestado</span>';
      botao.textContent = 'Devolver';
      campoData.style.display = 'none';

      if (livro.dataDevolucao) {
        devolucao.innerHTML = `📅 Devolução até: <strong>${livro.dataDevolucao}</strong>`;
      }

    } else {
      status.innerHTML = '<span style="color:green;">Disponível</span>';
      botao.textContent = 'Emprestar';
      devolucao.innerHTML = '';
    }

    botao.addEventListener('click', () => {
      alternarEmprestimo(index, inputData?.value);
    });

    lista.appendChild(clone);
  });
}

function alternarEmprestimo(index, dataInput) {
  const leituras = JSON.parse(localStorage.getItem('leituras')) || [];
  if (!leituras[index]) return;

  const livro = leituras[index];

  if (!livro.emprestado) {
    if (!dataInput || isNaN(Date.parse(dataInput))) {
      alert("❌ Selecione uma data de devolução válida.");
      return;
    }
    livro.emprestado = true;
    livro.dataDevolucao = dataInput;
  } else {
    livro.emprestado = false;
    delete livro.dataDevolucao;
  }

  localStorage.setItem('leituras', JSON.stringify(leituras));
  carregarLivros();
}

document.addEventListener('DOMContentLoaded', carregarLivros);



document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("livroSelecionado");
  const leituras = JSON.parse(localStorage.getItem("leituras")) || [];

  if (leituras.length === 0) {
    const option = document.createElement("option");
    option.textContent = "Nenhuma leitura encontrada";
    option.disabled = true;
    option.selected = true;
    select.appendChild(option);
    return;
  }

  leituras.forEach((livro, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${livro.titulo}`;
    select.appendChild(option);
  });

 function salvarProgresso() {
    const selectLivro = document.getElementById("livroSelecionado");
    const paginaAtualizada = parseInt(document.getElementById("paginaAtualizada").value);
    const mensagemStatus = document.getElementById("mensagem-status");
    
    // Verifica se há livros cadastrados
    if (selectLivro.disabled) {
      mensagemStatus.innerHTML = '<span style="color:red;">❌ Nenhum livro cadastrado para atualizar</span>';
      return false;
    }
    
    const indexLivro = parseInt(selectLivro.value);
    const leituras = JSON.parse(localStorage.getItem("leituras")) || [];
    
    // Verifica se o índice do livro é válido
    if (indexLivro < 0 || indexLivro >= leituras.length) {
      mensagemStatus.innerHTML = '<span style="color:red;">❌ Livro selecionado inválido</span>';
      return false;
    }
    
    const livro = leituras[indexLivro];
    
    // Validação da página atualizada
    if (isNaN(paginaAtualizada)) {
      mensagemStatus.innerHTML = '<span style="color:red;">❌ Digite um número válido para a página</span>';
      return false;
    }
    
    if (paginaAtualizada < 0) {
      mensagemStatus.innerHTML = '<span style="color:red;">❌ A página não pode ser negativa</span>';
      return false;
    }
    
    if (paginaAtualizada > livro.totalPaginas) {
      mensagemStatus.innerHTML = `<span style="color:red;">❌ A página atual não pode ser maior que o total de páginas (${livro.totalPaginas})</span>`;
      return false;
    }
    
    // Atualiza a página atual do livro
    livro.paginaAtual = paginaAtualizada;
    
    // Salva no localStorage
    localStorage.setItem("leituras", JSON.stringify(leituras));
    
    // Feedback para o usuário
    mensagemStatus.innerHTML = `<span style="color:green;">✅ Progresso atualizado com sucesso!<br>${livro.titulo}: Página ${paginaAtualizada}/${livro.totalPaginas}</span>`;
    
    // Limpa o campo de página
    document.getElementById("paginaAtualizada").value = "";
    
    return true;
  }
  
  // Como usar:
  document.getElementById("form-atualizar-progresso").addEventListener("submit", function(e) {
    e.preventDefault();
    salvarProgresso();
  });
  
  


});
