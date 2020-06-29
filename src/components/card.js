import React from 'react';

//Class component
//I can just use the 'this' word in a class component.
class Card extends React.Component{

    render(){
        return(
            <div className="card mb-3">
                <h3 className="card-header">{this.props.title}</h3>
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export default Card;
