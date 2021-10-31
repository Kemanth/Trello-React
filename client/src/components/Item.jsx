
import React from "react";

class Item extends React.Component{

    onDragStart = ({ dataTransfer, target }) => {
        const { item, setDragElement } = this.props;
        dataTransfer.setData("item", JSON.stringify(item));
        setDragElement(item);
        setTimeout(() => {
            target.style.visibility = "hidden";
        }, 0);
    };

    onDragOver = e => {
        const { moveItem } = this.props;
        moveItem(e.target.innerText);
    };

    onDragEnd = e => e.target.style.visibility = "visible";

    render(){
        const { item } = this.props;
        return (
                <div
                    className={"item-container"}
                    draggable="true"
                    onDragStart={this.onDragStart}
                    onDragOver={this.onDragOver}
                    onDragEnd={this.onDragEnd}
                >
                    <p>{item.content}</p>
                    <span>{item.estimate}</span>
                    
                </div>
        );
    }
}
export default Item;