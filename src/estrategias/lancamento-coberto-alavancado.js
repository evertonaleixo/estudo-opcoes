import React from 'react';

function LancamentoCobertoAlavancado() {
    const [tickerPrice,setTickerPrice] = React.useState(1);
    const [tickerQnt,setTickerQnt] = React.useState(1);
    const [bestTickerPrice,setBestTickerPrice] = React.useState(0);

    const [callPrice,setCallPrice] = React.useState(0);
    const [callStrike,setCallStrike] = React.useState(0);

    const [puts,setPuts] = React.useState([{'name': '','price': 0, 'strike': 0, 'qnt': 0}]);
    const valueSpentInPuts = puts.map(p=>p.price*p.qnt).reduce((a,b)=>a+b);
    const valueToByPuts = ((callPrice/2)*tickerQnt) - valueSpentInPuts;
    

    const gain = (Math.max((callStrike - tickerPrice), 0)*tickerQnt) + ((callPrice*tickerQnt) - valueSpentInPuts);
    const gainPerCent = gain / parseFloat(tickerPrice);

    const bestGain = gain +  puts.map(p=> Math.max(p.strike-bestTickerPrice, 0)*p.qnt).reduce((a,b)=>a+b);
    const bestGainPerCent = bestGain / parseFloat(tickerPrice);

    const newPM = tickerPrice - gain;
    const newBestPM = tickerPrice - bestGain;

    const changePutsConfig = (idx, attr, newVal) => {
        const newPuts = [...puts];
        newPuts[idx][attr] = newVal;
        setPuts(newPuts);
    };

    return (<div>
        <h3>Lançamento Coberto Alavancado</h3>

        <p>O raciononal dessa estratégia é comprar um ativo e vender uma opção de Compra (CALL) no preço (Strike) mais próximo do valor pelo ativo. 
        Mas deferente do lançamento coberto simples, se faz uma proteção do ativo comprando mais de uma opção de Venda (PUT) em um valor bem a baixo
        do Strike da CALL. <b>O recomendado é comprar PUTs com 50% do lucro com a venda da CALL. Assim voce ganha 50% do venda da CALL assumindo
        mais riscos.</b></p>

        <p>Por exemplo:</p>

        <p>Compra 10 BOVA11 a R$114.90. Vende 10 BOVAB86 (Strike R$115.00) no valor de R$2.39. Compra 20 BOVAN103 (Strike R$106.00) no valor R$0.49.</p>
        
        <p>Assim, voce ganha pelo menos R$14.10 na operação com mais riscos.</p>

        <p><b>O risco é de no venciomento do contrato o valor de mercado do Ativo estar a um preço entre o Strike da sua CALL e sua PUT. 
        Dessa forma, você fica com o ativo valendo menos do que você pagou. No exemplo acima, seria com BOVA11 fechando o contrato a R$107.00</b></p>
    

        <div className="divider py-1 bg-dark"></div>

        <p style={{width:'100%'}}> <h5 className='text-center'>Calculadora de Viabilidade <br /><sub>*Usar ponto (.) para casas decimais</sub></h5> </p>


        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-6'>
                    <p>Ativo: <input style={{width: '120px'}} /> </p>
                    <p>Valor: <input style={{width: '90px'}} onChange={(e)=>{setTickerPrice(e.target.value)}}/> </p>
                    <p>Quantidade: <input style={{width: '90px'}} onChange={(e)=>{setTickerQnt(e.target.value)}}/> </p> <br/><br/>

                    <p>CALL: <input style={{width: '120px'}} /> </p> 
                    <p>Quantidade: <input disabled style={{width: '90px'}} value={tickerQnt}/> </p>
                    <p>Valor: <input style={{width: '90px'}} onChange={(e)=>{setCallPrice(e.target.value)}}/> </p> 
                    <p>Strike: <input style={{width: '90px'}} onChange={(e)=>{setCallStrike(e.target.value)}} /> </p><br/><br/>
                    <p style={{color: valueToByPuts<0?'red':'blue'}}>Você ainda pode gastar R${valueToByPuts.toFixed(2)} em PUTs.</p>
                    {puts.map( (p, idx) => <div style={{marginBottom: '45px'}} key={idx}>
                        <p>PUT: <input style={{width: '120px'}} onChange={(e)=>{changePutsConfig(idx, 'name', e.target.value)}}/> </p>
                        <p>Quantidade: <input style={{width: '90px'}} onChange={(e)=>{changePutsConfig(idx, 'qnt', e.target.value)}}/> </p> 
                        <p>Valor: <input style={{width: '90px'}} onChange={(e)=>{changePutsConfig(idx, 'price', e.target.value)}}/> </p> 
                        <p>Strike: <input style={{width: '90px'}} onChange={(e)=>{changePutsConfig(idx, 'strike', e.target.value)}} /> </p>
                    </div>)}
                    <p><button className='btn btn-primary' onClick={()=>setPuts([...puts, {'name': '','price': 0, 'strike': 0, 'qnt': 0}])}>Adicionar PUT</button></p>
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
                            <p><input disabled style={{width: '90px'}} value={gain?gain.toFixed(2):0}/></p>
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

export default LancamentoCobertoAlavancado;