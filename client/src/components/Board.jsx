import React from "react";
import Item from "./Item";
import List from "./List";
import { data, list } from "../data";

class Board extends React.Component{

    state = {
        items : data,
        list : list,
        dragEl: null,
    }; 
    
    componentDidMount(){

        /* API Calls
        Promise.all([fetch('https://trello/api/tasks'), fetch('https://trello/api/lists')])

        .then(([res1, res2]) => { 
            return Promise.all([res1.json(), res2.json()]) 
        })
        .then(([res1, res2]) => {
            this.setState({ items: res1,  list: res2});
        });
        */
    }

    onDrop = (item, status) => {
        if (item.status === status) {
            return;
        }

        let newState = this.state.items.filter((i)=>{ return i.id !== item.id});
        newState= newState.concat({ ...item, status });
        this.setState({items : newState});
    };

    moveItem = el => {

        const itemIndex = this.state.items.findIndex(i => i.content === this.state.dragEl.content);
        const hoverIndex = this.state.items.findIndex(i => i.content === el);
        const newState = this.state.items;

        newState.splice(itemIndex, 1);
        newState.splice(hoverIndex, 0, this.state.dragEl);
        this.setState({items : newState});
    };

    setDragElement = el => this.setState({dragEl : el});

    render(){
        return (
            <div className={"container"}>
                {this.state.list.map(status => {
                    return (
                        <div key={status}>
                            <div className={"list-header"}>
                                <h5>{status.toUpperCase()}</h5>
                                <p>{this.state.items.filter(i => i.status === status).length}</p>
                            </div>
                            <List onDrop={this.onDrop} status={status}>
                                
                                    {this.state.items
                                        .filter(i => i.status === status)
                                        .map(i => (
                                            <Item
                                                key={i.id}
                                                item={i}
                                                moveItem={this.moveItem}
                                                setDragElement={this.setDragElement}
                                            />
                                        ))
                                    }                              
                            </List>
                        </div>
                    );
                })}
            </div>
        );
    }
};


export default Board;