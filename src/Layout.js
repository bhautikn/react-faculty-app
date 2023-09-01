import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './layout.css';

function SearchItem({setSearch, api}){
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState([])
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(api).then(res=>res.json()).then(res=>{setData(res)});
    }, []);

    return(
        <div className="overlay-div">
                <div 
                    className="close-btn" 
                    onClick={()=>{
                        document.body.style.overflow = 'auto';
                        setSearch(false)}}>X</div>
                <div className="container w-50">
                    <input 
                        type="search" 
                        className="form-control my-5"
                        placeholder="Search"
                        onChange={(e)=>{
                            let pattern = "";
                            try{
                                pattern = new RegExp(e.target.value);
                                setShowData(data.filter(temp=>pattern.test(temp.name)).map(res=>{
                                    let name = res.name.replace(e.target.value,'<b style="color:red">'+e.target.value+'</b>');
                                    return(
                                        <li class="list-group-item m-2">
                                           <span dangerouslySetInnerHTML={{__html:name}}></span>
                                            <button onClick={()=>{
                                                setSearch(false);
                                                navigate("/faculty/"+res.id);
                                            }} className="btn btn-primary float-end">Detail</button>
                                        </li>
                                    )
                                }));
                            }catch(e){}
                        }}
                        autoFocus
                        />
                </div>
                <div className="container-lg">
                <div class="card">
                    <ul class="list-group list-group-flush">
                        {showData}
                    </ul>
                    </div>
                      
                </div>
            </div>
    );
}

export default function Layout({api}) {
    const [search, setSearch] = useState(false);
    document.body.addEventListener('keyup', (e)=>{
        if(e.key === '/'){
            setSearch(true);
        }
    })
    return (
        <>
            {search && <SearchItem setSearch={setSearch} api={api}/>}
            <div className='header'>
                <div className='search-div'>
                    <div
                        className='form-control p-2 text-secondary fs-5'
                        onClick={()=>{ setSearch(true); }} >
                        search faculty
                        <span className="border px-1 float-end mx-1">/</span>
                    </div>
                </div>
            </div>
            <div className='body' id="scrollableDiv">
                <Outlet />
            </div>
            <div className='side-bar'>
                <Link to="/" className='logo'>
                    <img src="https://joshuafrilot.com/img/react-logo.png" style={{maxWidth:'50%'}}/>
                </Link><br /><br />
                <Link to='/' className='link-page'>
                    <i className="fa fa-home"></i>
                    <span className="link-page-detail">Home</span>
                </Link>
                <Link to='/faculty' className='link-page'>
                    <i className="fa fa-group"></i>
                    <span className="link-page-detail">Faculty</span>
                </Link>
                <Link to='/addFaculty' className='link-page'>
                    <i className="fa fa-user-plus"></i>
                    <span className="link-page-detail">Add Faculty</span>
                </Link>
            </div>
        </>
    );
}