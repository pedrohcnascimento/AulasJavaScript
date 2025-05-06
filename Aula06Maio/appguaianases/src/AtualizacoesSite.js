import './App.css';
import React, { useState, useEffect } from 'react';

function AtualizacoesSite() {
    const [texto, setTexto] = useState('');
    const [contador, setContador] = useState(() => {
        // Recupera o número de visitas do localStorage ou inicia com 0
        const visitas = localStorage.getItem('contadorVisitas');
        return visitas ? parseInt(visitas, 10) : 0;
    });
    const [dataRegistro, setDataRegistro] = useState(null);
    useEffect(() => {
        setContador((prevContador) => {
            const novoContador = prevContador;
            localStorage.setItem('contadorVisitas', novoContador + 1); // Salva no localStorage
            return novoContador;
        });
    }, []);
    const handleNomeChange = (e) => {
        setTexto(e.target.value);
        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
        });
        setDataRegistro(dataFormatada);
    };

    return (
        <div className="App">
            <input
                type="text"
                value={texto}
                onChange={handleNomeChange}
                placeholder="Digite seu nome"
            />
            <p>Seja bem-vindo: {texto}</p>
            {dataRegistro && <p>Registrado em: {dataRegistro}</p>}
            <h2>Contador de visitas: {contador}</h2>
        </div>
    );
}

export default AtualizacoesSite;