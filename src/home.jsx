import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/students')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        const confirm = window.confirm("do you want to delete record?");
        if (confirm) {
            axios.delete('http://localhost:3000/students/' + id)
                .then(res => {
                    window.location.reload();
                }).catch(err => console.log(err));
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <h1>Students</h1>
            <div className="w-75 shadow bg-white rounded border p-4">
                <div className="d-flex justify-content-end">
                    <Link to="/add" className="btn btn-success">Add New</Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Image</th>
                            <th>DoA</th>
                            <th>DoB</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.stname}</td>
                                    <td>{item.address}</td>
                                    <td>{item.contact}</td>
                                    <td>
                                        {item.image && Object.keys(item.image).length > 0 ? (
                                            <img src={item.image} alt="user" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{item.doa}</td>
                                    <td>{item.dob}</td>
                                    <td>
                                        <Link to={`/get/${item.id}`} className="btn btn-sm btn-info me-2">View</Link>
                                        <button onClick={(e) => handleDelete(item.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}