export const renderData = () => {
  var pacientes = JSON.parse(localStorage.getItem('pacientes'));
  var corpoTabela = document.getElementById('tableBody');

  corpoTabela.innerHTML = '';

  for (let i = 0; i < pacientes.length; i++) {
    const row = document.createElement('tr');

    const columns = ['nome', 'cpf', 'email', 'telefone', 'dataNascimento', 'genero', 'planoSaude'];
    for (var j = 0; j < columns.length; j++) {
      var celula = document.createElement('td');
      celula.setAttribute('data-th', columns[j]);
      celula.innerText = pacientes[i][columns[j]];
      row.appendChild(celula);
    }
    corpoTabela.appendChild(row);
  }
};


