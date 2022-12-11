import { Component } from "react";

// Import Utils
import { buildTagsList } from "../../../../../Utils/utils";
import ReactHtmlParser from 'react-html-parser';

class OneCardView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.printItesm()


    }

    printItesm = () => {
        if (this.props.annotation.body[0] && this.props.annotation.body[0].value) {
            let txt = ReactHtmlParser(this.props.annotation.body[0].value)

            let filteredTXT = txt && txt.filter(item => item.type !== "img")

            if (filteredTXT && filteredTXT.length > 1) {
                return [filteredTXT[0], filteredTXT[1]]
            }else{
                return filteredTXT
            }

        } else {
            return "Cette annotation ne contient aucun texte"
        }

    }


    render() {
        return (
            <div className="anno-card-body">
                <h6 className="card-subtitle mb-2 text-muted"> {buildTagsList(this.props.annotation)} </h6>

                <h5 className="card-title adno-card-title">{this.printItesm()}</h5>
            </div >
        )
    }
}
export default OneCardView