import React,{useState} from 'react';
import { Link } from "react-router-dom";
import './Upload.css';
import PublishIcon from '@material-ui/icons/Publish';
import axios, { post } from 'axios';


function Upload() {
    /*
    const onchange=(e)=>
    {   
        let files = e.target.files;
        let reader = new FileReader()
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            const url = "http"
            const formData = { file: e.target.result }
            return post(url, formData).
        }
    } */
    return (
        <div className='uploadd'>
            <div className="upload__header">
                <Link to='/'><img className='logo__header'  src={require('./logo.png')} alt=""/></Link> 
            </div>
            <div className="upload__body">
                <img src={require('./LIBGO.png')} alt=""/>

                <div  className='upload__input'>
                    <PublishIcon/>
                    <label >Upload a Picture : </label>

                    < input type="file" accept="image/*" name="file" id="input"/>
            </div>
            </div>
        </div>
    )
}

export default Upload
