import React from "react";
import styled from "@emotion/styled";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const Mensaje = styled.p`
  background-color: rgb(127, 224, 237);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`;

const ContenedorTotal = styled.div`
  text-align: center;
  padding: 0%.5rem;
  border: 1px solid #26c6da;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`;

const Total = styled.p`
  color: #00838f;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

const Resultado = ({ cotizacion }) => {
  if (cotizacion === 0) {
    return null;
  }

  return cotizacion === 0 ? (
    <Mensaje>Choose Brand, Year and ype of Insurance-plan</Mensaje>
  ) : (
    <ContenedorTotal>
      <TransitionGroup component="span" className="totalResult">
        <CSSTransition
          classNames="totalResult"
          key={cotizacion}
          timeout={{ enter: 500, exit: 500 }}
        >
          <Total>
            Total: € <span>{cotizacion}</span>
          </Total>
        </CSSTransition>
      </TransitionGroup>
    </ContenedorTotal>
  );
};

Resultado.propTypes = {
  cotizacion: PropTypes.number.isRequired,
};

export default Resultado;
