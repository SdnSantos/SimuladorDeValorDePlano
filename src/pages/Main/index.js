import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Container, Select, SubmitButton } from './styles';

function Main() {
  const [codCidade, setCodCidade] = useState([]);
  const [plano, setPlano] = useState([]);
  const [tarifa, setTarifa] = useState([]);

  const [idOrigem, setIdOrigem] = useState();
  const [idDestino, setIdDestino] = useState();
  const [idPlano, setIdPlano] = useState();
  const [tempo, setTempo] = useState();

  const [valorTarifaSelecionada, setValorTarifaSelecionada] = useState();
  const [valorPlano, setValorPlano] = useState();
  const [valorSemPlano, setValorSemPlano] = useState();

  useEffect(() => {
    async function loadCodigo() {
      const codCidades = await api.get(`/codCidade`);
      setCodCidade(codCidades.data);
    }

    async function loadPlano() {
      const planos = await api.get(`/plano`);
      setPlano(planos.data);
    }

    async function loadTarifa() {
      const tarifas = await api.get(`/tarifa`);
      setTarifa(tarifas.data);
    }

    loadCodigo();
    loadPlano();
    loadTarifa();
  }, []);

  async function valorTarifa(idOrigem, idDestino, tarifa) {
    if (!idOrigem || !idDestino) {
      return alert('Campo origem está vazio!');
    }

    const tarifaSelecionada = tarifa.filter(
      t => t.idOrigem === Number(idOrigem) && t.idDestino === Number(idDestino)
    );

    const valor = tarifaSelecionada.map(t => t.valor);

    setValorTarifaSelecionada(valor);

    return true;
  }

  async function calcular(idPlano, tempo, valorTarifaSelecionada) {
    if (!idPlano || !tempo) {
      return alert('Há algum campo vazio!');
    }

    const planoSelecionado = plano.filter(p => p.id === Number(idPlano));

    const minutos = planoSelecionado.map(t => t.tempo);

    setValorSemPlano((valorTarifaSelecionada * tempo).toFixed(2));
    setValorPlano(
      (valorTarifaSelecionada * 1.1 * (tempo - minutos)).toFixed(2)
    );

    return true;
  }

  return (
    <Container>
      <h1>Telzir - Simulação</h1>
      <div className="oridest">
        <div>
          <h4>Origem</h4>
          <Select name="origem" onChange={e => setIdOrigem(e.target.value)}>
            <option value="">Selecione</option>
            {codCidade.map(cod => (
              <option value={cod.id}>{cod.codigo}</option>
            ))}
          </Select>
        </div>
        <div>
          <h4>Destino</h4>
          <Select
            name="destino"
            onChange={
              (e => setIdDestino(e.target.value),
              e => valorTarifa(idOrigem, e.target.value, tarifa))
            }
          >
            <option value="">Selecione</option>
            {codCidade.map(cod => (
              <option value={cod.id}>{cod.codigo}</option>
            ))}
          </Select>
        </div>
      </div>
      <div className="templano">
        <div>
          <h4>Plano</h4>
          <Select name="plano" onChange={e => setIdPlano(e.target.value)}>
            <option value="">Selecione</option>
            {plano.map(p => (
              <option value={p.id}>{p.nome}</option>
            ))}
          </Select>
        </div>
        <div>
          <h4>Tempo</h4>
          <input value={tempo} onChange={e => setTempo(e.target.value)} />
        </div>
      </div>
      <SubmitButton
        onClick={() => calcular(idPlano, tempo, valorTarifaSelecionada)}
      >
        Calcular
      </SubmitButton>
      <h2>Valor</h2>
      <table>
        <tr>
          <td>Sem Plano</td>
          <td>Com Plano</td>
        </tr>
        <tr>
          <td>R${valorSemPlano || 0}</td>
          <td>R${valorPlano || 0}</td>
        </tr>
      </table>
    </Container>
  );
}

export default Main;
