import React from 'react';
import ReactDOM from 'react-dom/client';
import Mapper from './mapper';

const server_address = "127.0.0.1:8081"

function handleRequest(method) {
    return function() {
        const id = document.getElementById("id_input").value;
        let data = null;
        if (method === 'post' || method === 'put') {
            const nome = document.getElementById("nome_input").value;
            const marca = document.getElementById("marca_input").value;
            const prezzo = document.getElementById("prezzo_input").value;
            data = {
                type: "products",
                attributes:{
                    nome: nome,
                    marca: marca,
                    prezzo: prezzo
                }
            };
            console.log(data);
        }
        const url = id ? `http://${server_address}/products/${id}` : `http://${server_address}/products`; //se c'è id allora fa richiesta con id, altrimenti senza
        const root = ReactDOM.createRoot(document.getElementById('root'));

        root.render(<Mapper url={url} method={method} data={data}></Mapper>); //richiama mapper con metodo e url corrispondente
    }
}

document.getElementById('requestGetAllButton').addEventListener('click', handleRequest("get"));
document.getElementById('requestGetButton').addEventListener('click', handleRequest("get"));
document.getElementById('requestDeleteButton').addEventListener('click', handleRequest("delete"));
document.getElementById('requestPostButton').addEventListener('click', handleRequest("post"));
document.getElementById('requestPutButton').addEventListener('click', handleRequest("put"));