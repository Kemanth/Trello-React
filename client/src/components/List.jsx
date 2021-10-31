import React from "react";

class List extends React.Component{

    allowDrop = e => e.preventDefault();

    handleDrop = e => {
        const { onDrop, status } = this.props;
        const data = JSON.parse(e.dataTransfer.getData("item"));
        onDrop(data, status);
    };

    render(){
        const { children } = this.props;
        return (
            <div onDragOver={this.allowDrop} onDrop={this.handleDrop} className={"drop-area"}>
                {children}
            </div>
        );
    }
}
export default List;