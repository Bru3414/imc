import { useState, useEffect } from "react";
import styles from "./Formulario.module.css";

const Formulario = () => {
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [imc, setImc] = useState(0);
    const [classificacaoImc, setClassificacaoImc] = useState('?');
    const [resultado, setResultado] = useState('Coloque seu peso e altura válida para descobrir seu IMC');

    useEffect(() => {
        console.log('teste')
        setResultado(`IMC: ${imc}, Seu estado atual: ${classificacaoImc}`);
    }, [imc, classificacaoImc])

    function limitaTotal (evt) {
        var input = evt.target;
        var value = input.value;
    
        if (value.length <= 4) {
            return;
        }
    
        input.value = input.value.substr(0, 4); 
    }
    
    const calculaImc = () => {
        const imc = peso / (altura * altura)
        setImc(imc.toFixed(1))
        
        if (imc < 16) {
            setClassificacaoImc('Magreza Grave');
        } else if (imc >= 16 && imc <= 16.9) {
            setClassificacaoImc('Magreza moderada');
        } else if (imc >= 17 && imc <= 18.5) {
            setClassificacaoImc('Magreza leve');
        } else if (imc >= 18.6 && imc <= 24.9) {
            setClassificacaoImc('Peso ideal');
        }else if (imc >= 25 && imc <= 29.9) {
            setClassificacaoImc('Sobrepeso');
        } else if (imc >= 30 && imc <= 34.9) {
            setClassificacaoImc('Obesidade grau I');
        } else if (imc >= 35 && imc <= 39.9) {
            setClassificacaoImc('Obesidade grau II ou severa');
        } else {
            setClassificacaoImc('Obesidade grau III ou mórbida');
        }
    }

    return (
        <div className="container">
            <form className={styles.form}>
                <h1 className={styles.title}>Calcular IMC</h1>
                <input className={styles.input} required type="number" placeholder="Peso" onChange={e => {
                    limitaTotal(e)
                    setPeso(parseFloat(e.target.value))
                    }}/>
                <input className={styles.input} required type="number" placeholder="Altura" maxLength={'3'} minLength={'1'} onChange={e => {
                    limitaTotal(e)
                    setAltura(parseFloat(e.target.value))
                    }}/>
                <button className={styles.button} type="button" onClick={() => {
                    if (peso > 0 && altura > 0) {
                        console.log(imc)
                        calculaImc()
                        console.log(imc)
                    } else {
                        setResultado('Coloque seu peso e altura válida para descobrir seu IMC')
                    }
                    }}>Calcular</button>
            </form>
            <div className={styles.resultado}>
                {resultado}
            </div>
        </div>
    )
}

export default Formulario;