document.getElementById("enviar").addEventListener("click", Random);
let captcha = document.getElementById("NumRandom").innerHTML = Math.floor((Math.random() * 10000000));

function Random() {
  let valueInput = document.getElementById("inputCaptcha").value;

  if (valueInput == captcha) {
    document.getElementById("validez").innerHTML = "El captcha ha sido validado y el mensaje ha sido enviado correctamente";
  } else {
    document.getElementById("validez").innerHTML = "El captcha es incorrecto, ingreselo nuevamente"
  }

}
