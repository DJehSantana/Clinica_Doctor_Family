const onInit = () => {
  register('admin');
}

onInit();

btnLogin.addEventListener('click', async () => {
  const {username, password} = document.forms.formLogin;
  console.log(password);
  const result = await login(username.value, password.value);
  if(!result) {
    alert('Usuário ou Senha incorretos!');
  } 
  const pathname = window.location.pathname;
  window.location.href = `${pathname}/`;
});

const createSessionToken = () => {
  return crypto.randomUUID();  
}

async function createPasswordHash(password) {
    const data = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function register(username){
  const password = await createPasswordHash('admin');
  //console.log(password);
  const data = {username, password}
  localStorage.setItem('authenticate', JSON.stringify(data));
}

export async function login(username, password){
  const data = JSON.parse(localStorage.getItem('authenticate'));
  const hashedPassword = await createPasswordHash(password);

  console.log(`hashedPassword: ${hashedPassword}`);
  console.log(`data.password: ${data.password}`);
  console.log(`data.username: ${data.username}`);

  if (hashedPassword == data.password && username == data.username) {
      const sessionToken = createSessionToken();
      console.log(`sessionToken: ${sessionToken}`);
      sessionStorage.setItem('sessionToken', sessionToken);
      return true;
  } else {
      return false;
  }
}

