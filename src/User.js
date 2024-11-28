import React, {useState} from 'react';
import { variables } from './Variables.js';
import { Modal, Button } from 'react-bootstrap';

export class User extends React.Component{

    constructor(props){
        super(props);

        this.state={
            users: [],
            username:"",
            user_id:0,
            showModal: false,
        };
    }

    refreshList(){
        fetch(variables.API_URL+'user')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    handleShow = () => {
        this.setState({ showModal: true });
    };

    handleClose = () => {
        this.setState({ showModal: false });
    };

    changeusername = (e)=>{
        this.setState({username:e.target.value})
    }

    addClick(){
        this.setState({
            modalTitle:"Add User",
            user_id:0,
            username:"",
            showModal: true,
        });
    }

    editClick(user){
        this.setState({
            modalTitle:"Edit User",
            user_id: user.user_id,
            username: user.username,
            showModal: true,
        });
    }

    createClick(){
        fetch(variables.API_URL+'user',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:this.state.username
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((result) => {
            alert(result.message || "User added successfully");
            this.refreshList();
        })
        .catch((error) => {
            alert('Failed to add user: ${error.message}');
        });
    }


    updateClick(){
        fetch(variables.API_URL+'user',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user_id:this.state.user_id,
                username:this.state.username
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure you want to delete this item?')){
        fetch(variables.API_URL+'user/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render() {
        const { users, modalTitle, username } = this.state;
    
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    onClick={() => this.addClick()}
                >
                    Add User
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>user_id</th>
                            <th>username</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.username}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.editClick(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(user.user_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Username</span>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={this.changeusername}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.user_id === 0 ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.createClick()}
                            >
                                Create
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.updateClick()}
                            >
                                Update
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={this.handleClose}
                        >
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}