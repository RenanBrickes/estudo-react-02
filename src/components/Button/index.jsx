import { Component } from "react";
import './styles.css';

export class Button extends Component {

    render() {
        return (
            <button
                className="button"
                disabled={this.props.disabled}
                onClick={this.props.onClick} >{this.props.title}</button>
        );
    };
}