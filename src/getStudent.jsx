import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function GetStudent() {

    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3000/students/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="d-flex vh-100 w-100 justify-content-center align-items-center bg-light">
            <div className="pb-5 rounded w-50 border shadow px-5 pt-3 bg-white ">
                <h1>Details of Student</h1>
                <div className="mb-2">
                    <strong>Student Name : {data.stname}</strong>
                </div>
                <div className="mb-2">
                    <strong>Student Address : {data.address}</strong>
                </div>
                <div className="mb-2">
                    <strong>Contact Information : {data.contact}</strong>
                </div>
                <div className="mb-2">
                    <strong>Image:</strong>
                    {data.image && (
                        <img src={data.image} alt="user" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    )}
                </div>
                <div className="mb-2">
                    <strong>Birth Certificate:</strong>
                    {data.birthCertificate && (
                        <a href={data.birthCertificate} target="_blank" rel="noopener noreferrer">View Birth Certificate</a>
                    )}
                </div>
                <div className="mb-2">
                    <strong>Date of Admission : {data.doa}</strong>
                </div>
                <div className="mb-3">
                    <strong>Date of Birth : {data.dob}</strong>
                </div>
                <Link to={`/update/${id}`} className="btn btn-success">Edit</Link>
                <Link to="/" className="btn btn-primary ms-3">Back</Link>
            </div>
        </div>
    );
}