// Adicionar as credenciais do professor
const credentials = {
    username: "professor",
    password: new jsSHA("SHA-256", "TEXT").update("senha123").getHash("HEX") // Senha criptografada com SHA-256
  };
  
  let isChamadaAtiva = false;
  let disciplinaAtual = '';
  let presencas = [];
  
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = new jsSHA("SHA-256", "TEXT").update(document.getElementById("password").value).getHash("HEX");
    disciplinaAtual = document.getElementById("disciplina").value;
  
    if (username === credentials.username && password === credentials.password) {
      isChamadaAtiva = true;
      alert("Login bem-sucedido. Chamada ativada por 5 minutos.");
      setTimeout(desativarChamada, 300000); // 5 minutos em milissegundos
    } else {
      alert("Usuário ou senha incorretos.");
    }
  });
  
  document.getElementById("chamadaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (isChamadaAtiva) {
      const matricula = document.getElementById("matricula").value;
      registrarPresenca(matricula);
    } else {
      alert("Chamada não está ativa.");
    }
  });
  
  function desativarChamada() {
    isChamadaAtiva = false;
    gerarArquivoChamada();
    alert("Tempo de chamada encerrado.");
  }
  
  function registrarPresenca(matricula) {
    presencas.push(matricula);
    console.log(`Matrícula registrada: ${matricula}`);
  }
  
  function gerarArquivoChamada() {
    const data = new Date();
    const nomeArquivo = `${data.toISOString()}-${disciplinaAtual}.txt`;
    const conteudo = presencas.join("\n");
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  