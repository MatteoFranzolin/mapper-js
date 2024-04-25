import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class Mapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: false,
            error: null
        };
    }

    componentDidMount() {
            this.fetchData();
    }

    fetchData = async () => {
        // Imposta loading a true prima di effettuare la chiamata
        this.setState({ loading: true });

        try {
            const { method, url, data } = this.props;
            const response = await axios.request({
                method: method || 'get',
                url: url,
                data: data
            });
            this.setState({
                data: response.data,
                loading: false, // Imposta loading a false dopo aver ricevuto i dati
                error: null // Resetta eventuali errori precedenti
            });
        } catch (error) {
            this.setState({
                error: error,
                loading: false // Imposta loading a false in caso di errore
            });
        }
    };

    render() {
        const { data, loading, error } = this.state;
        if (loading) return <div>Caricamento...</div>;
        if (error) return <div>Errore: {error.message}</div>;
        if (!data) return <div>Nessun dato disponibile</div>;

        return (
            <div>
                {data.data.map((item, index) => (
                    <div key={index} className="box">
                        <p>ID: {item.id}</p>
                        <p>Nome: {item.attributes.nome}</p>
                        <p>Marca: {item.attributes.marca}</p>
                        <p>Prezzo: {item.attributes.prezzo}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Mapper;