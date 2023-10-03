import { createPatient, deletePatient, getPatientById, updatePatient } from "./apiCrud.js";
import { renderData } from "./table.js";
import { validateFields } from "./validators.js";

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
    window.location.href = 'https://djehsantana.github.io/Clinica_Doctor_Family';
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

  if (indexPaciente != -1) {

    let updatedPatient = pacientes[indexPaciente];

    console.log(updatedPatient);

    updatedPatient = {
      idCrud: updatedPatient.idCrud,
      nome: nome.value,
      cpf: cpf.value,
      email: email.value,
      telefone: telefone.value,
      dataNascimento: data_nascimento.value,
      genero: genero.value,
      planoSaude: plano_saude.value
    };

    pacientes[indexPaciente] = updatedPatient;

    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    const result = updatePatient(updatedPatient.idCrud, updatedPatient);

    console.log(result);

    registroPacientes.reset();
    return;
  }

  //Caso não tenha nenhum registro com o cpf, cria um novo registro
  const novoPaciente = {
    idCrud: null,
    nome: nome.value,
    cpf: cpf.value,
    email: email.value,
    telefone: telefone.value,
    dataNascimento: data_nascimento.value,
    genero: genero.value,
    planoSaude: plano_saude.value
  };

  //persiste os dados no CRUD CRUD
  createPatient(novoPaciente).then((data) => {
    novoPaciente.idCrud = data._id;    
    console.log(novoPaciente);

    pacientes.push(novoPaciente);
    console.log(pacientes);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  });

  registroPacientes.reset();
});

// Adiciona um evento de clique a cada linha da tabela
document.getElementById('patientsTable').addEventListener('click', function (e) {
  const rowIndex = e.target.parentNode.rowIndex - 1; // subtrai 1 para desconsiderar o cabeçalho da tabela
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const paciente = pacientes[rowIndex];

  getPatientById(paciente.idCrud).then((data) => {
    console.log(data);
  })

  openModal(paciente);
});

setInterval(renderData, 5000);

const deletePaciente = (cpf) => {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

  console.log(pacientes);
  const paciente = pacientes.find(p => p.cpf === cpf);

  //Remove registro do CRUD CRUD
  const resp = deletePatient(paciente.idCrud);
  console.log(resp);

  const updatedPacientes = pacientes.filter(paciente => paciente.cpf !== cpf);
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
    alert('Paciente não encontrado!');
  }

  console.log(paciente);

  const genero = paciente.genero == 'M' ? 'masculino' : 'feminino';

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






