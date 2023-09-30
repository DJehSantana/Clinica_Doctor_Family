import { renderData } from "./table.js";

const onInit = () => {
  checkSessionToken();
}

let currentCpf = null;

//Verificando se o usuário possui um token para permitir o acesso
const checkSessionToken = () => {
  var sessionToken = sessionStorage.getItem('sessionToken');

  if (sessionToken) {
      return true;
  } else {
      window.location.href = "/login";
      return false;
  }
}

onInit();

sendButton.addEventListener('click', function (event) {
  event.preventDefault();

  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

  const {
    nome,
    email,
    telefone,
    cpf,
    data_nascimento,
    masculino,
    feminino,
    plano_saude } = document.forms.registroPacientes;

  const genero = [masculino, feminino].find(radio => radio.checked);

  const fields = [nome, email, telefone, cpf, data_nascimento, genero, plano_saude];

  const isValidFields = validateFields(fields);

  if (!isValidFields) {
    return;
  }

  //Procura por um cadastro com o mesmo cpf
  const indexPaciente = pacientes.findIndex(paciente => paciente.cpf === cpf.value);

  console.log(indexPaciente);

  if (indexPaciente != -1) {
    console.log(indexPaciente);
    pacientes[indexPaciente] = {
      nome: nome.value,
      cpf: cpf.value,
      email: email.value,
      telefone: telefone.value,
      dataNascimento: data_nascimento.value,
      genero: genero.value,
      planoSaude: plano_saude.value
    };

    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    registroPacientes.reset();
    return;
  }

  //Caso não tenha nenhum registro com o cpf, cria um novo registro
  const novoPaciente = {
    nome: nome.value,
    cpf: cpf.value,
    email: email.value,
    telefone: telefone.value,
    dataNascimento: data_nascimento.value,
    genero: genero.value,
    planoSaude: plano_saude.value
  };

 
  pacientes.push(novoPaciente);
  localStorage.setItem('pacientes', JSON.stringify(pacientes));

  registroPacientes.reset();
});

// Adiciona um evento de clique a cada linha da tabela
document.getElementById('patientsTable').addEventListener('click', function (e) {
  const rowIndex = e.target.parentNode.rowIndex - 1; // subtrai 1 para desconsiderar o cabeçalho da tabela
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const paciente = pacientes[rowIndex];
  openModal(paciente);
});

setInterval(renderData, 5000);

const deletePaciente = (cpf) => {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  console.log(cpf);
  const updatedPacientes = pacientes.filter(paciente => paciente.cpf !== cpf);
  console.log(updatedPacientes);
  localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
  closeModal();
}

const updatePaciente = (cpf) => {
  closeModal();
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

// Encontra o paciente com o CPF fornecido
  const paciente = pacientes.find(paciente => paciente.cpf == cpf);
  if (!paciente) {
    console.error('Paciente não encontrado');
    return;
  }
  const genero = paciente.genero == 'M' ? 'masculino' : 'feminino';
  console.log(genero);
  // Preenche o formulário com os dados do paciente
  const form = document.forms.registroPacientes;
  form.nome.value = paciente.nome;
  form.cpf.value = paciente.cpf;
  form.email.value = paciente.email;
  form.telefone.value = paciente.telefone;
  form.data_nascimento.value = paciente.dataNascimento;
  form.plano_saude.value = paciente.planoSaude;
  
  console.log(form[genero]);
  form[genero].checked = true;
}

const validateFields = (fields) => {
  const fieldNames = ['Nome completo', 'E-mail', 'Telefone', 'CPF', 'Data de nascimento', 'Gênero', 'Plano de saúde'];
  let isValid = true;

  fields.forEach((campo, index) => {
    // Remover a mensagem de erro caso houver
    const mensagemErroExistente = campo.parentNode.querySelector('.error-message');
    if (mensagemErroExistente) {
      campo.parentNode.removeChild(mensagemErroExistente);
    }

    // Se o campo estiver vazio ou se nenhum botão de opção estiver selecionado exibe uma mensagem de erro
    if (!campo.value || (Array.isArray(campo) && !campo.some(radio => radio.checked))) {
      const mensagemErro = document.createElement('p');
      mensagemErro.textContent = `${fieldNames[index]} é obrigatório!`;
      mensagemErro.classList.add('error-message');
      campo.parentNode.insertBefore(mensagemErro, campo.nextSibling);
      isValid = false;
    }
  });

  return isValid;

}

const openModal = (paciente) => {
  modal.classList.toggle('open-modal');
  document.body.classList.toggle('modal-background');

  currentCpf = paciente.cpf || null;
 
  const nome = document.createElement('p');
  const cpf = document.createElement('p');
  const email = document.createElement('p');
  const telefone = document.createElement('p');
  const planoSaude = document.createElement('p');
  const image = document.createElement('img');

  nome.innerHTML = `<b>Nome: </b>${paciente.nome}`;
  cpf.innerHTML = `<b>CPF: </b>${paciente.cpf}`;
  email.innerHTML = `<b>E-mail: </b>${paciente.email}`;
  telefone.innerHTML = `<b>Telefone: </b>${paciente.telefone}`;
  planoSaude.innerHTML = `<b>Plano de Saúde: </b>${paciente.planoSaude}`;

  image.classList.add('image-patients');

  paciente.genero == 'M' ? image.src = './assets/man.png' : image.src = './assets/woman.png';

  imageContainer.appendChild(image);
  patientsInfo.append(nome, cpf, email, telefone, planoSaude);  
}

const closeModal = () => {  
  modal.classList.toggle('open-modal');
  document.body.classList.toggle('modal-background');
    // Limpa os dados do paciente
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
    while (patientsInfo.firstChild) {
      patientsInfo.removeChild(patientsInfo.firstChild);
    }
}

btnDelete.addEventListener('click', () => {
  const isConfirmed = confirm('Tem certeza que deseja excluir esse cadastro?');
  if(isConfirmed) {
    currentCpf ? deletePaciente(currentCpf) : alert('Paciente não encontrado!');
  }  
});

btnUpdate.addEventListener('click', () =>{
  currentCpf ? updatePaciente(currentCpf) : alert('Paciente não encontrado!');
});

btnCancel.addEventListener('click', () => closeModal());






