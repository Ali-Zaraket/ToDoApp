import React, { Component } from 'react';


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            task: {
                id: null,
                description: '',
                done: false,
            },
        };

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
    }
    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks(){
        var url = "http://localhost:8000/api/tasks";

        fetch(url).then(response => response.json())
        .then((data) => {
            this.setState({
                list: data,
            });
        });
    }

    handleAddButtonClick() {
        var url = "http://localhost:8000/api/create-task";
        var requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: this.state.task.description,
            })
        };

        fetch(url, requestOptions)
        .then((response) => response.json())
        .then(() => {
            this.fetchTasks();
            this.setState({
                task: {
                    id: null,
                    description: '',
                    done: false,
                },
            });
        });
    }

    renderTask(task, index) {
        return(
            <div key={index} className="task-wrapper flex-wrapper">
                <div style={{flex:7}}>
                    <span>{task.description}</span>
                </div>
                <div style={{flex:1}}>
                    <button className="btn btn-danger" onClick={() => this.handleDeleteButton(task)}>delete</button>
                </div>
            </div>
        );
    }

    handleInputChange(e){
        var description = e.target.value;
        this.setState({
            task: {
                ...this.state.task,
                description: description,
            }
        });
    }

    handleDeleteButton(task){
        var url = "http://localhost:8000/api/delete-task" + "?pk=" + task.id;
        var requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pk: task.id,
            })
        };
        fetch(url, requestOptions)
        .then((response) => response.json())
        .then(() => this.fetchTasks());
    }

    render() {
        return (
            <div className="container">
                <div className="pt-5">
                    <legend className="display-1 text-info" align="center">To Do APP</legend>
                </div>
                <div className="row pt-4">
                    <div className="col-9">
                        <input type="text" onChange={this.handleInputChange} value={this.state.task.description} required className="form-control" placeholder="Add a task.." />
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-outline-info" onClick={this.handleAddButtonClick}>
                            Add
                        </button>
                    </div>
                </div>
                
                <div className="list-box">
                    {this.state.list.map((task, index) => this.renderTask(task, index))}
                </div>
            </div>
        );
    }
}
