import React,{useState} from 'react';
import { Link } from "react-router-dom";
import './Upload.css';
import PublishIcon from '@material-ui/icons/Publish';


function Upload() {
    
   
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

               < input type="file" accept="image/*" name="image-upload" id="input" />
            </div>
            </div>
        </div>
    )
}

export default Upload
