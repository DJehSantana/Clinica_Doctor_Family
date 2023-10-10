const URL = "https://crudcrud.com/api/3a2e9a48b2d64b60a24a7a5e2b2ad5df/pacientes";

export async function getPatients() {
  const response = await fetch(URL);
  return await response.json();
}

export async function getPatientById(id) {
  const response = await fetch(URL + `/${id}`, { method: "GET" });
  return await response.json();
}

export async function deletePatient(id) {
  const response = await fetch(URL + `/${id}`, { method: "DELETE" });
  if (response.status === 200) {
    return true;
  }
  console.error('Não foi possível deletar o cadastro. Tente novamente mais tarde!');
}

export async function createPatient(patient) {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(patient),
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();  
  return data;
}

export async function updatePatient(id, patientFields) {
  const response = await fetch(URL + `/${id}`, {
    method: "PUT",
    body: JSON.stringify(patientFields),
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (response.status === 200) {
    console.log('Cadastro atualizado com sucesso!');
    return true;
  }
  console.error('Não foi possível atualizar o cadastro');
  return false;
}