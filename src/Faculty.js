import { useEffect, useState } from "react";
import Loading from "./Loading";
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Swal from 'sweetalert2'

export default function Faculty({api}) {
	const [data, setData] = useState([]);
	const [isData, setIsData] = useState(true);

	async function fetchData(){
		if(data.length > 100){
			setIsData(false);
			return;
		} 
		let temp = [...data];
		let j = temp.length;
		for(let i = j+1;i<j+9;i++){
			await fetch(api+i)
			.then((res) => res.json())
			.then((res) => {
				// if(temp[temp.length-1] == "Something went wrong while parsing response JSON"){
				// 	setIsData(false);
				// 	return;
				// }
				temp = ([...temp, res])
			})
			.catch(err => console.error(err));
		}
		setData(temp);
	}
	useEffect(() => { 
		fetchData();
		document.title = "Faculty";
	}, []);
	var Faculty = data.map((fac) => {
		if(fac === "Something went wrong while parsing response JSON"){
			return;
		}
		return (
		<div className="p-3 profile-card-body">
		<div class="card h-100 profile-card">
			<img 
				class="card-img-top image-preloader h-50" 
				src="https://www.w3schools.com/bootstrap4/img_avatar3.png" 
				width="106px" 
				height="106px"
				onClick={(e)=>{
					Swal.fire({
						imageUrl: e.target.src,
						imageWidth: '100%',
						showCloseButton: true,
						showConfirmButton: false,
						background:'#333',
						padding:0
					})
				}}
			/>
			<div class="card-body h-50">
				<h5 class="card-title">{fac.name}</h5>
				<p class="card-text">{fac.detail}</p>
			</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">{fac.degree}</li>
			</ul>
			<div class="card-body">
			<button
				className="btn btn-outline-danger m-2"
				onClick={() => {
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
						  }
						  );
						fetch(
						api+fac.id,
						{ method: "DELETE" }
						);
						setData([...data.filter((element) => element.id !== fac.id)]);
						}
					  })	
				}}
			  >
				Delete
			  </button>
			  <Link to={fac.id} className="btn btn-outline-info">Detail</Link>
			  <Link to={"/edit/"+fac.id} className="btn btn-outline-success m-2">Edit</Link>
			</div>
		</div>
		</div>
	  );
	})
  return (
    <>
      <Loading />
      <div className="row px-2">
		<InfiniteScroll
			dataLength={data.length}
			next={fetchData}
			hasMore={isData}
			loader={<div className="Loading-div"></div>}
			endMessage={<p align='center'>end</p>}
			className="row"
			scrollableTarget="scrollableDiv"
		>
        {Faculty}
		</InfiniteScroll>
      </div>
    </>
  );
}