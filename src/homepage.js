import React, { Component } from 'react';

const ENDPOINT = "https://day-list.herokuapp.com/api/";


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
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.renderDeleteAll = this.renderDeleteAll.bind(this);
        this.getCompleted = this.getCompleted.bind(this);
    }
    componentDidMount() {
        this.fetchTasks();
    }
    getCompleted(list){
        var completed = 0;
        list.map((task) => {
            if(task.done){
                completed++;
            }
            return task;
        })
        return completed;
    }

    fetchTasks(){
        var url = ENDPOINT + "tasks";

        fetch(url).then(response => response.json())
        .then((data) => {
            this.setState({
                list: data,
            });
        });
    }

    handleAddButtonClick() {
        var url = ENDPOINT + "create-task";
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

    handleCheckBoxChange(e, task){
        var checked = e.target.checked;

        var url = ENDPOINT + "done-task";
        var requestOptions = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                pk: task.id,
                done: checked,
            })
        };
        fetch(url, requestOptions)
        .then((response) => response.json())
        .then(() => {
            this.fetchTasks();
        });
    }

    renderTask(task, index, done=null) {
        if(done) {
            return(
                <div key={index} className="task-wrapper flex-wrapper" id="slide">
                    <div className="checkbox">
                        <input className="form-check-input" value="" checked={task.done} onChange={(e) => this.handleCheckBoxChange(e, task)} type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                    </div>
                    <div style={{flex:7}}>
                        <span>{task.description}</span>
                    </div>
                    <div style={{flex:1}}>
                        <button className="btn btn-danger" onClick={() => this.handleDeleteButton(task)}>delete</button>
                    </div>
                </div>
            );
        }
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
        var url = ENDPOINT + "delete-task?pk=" + task.id;
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

    renderDeleteAll(){
        return(
            <div className="pt-5 pb-4 row" id="slide">
                <button type="submit" className="btn btn-outline-danger" onClick={() => {
                    this.state.list.map((task) => this.handleDeleteButton(task))
                }}>
                    Delete All List
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="pt-5">
                    <legend className="display-1 text-info" align="center">TO DO</legend>
                </div>
                <div className="row pt-4">
                    <div className="col-9">
                        <input type="text" onChange={this.handleInputChange} value={this.state.task.description} className="form-control" placeholder="Add a task.." required/>
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-info" onClick={this.handleAddButtonClick}>
                            Add
                        </button>
                    </div>
                </div>
                
                <div className="list-box border-bottom border-secondary border-2 pb-5">
                    {this.state.list.map((task, index, done) => this.renderTask(task, index, done=!task.done))}
                </div>
                {this.state.list.length > 0 ?
                    <legend className="text-secondary display-6" align="center">DONE ({this.getCompleted(this.state.list)})</legend>
                    : null
                }
                <div className="list-box">
                    {this.state.list.map((task, index, done) => this.renderTask(task, index, done=task.done))}
                </div>
                {this.state.list.length > 1 ? this.renderDeleteAll() : null}
                
            </div>
        );
    }
}
