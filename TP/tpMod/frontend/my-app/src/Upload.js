import React,{useState} from 'react';
import { Link } from "react-router-dom";
import './Upload.css';
import PublishIcon from '@material-ui/icons/Publish';
import { useForm } from 'react-hook-form'


function Upload() {

    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("picture", data.picture[0])

        const res = await fetch("http://localhost:4000/picture", {
            method: "POST",
            body: formData
        }).then(res => res.json())
        alert(JSON.stringify(res))
    }
    return (

        <div className='uploadd'>
            <div className="upload__header">
                <Link to='/'><img className='logo__header'  src={require('./logo.png')} alt=""/></Link> 
            </div>
            <div className="upload__body">
                <img src={require('./LIBGO.png')} alt=""/>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='upload__input'>
                    <PublishIcon/>
                    <label >Upload a Picture : </label>

                        < input ref={register} type="file" accept="image/*" name="picture" id="input" />
                    </div>
                    <button className='upload_button'>upload</button>
                </form>
            </div>
        </div>
    )
}

export default Upload
