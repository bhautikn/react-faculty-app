import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";
import './form.css'

export default function FacultyOp({param, sendMethod, api}){
    const [data, setData] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        if(param != null){
            document.title = "Edit Faculty";
            fetch(api+param)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
			})
        }
        else document.title = "Add Faculty";
    }, [])
    return(
        <>
        <Loading />
        <div className="text-center fs-2 m-3">Faculty Detail</div>
        <div className="container-div">
            <form>
                Name <br />
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Full Name"
                    value={data.name}
                    onChange={(e)=>{
                        setData({...data, name:e.target.value})
                    }}
                /><br />
                Email <br />
                <input 
                    type="email" 
                    placeholder="Email"
                    className="form-control"
                    value={data.email}
                    onChange={(e)=>{
                        setData({...data, email:e.target.value})
                    }}
                /><br />
                Degree <br />
                <input 
                    type="text" 
                    placeholder="Degree"
                    className="form-control"
                    value={data.degree}
                    onChange={(e)=>{
                        setData({...data, degree:e.target.value})
                    }}
                    /><br />
                Descrption <br />
                <textarea 
                    cols="50" 
                    rows="5" 
                    placeholder="Description"
                    className="form-control"
                    value={data.detail}
                    onChange={(e)=>{
                        setData({...data, detail:e.target.value})
                    }}
                    ></textarea><br />
                <input 
                    type="submit" 
                    className="btn btn-success" 
                    value={param == null?"Add":"Change"}
                    onClick={()=>{
                        fetch(api+param, {
                            method: sendMethod,
                            headers: {'content-type':'application/json'},
                            body: JSON.stringify(data)
                        })
                        navigate("/faculty");
                    }}
                    /> <Link to="/faculty" className="btn btn-danger">Cancel</Link>
            </form>
        </div>
        </>
    )
}