import React from 'react';
import LancamentoCobertoSimples from './estrategias/lancamento-coberto-simples';
import LancamentoCobertoAlavancado from './estrategias/lancamento-coberto-alavancado';


function App() {
  const [strategyName,setStrategyName] = React.useState('LancamentoCobertoSimples');
  
  return (
    <div className="container">
      <div className="row header">
        <p style={{width: '100%'}}>
          <h1 className="text-center">Estudo de Opções no Sistema Diamente do Leo Dutra</h1>
        </p>
      </div>

      <div className="row">
        <div className="col-sm-2">
          <ul className="list-group">
            <li style={{cursor: 'pointer'}} 
              className={strategyName==='LancamentoCobertoSimples'?'list-group-item active':'list-group-item'} 
              onClick={()=>{setStrategyName('LancamentoCobertoSimples')}}>
                Lançamento Coberto Simples
            </li>

            <li style={{cursor: 'pointer'}} 
              className={strategyName==='LancamentoCobertoAlavancado'?'list-group-item active':'list-group-item'} 
              onClick={()=>{setStrategyName('LancamentoCobertoAlavancado')}}>
                Lançamento Coberto Alavancado
            </li>
          </ul>
        </div>
      
        <div className="col-sm-10">
          {strategyName==='LancamentoCobertoSimples'? <LancamentoCobertoSimples />: <LancamentoCobertoAlavancado />}
        </div>
      </div>
    </div>
  );
}

export default App;
