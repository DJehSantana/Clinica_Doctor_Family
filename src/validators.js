export const validateFields = (fields) => {
  const fieldNames = ['Nome completo', 'E-mail', 'Telefone', 'CPF', 'Data de nascimento', 'Gênero', 'Plano de saúde'];
  let isValid = true;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Formato de data YYYY-MM-DD
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato de CPF 000.000.000-00
  const today = (new Date()).toISOString().split('T')[0];

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
      return isValid;
    }

    if (fieldNames[index] === 'CPF') {
      if (!cpfRegex.test(campo.value)) {
        const mensagemErro = document.createElement('p');
        mensagemErro.textContent = 'Formato de CPF inválido! Use o formato 000.000.000-00.';
        mensagemErro.classList.add('error-message');
        campo.parentNode.insertBefore(mensagemErro, campo.nextSibling);
        isValid = false;
        return isValid;
      }
    }

    if (fieldNames[index] == 'Data de nascimento') {
      if (!dateRegex.test(campo.value)) {
        const mensagemErro = document.createElement('p');
        mensagemErro.textContent = 'Formato de data inválido! Use o formato YYYY-MM-DD.';
        mensagemErro.classList.add('error-message');
        campo.parentNode.insertBefore(mensagemErro, campo.nextSibling);
        isValid = false;
        return isValid;
      }
      if (campo.value > today) {
        const mensagemErro = document.createElement('p');
        mensagemErro.textContent = 'A data de nascimento não pode ser maior que a data de hoje!';
        mensagemErro.classList.add('error-message');
        campo.parentNode.insertBefore(mensagemErro, campo.nextSibling);
        isValid = false;
      }

    }
  });

  return isValid;
}
