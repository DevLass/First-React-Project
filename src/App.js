// Essential
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

//Styles
import "./App.css";

//Components

import API from "./services/API.js";

export default (props) => {
    const [input, setInput] = useState("");
    const [cep, setCep] = useState({});

    async function handleSearch() {
        if (input === "") {
            alert("Input Error");
            return;
        }

        try {
            const response = await API.get(`${input}/json`);
            setCep(response.data);
            setInput(" ");
        } catch {
            alert("Search Error");
            setInput(" ");
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="title">CEP Search</h1>

                <div className="containerInput">
                    <input
                        type="text"
                        placeholder="CEP"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button className="buttonSearch" onClick={handleSearch}>
                        <FaSearch size={25} color="white" />
                    </button>
                </div>
                {Object.keys(cep).length > 0 && (
                    <main className="main">
                        <h2>{cep.cep}</h2>

                        <span>Rua: {cep.logradouro}</span>
                        <span>Bairro: {cep.bairro}</span>
                        <span>Complemento: {cep.complemento}</span>
                        <span>
                            Estado: {cep.localidade} - {cep.uf}
                        </span>
                        <span>DDD: {cep.ddd}</span>
                    </main>
                )}
            </div>
        </>
    );
};
