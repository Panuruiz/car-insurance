import React from "react";
import styled from "@emotion/styled";
import { primeraMayuscula } from "../helper";
import PropTypes from "prop-types";

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;

const Resumen = ({ datos }) => {
  // extraer de datos
  const { brand, year, plan } = datos;
  if (brand === "" || year === "" || plan === "") return null;

  return (
    <ContenedorResumen>
      <h2>Quote Summary</h2>
      <ul>
        <li>Brand: {primeraMayuscula(brand)} </li>
        <li>Plan: {primeraMayuscula(plan)} </li>
        <li>Car's Year: {year} </li>
      </ul>
    </ContenedorResumen>
  );
};

Resumen.propTypes = {
  datos: PropTypes.object.isRequired,
};

export default Resumen;
