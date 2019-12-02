import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  h1 {
    color: blueviolet;
    font-size: 35px;
  }

  .oridest {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 500px;
    margin-top: 80px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .templano {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 500px;
    margin-top: 20px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input {
      width: 150px;
      height: 30px;
      margin-left: 10px;

      border-radius: 5px;
      background-color: #eee;
    }
  }

  h2 {
    margin-top: 80px;
    color: blueviolet;
  }

  table {
    margin-top: 20px;
    border-spacing: 0px;
    border: solid 1px black;
    border-radius: 5px;

    tr {
      display: flex;
    }

    td {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;
      width: 250px;
    }
  }
`;

export const Select = styled.select`
  width: 150px;
  height: 30px;
  margin-left: 10px;

  border-radius: 5px;
  background-color: #eee;
`;

export const SubmitButton = styled.button`
  margin-top: 35px;
  width: 200px;
  height: 40px;
  border-radius: 5px;
  font-size: 20px;
  background-color: blueviolet;
  color: white;
`;
