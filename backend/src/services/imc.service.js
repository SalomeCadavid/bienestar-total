const ImcModel = require('../models/imc.model');

const calcularIMC = async (usuario_id, peso, estatura) => {
  const imc = peso / (estatura * estatura);

  let clasificacion = '';
  let plan_id = 1;

  if (imc < 18.5) {
    clasificacion = 'Bajo peso';
    plan_id = 1;
  } else if (imc < 25) {
    clasificacion = 'Peso normal';
    plan_id = 1;
  } else if (imc < 30) {
    clasificacion = 'Sobrepeso';
    plan_id = 2;
  } else {
    clasificacion = 'Obesidad';
    plan_id = 3;
  }

  await ImcModel.actualizarIMCUsuario(
    usuario_id,
    peso,
    estatura,
    imc.toFixed(2),
    clasificacion,
    plan_id
  );

  return {
    imc: imc.toFixed(2),
    clasificacion,
    plan_id
  };
};

module.exports = {
  calcularIMC
};

