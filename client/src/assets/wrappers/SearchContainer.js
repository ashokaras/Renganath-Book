import styled from "styled-components";

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .btn-container {
    display: flex;
    margin-top: 5px;
    grid-column-start: 1;
    grid-column-end: 2;
    column-gap: 10px;

    button {
      height: 50px;
    }
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-container {
      display: flex;
      margin-top: 5px;
      grid-column-start: 1;
      grid-column-end: 2;
      column-gap: 10px;
      margin-top: 10px;
      button {
        height: 50px;
        width: 100%;
      }
    }
  }
`;

export default Wrapper;
