import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddStudent() {

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValue({ ...value, image: file });
    }

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setValue({ ...value, [field]: file });
    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('stname', value.stname);
        // formData.append('address', value.address);
        // formData.append('contact', value.contact);
        // formData.append('image', value.image);
        // formData.append('dob', value.dob);
        // formData.append('doa', value.doa);
        // formData.append('birthcertificate', value.birthcertificate);

        axios.post('http://localhost:3000/students', value)
            .then(res => {
                console.log(res);
                console.log("data successful", value);
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 w-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white px-5 pt-3 shadow pb-5 rounded">

                <h1>Add a Student</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="stname">Student Name</label>
                        <input type="text" className="form-control" id="stname"
                            onChange={(e) => setValue({ ...value, stname: e.target.value })} placeholder="Enter student name" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="address">Student Address</label>
                        <textarea className="form-control" id="address"
                            onChange={(e) => setValue({ ...value, address: e.target.value })} placeholder="Enter student address" rows="4" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="contact">Student Contact No</label>
                        <input type="tel" className="form-control" id="contact"
                            onChange={(e) => setValue({ ...value, contact: e.target.value })} placeholder="Enter student phone number" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="image">Student Image</label>
                        <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" onChange={(e) => setValue({ ...value, dob: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="birthcertificate">Copy of Birth Certificate</label>
                        <input type="file" className="form-control" id="birthcertificate" accept=".pdf, .doc, .docx" onChange={(e) => handleFileChange(e, 'birthcertificate')} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="doa">Date of Admission</label>
                        <input type="date" className="form-control" id="doa" onChange={(e) => setValue({ ...value, doa: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-success" type="submit">Submit</button>
                    <Link to="/" className="btn btn-primary ms-3">Back</Link>
                </form>
            </div>
        </div>
    );
}