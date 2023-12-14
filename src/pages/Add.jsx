import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Add({handleResponse}) {
  const [uploadData,setuploadData]=useState({
    id:"",caption:"",thumbnail:"",url:""
  },)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // set input function definition
const setInput=(e)=>{

  const{name,value}=e.target
  setuploadData({...uploadData,[name]:value})
// setuploadData(e.target.value)

}

console.log(uploadData);


const extractUrl=(e)=>{
  // console.log(e.target.value);


  let youtubeUrl=e.target.value;
  if(youtubeUrl.includes("v=")){
    let index=youtubeUrl.indexOf("v=");
  

  console.log( index);

let videoUrl=youtubeUrl.substring(index+2,index+13)

console.log(videoUrl);


let videoData=uploadData

videoData.url=` https://www.youtube.com/embed/${videoUrl} `

setuploadData(videoData)
  }

console.log(uploadData);

}

// define handleadd function
const handleAdd=async()=>{

const {id,caption,thumbnail,url}=uploadData

if(!id||!caption||!thumbnail||!url){
  toast("please fill the form completely")
}

else{
  let reponse=await addVideo(uploadData)

 

  if(reponse.status>=200&&reponse.status<300){
    handleResponse(reponse.data)
    // console.log(reponse.data);
    toast.success("video uploaded successfully",{position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",})
    setShow(false)
  }
  else{
    toast("please provide a unique id")
  }
}





}





  return (
    <>
    <div onClick={handleShow} className='btn'>
<PlusCircle color='green' size={90}/>
</div>

{/* models */}
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload video details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

         <Form>
         <FloatingLabel className='mb-3' controlId="floatingId" label="Id">
        <Form.Control name='id' onChange={setInput} type="text" placeholder="Uploading video id" />
      </FloatingLabel>

      {/* caption */}
      <FloatingLabel className='mb-3' controlId="floatingCaption" label="Uploading video caption">
        <Form.Control name='caption'  onChange={setInput} type="text" placeholder="Uploading video caption" />
      </FloatingLabel>

      {/* img url */}

      <FloatingLabel className='mb-3' controlId="floatingImage" label=" video cover URL">
        <Form.Control name='thumbnail'  onChange={setInput} type="text" placeholder=" video cover image URL" />
      </FloatingLabel>

{/* video link */}

<FloatingLabel className='mb-3' controlId="floatingIink" label=" Uploading video link">
        <Form.Control name='url'  onChange={extractUrl} type="text" placeholder=" video link" />
      </FloatingLabel>


         </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />

    </>
  )
}

export default Add