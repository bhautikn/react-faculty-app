import { useNavigate, useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function FacultyDetail({api}){
    const [faculty, setFaculty] = useState({});
    const {facID}= useParams('facID');
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(api+facID)
        .then(res=>res.json())
        .then(res=>{setFaculty(res)})
    }, []);

    return(
        <>
            <Loading />
            <div 
                className="bg-secondary-subtle my-2 px-2 display-4" 
                style={{cursor:'pointer'}}>
            <Link to={"/faculty"}>
                <i className="fa fa-arrow-left"></i>
            </Link>
            </div>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={faculty.image} 
                            className="img-fluid h-100 rounded-start image-preloader" 
                            width="100%" 
                            height="100%"
                            onClick={(e)=>{
                                Swal.fire({
                                    imageUrl: e.target.src,
                                    imageWidth: '100%',
                                    showCloseButton: true,
                                    showConfirmButton: false,
                                    background:'#333',
                                })
                            }}
                            />
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title"><b>{faculty.name}</b></h3>
                        <h5 className="card-title"><b>{faculty.degree}</b></h5>
                        <h5 className="card-title"><b>{faculty.email}</b></h5><br /><br />
                        <p className="card-text">{faculty.detail}{faculty.detail}{faculty.detail}{faculty.detail}</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                    </div>
                </div>
            </div>
            <button className="btn w-25 btn-danger m-2" onClick={()=>{
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    background:'#333',
                    color:'white',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'Deleted?',
                        text:'Your file has been deleted.',
                        background:'#333',
                        color:'white',
                        icon: 'success'
                    });
                    fetch(api+facID,{ method: "DELETE" });
                    navigate("/faculty");
                    }});
            }}>Delete</button>
            <Link to={"/edit/"+facID} className="btn w-25 btn-success m-2">Edit</Link>
        </>
    )
}