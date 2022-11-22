import imageToBase64 from 'image-to-base64';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../config';
import getFileExtension from '../helpers/functions/getExtentions';
const image_url = config.IMAGE_URL

const ImageToDataImage = ({ image }) => {
    const [fileurl, setFileurl] = useState("")
    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };
    useEffect(() => {
        const imageurl = image_url + image
        setFileurl(imageurl)
        const extension = getFileExtension(image)
        // getBase64(imageurl).then(result => {
        //     imageurl["base64"] = result;
        //     console.log("File Is", imageurl);
        //     console.log("File Is --- result", result);
        //     setFileurl(result);
        // })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }, [])

    return (
        <>
            <Link to={"/" + fileurl} target="_blank" download={true}><i className="uil uil-arrow-to-bottom" /> Download</Link>
        </>
    );
}
export default ImageToDataImage;