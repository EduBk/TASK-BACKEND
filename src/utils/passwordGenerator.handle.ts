

const generatePassword = (base: string) => {
  let password = "";
  for (let x = 0; x < 12; x++) {
    let random = Math.floor(Math.random() * base.length);
    password += base.charAt(random);
  }

  return password;
};

const generate = () => {
  let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "01234567890";
  const symbols = ".,;:<>?=+!*()@$%#";

  base += numbers;
  base += symbols;

  return generatePassword(base);
};

export default generate;
