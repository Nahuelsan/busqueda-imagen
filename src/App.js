import React, {Component} from 'react';
import Buscador from './Components/Buscador';
import Resultado from './Components/resultado';

class App extends Component {
  state = {
    termino : 'cafe',
    imagenes : [],
    pagina: ''
  }

  scroll = () =>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'end');
  }

  paginaAnterior = () =>{
    //leer state de la pagina actual
    let pagina = this.state.pagina;
    // leer si la pagina es 1, ya no ir hacia atras
    if(pagina === 1 ){ return null};
    //resta uno a la pagina actual 
    pagina--;

    this.setState({
      pagina
    },() => {
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () =>{
    //leer state de la pagina actual
    let pagina = this.state.pagina;

    //sumar un actual 
    pagina++;

    //agregar el cambio al state
    this.setState({
      pagina
    },() => {
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=18540832-42c96ea7a27d1b8e936ae17d6&q=${termino}&per_page=30&page=${pagina}`;
    

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes : resultado.hits }) )
  }
  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
       this.consultarApi();
    })
  }

  render() { 
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes = {this.state.imagenes}
            paginaAnterior = {this.paginaAnterior}
            paginaSiguiente = {this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
