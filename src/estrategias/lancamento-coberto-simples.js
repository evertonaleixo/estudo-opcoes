import React from 'react';

export default function LancamentoCobertoSimples() {
    const [tickerPrice,setTickerPrice] = React.useState(1);
    const [bestTickerPrice,setBestTickerPrice] = React.useState(0);

    const [callPrice,setCallPrice] = React.useState(0);
    const [callStrike,setCallStrike] = React.useState(0);

    const [putPrice,setPutPrice] = React.useState(0);
    const [putStrike,setPutStrike] = React.useState(0);

    const gainPerOption = Math.max((callStrike - tickerPrice), 0) + (callPrice - putPrice);
    const gainPerCent = gainPerOption / parseFloat(tickerPrice);

    const bestGain = gainPerOption + (putStrike - bestTickerPrice);
    const bestGainPerCent = bestGain / parseFloat(tickerPrice);

    const newPM = tickerPrice - gainPerOption;
    const newBestPM = tickerPrice - bestGain;
    
    return (<div>
        <h3>Lançamento Coberto Simples</h3>
        <p>O raciononal dessa estratégia é comprar um ativo e vender uma opção de Compra (CALL) no preço (Strike) mais próximo do valor pelo ativo. 
        Além disso, se faz uma proteção do ativo comprando uma opção de Venda (PUT) em um valor a baixo do Strike da CALL. Assim, você ganha o valor 
        da diferença entre a CALL e a PUT.</p>

        <p>Por exemplo:</p>

        <p>Compra 10 BOVA11 a R$114.90. Vende 10 BOVAB86 (Strike R$115.00) no valor de R$2.39. Compra 10 BOVAN114 (Strike R$114.00) no valor R$1.99.</p>
        
        <p>Assim, voce ganha pelo menos R$4.00 na operação com baixissimo risco.</p>

        <p><b>O risco é de no venciomento do contrato o valor de mercado do Ativo estar a um preço entre o Strike da sua CALL e sua PUT. 
        Dessa forma, você fica com o ativo valendo menos do que você pagou. No exemplo acima, seria com BOVA11 fechando o contrato a R$114,10. 
        Entretanto como voce pode reexecutar a estratégio no mês seguinte, ainda terá opções (CALL) com Strike de R$115,00 valendo bem.</b></p>

        <div className="divider py-1 bg-dark"></div>

        <p style={{width:'100%'}}> <h5 className='text-center'>Calculadora de Viabilidade <br /><sub>*Usar ponto (.) para casas decimais</sub></h5> </p>


        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-6'>
                    <p>Ativo: <input style={{width: '120px'}} /> </p>
                    <p>Valor: <input style={{width: '90px'}} onChange={(e)=>{console.log(e.target.value); setTickerPrice(e.target.value)}}/> </p> <br/><br/>

                    <p>CALL: <input style={{width: '120px'}} /> </p> 
                    <p>Valor: <input style={{width: '90px'}} onChange={(e)=>{setCallPrice(e.target.value)}}/> </p> 
                    <p>Strike: <input style={{width: '90px'}} onChange={(e)=>{setCallStrike(e.target.value)}} /> </p><br/><br/>
                    
                    <p>PUT: <input style={{width: '120px'}} /> </p>
                    <p>Valor: <input style={{width: '90px'}} onChange={(e)=>{setPutPrice(e.target.value)}}/> </p> 
                    <p>Strike: <input style={{width: '90px'}} onChange={(e)=>{setPutStrike(e.target.value)}} /> </p>
                </div>

                <div className='col-sm-6'>
                    <div className='row'>
                        <p style={{width:'100%'}} className='text-center'><b>MELHOR CASO</b></p>
                        <div className='col-sm-6'>
                            <p>Lucro</p>
                            <p><input disabled style={{width: '90px'}} value={bestGain?bestGain.toFixed(2):0 } /></p>
                            <p>Lucro (%)</p>
                            <p><input disabled style={{width: '90px'}} value={bestGainPerCent?(bestGainPerCent*100).toFixed(1):0 } /></p>
                            <p>Preço Médio Discontando Lucro</p>
                            <p><input disabled style={{width: '90px'}} value={newBestPM?newBestPM.toFixed(2):0} /></p>
                        </div>

                        <div className='col-sm-6'> 
                            <p>Ativo cai demais até o fechamento. Raramente vai acontecer.</p>
                            <p>Estimativa do preço final: <br /><input style={{width: '90px'}} onChange={(e)=>{setBestTickerPrice(e.target.value)}}/> </p>
                        </div>
                    </div>

                    <div className='row'>
                        <p style={{width:'100%'}} className='text-center'><b>CASO MÉDIO</b></p>
                        <div className='col-sm-6'>
                            <p>Lucro</p>
                            <p><input disabled style={{width: '90px'}} value={gainPerOption?gainPerOption.toFixed(2):0}/></p>
                            <p>Lucro (%)</p>
                            <p><input disabled style={{width: '90px'}} value={gainPerCent?(gainPerCent*100).toFixed(1):0}/></p>
                        </div>

                        <div className='col-sm-6'>
                            <p>Ativo sobe. Você vai precisar aportar uma grana para recomprar o ativo no novo preço pra executar a estratégia novamente.</p>
                        </div>
                    </div>

                    <div className='row'>
                        <p style={{width:'100%'}} className='text-center'><b>PIOR CASO</b></p>
                        <div className='col-sm-6'>
                            <p>Preço Médio Discontando Lucro</p>
                            <p><input disabled style={{width: '90px'}} value={newPM?newPM.toFixed(2):0} /></p>
                        </div>
                        
                        <div className='col-sm-6'>
                            <p>Ativo fica entre a CALL e a PUT.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>);
}
