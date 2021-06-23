import React, {useState} from 'react';

const Feedback = () => {

    const [values, setValues] = useState({ // setValues is the method
        name: '',
        email: '',
        message: '',
        phone: '',
        uploadFiles: [],
        buttonText: 'Submit',
        uploadPhotosButtonText: 'Upload files'
    })

    // destruct the state variable
    // 之後要呼叫 email 或是其他變數 就可以直接用 email 去呼叫 instead of values.email
    const {name, email, message, phone, uploadFiles, buttonText, uploadPhotosButtonText} = values;

    // destruct the env variables
    const {REACT_APP_API, REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_SECRET} = process.env;

    // Event handler
    const handleChange = name => event =>{
        setValues({ ...values, [name]: event.target.value });
    };

    // Functions
    const handleSubmit = event =>{
        event.preventDefault();
        setValues({...values, buttonText: '... Sending'});
        // Send an email to the admin
        console.table({name, email, phone, message, uploadFiles});
    };

    const uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME, upload_preset: REACT_APP_CLOUDINARY_UPLOAD_SECRET, tags:['xmas']},
            function(error, result) {
                //console.log(result);
                setValues({...values, uploadFiles: result, uploadPhotosButtonText: `${result ? result.length : 0}Photos uploaded`})
            });
    };

    const feedbackForm = () => (
        <React.Fragment>
            <div className="form-group pt-5">
                <button onClick={() => uploadWidget()} className="btn btn-outline-secondary btn-block p-5 w-100">{uploadPhotosButtonText}</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea className="form-control" type="text" onChange={handleChange('message')} value={message} required></textarea>
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Name</label>
                    <input className="form-control" type="text" onChange={handleChange('name')} value={name} required></input>
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Email</label>
                    <input className="form-control" type="email" onChange={handleChange('email')} value={email} required></input>
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Phone</label>
                    <input className="form-control" type="number" onChange={handleChange('phone')} value={phone} required></input>
                </div>
                <br/>
                <button className="btn btn-outline-primary btn-block w-100">{buttonText}</button>
            </form>
        </React.Fragment>
    )

    return (
        <div className="p-5">
            {feedbackForm()}
        </div>
    );
};

export default Feedback;