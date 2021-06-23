import React, { useState } from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calcularBrand, obtenerPlan } from "../helper";
import PropTypes from "prop-types";

// El estilo se declara antes de declarar el componente
const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
    background-color: #26c6da;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {
  //Definir el state

  const [datos, guardarDatos] = useState({
    brand: "",
    year: "",
    plan: "",
  });

  const [error, guardarError] = useState(false);

  // Extraer los valores

  const { brand, year, plan } = datos;

  // Leer los datos del formulario y colocarlos en el State

  const obtenerInformacion = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario presiona Submit

  const cotizarSeguro = (e) => {
    e.preventDefault();

    if (brand.trim() === "" || year.trim() === "" || plan.trim() === "") {
      guardarError(true);
      return;
    }

    guardarError(false);

    // Una base de 2000
    let resultado = 2000;

    // obtener la diferencia de años
    const diferencia = obtenerDiferenciaYear(year);

    // por cada año hay que restar el 3%
    resultado -= (diferencia * 3 * resultado) / 100;

    // Americano 15%
    // Asiatico 5%
    // Europeo 30%
    resultado = calcularBrand(brand) * resultado;

    // Basic aumenta 20%
    // Full 50%
    const incrementoPlan = obtenerPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    guardarCargando(true);

    setTimeout(() => {
      // Elimina el spinner
      guardarCargando(false);

      // Pasa la información al componente principal
      guardarResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 1500);
  };
  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>All fields are required</Error> : null}
      <Campo>
        <Label>Brand</Label>
        <Select name="brand" value={brand} onChange={obtenerInformacion}>
          <option value="">--Select--</option>
          <option value="american">American</option>
          <option value="european">European</option>
          <option value="asian">Asian</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Year</Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">-- Select --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basic"
          checked={plan === "basic"}
          onChange={obtenerInformacion}
        />
        Basic
        <InputRadio
          type="radio"
          name="plan"
          value="full"
          checked={plan === "full"}
          onChange={obtenerInformacion}
        />
        Full
      </Campo>
      <Boton type="submit">Quote</Boton>
    </form>
  );
};

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired,
};

export default Formulario;
