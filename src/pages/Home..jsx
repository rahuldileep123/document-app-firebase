import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import "../firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { Link} from 'react-router-dom';

function Home() {

  const [docName, setDocName] = useState("")
  const [allDocs, setAllDocs] = useState([])
  const [show, setShow] = useState(false);
 
const [fetch,setfetch]=useState("")
  const handleClose = () => {
    setShow(false);
    setDocName("")
  }

  const handleShow = () => setShow(true);

  const db = getFirestore()
//add new document
  const addNewDoc = async () => {
    const dataAdd = await addDoc(collection(db, "documents"), {
      title: docName,
      description: ""
    })
    console.log(dataAdd);
    
    alert(`${docName} successfully added`)
    handleClose()
    setfetch(docName)
  }
//fetch all documents
const fetchAllDocs=async()=>{
  const docData=await getDocs(collection(db, "documents")) 
  console.log(docData);
  const tempData = []
  docData.forEach(doc=>{
    tempData.push({...doc.data(),id:doc.id})
  })
  setAllDocs(tempData)
  console.log(tempData);
}
//delete document
const removeDoc=async(id)=>{
  
await deleteDoc(doc(db,"documents",id))
setfetch(id)
}
useEffect(()=>{
   fetchAllDocs()
},[fetch])

  return (
    <>
      <div className="container text-center mt-3">
        <h1>DOCUMENT APP</h1>
        <button onClick={handleShow} className='btn btn-primary'>Add a Note</button>
        <div className='row mt-3'>
        {allDocs?.map((item,index)=>(
          <div key={index} className="col-lg-4 p-1">
            <div className="d-flex justify-content-between align-items-center border border-primary rounded p-3">
             <div>
                <h2 className='text-danger'>{item?.title}</h2>
                <p>{item?.description.replace(/<[^>]+>/g, '')}</p>
             </div>
              <div className="d-flex">
               <Link to={`/view/${item.id}`}> <button  className='btn'><i className="fa-solid fa-pen-to-square me-2"></i></button></Link>
                <button onClick={()=>removeDoc(item.id)} className='btn'><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>

        ))}
          
         
        </div>
        
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={docName} onChange={(e) => setDocName(e.target.value)} className='form-control' type="text" placeholder="title" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={addNewDoc} variant="primary">ADD</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home