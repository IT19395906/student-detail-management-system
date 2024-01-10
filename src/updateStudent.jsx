import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateStudent() {

    const [value, setValue] = useState({
        stname: '',
        address: '',
        contact: '',
        image: null,
        dob: '',
        birthcertificate: null,
        doa: ''
    }
    );

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3000/students/' + id)
            .then(res => setValue(res.data))
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/students/' + id, value)
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValue({ ...value, image: file });
    }

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setValue({ ...value, [field]: file });
    }


    return (
        <div className="d-flex vh-100 w-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white px-5 pt-3 shadow pb-5 rounded">

                <h1>Update user</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="stname">Student Name</label>
                        <input type="text" className="form-control" id="stname"
                            value={value.stname} onChange={(e) => setValue({ ...value, stname: e.target.value })} placeholder="Enter student name" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="address">Student Address</label>
                        <textarea className="form-control" id="address"
                            value={value.address} onChange={(e) => setValue({ ...value, address: e.target.value })} placeholder="Enter student address" rows="4" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="contact">Student Contact No</label>
                        <input type="tel" className="form-control" id="contact"
                            value={value.contact} onChange={(e) => setValue({ ...value, contact: e.target.value })} placeholder="Enter student phone number" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="image">Student Image</label>
                        <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} />
                        {value.image && (
                            <img
                                src={value.image}
                                alt="user"
                                style={{ maxWidth: '50px', maxHeight: '50px' }}
                            />
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="dob">Date of Birth</label>
                        <input value={value.dob} type="date" className="form-control" id="dob" onChange={(e) => setValue({ ...value, dob: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="birthcertificate">Copy of Birth Certificate</label>
                        <input type="file" className="form-control" id="birthcertificate" accept=".pdf, .doc, .docx" onChange={(e) => handleFileChange(e, 'birthcertificate')} />
                        {value.birthcertificate && (
                            <span>{value.birthcertificate.name}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="doa">Date of Admission</label>
                        <input value={value.doa} type="date" className="form-control" id="doa" onChange={(e) => setValue({ ...value, doa: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-success" type="submit">Update</button>
                    <Link to="/" className="btn btn-primary ms-3">Back</Link>
                </form>
            </div>
        </div>
    );
}