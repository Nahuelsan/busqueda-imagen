import React, { Component } from 'react';
import Imagenes from './imagenes';
import Paginacion from './paginacion';

class Resultado extends Component {
	mostrarImagenes = () => {
		const imagenes = this.props.imagenes;

		if(imagenes.length === 0){return null;}

		return(
			<React.Fragment>
				<div className ="col-12 p-5 row">
					{imagenes.map(imagen => (
						<Imagenes
							key={imagen.id}
							imagen={imagen}
						/>
						))}
				</div>
			<Paginacion 
            	paginaAnterior = {this.props.paginaAnterior}
            	paginaSiguiente = {this.props.paginaSiguiente}
			/>
			</React.Fragment>
		)
	}

	render(){
		return ( 
				<React.Fragment>
					{this.mostrarImagenes()}
				</React.Fragment>
			);
	}
}

export default Resultado;