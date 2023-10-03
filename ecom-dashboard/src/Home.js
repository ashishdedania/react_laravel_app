import Header from './Header'
import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Home()
{

    const [data,setData]=useState([]);

    const getWithFetch = async () => {
        const response = await fetch("http://localhost:8000/api/list");
        const jsonData = await response.json();
        setData(jsonData.data);
      };

    useEffect(()=>{
        getWithFetch();
    },[])


    async function deleteOperation(id)
    {
        let result = await fetch("http://localhost:8000/api/delete/"+id,{
            method:'DELETE'
        });

        result = await result.json();
        alert(result.message);
        getWithFetch();        
    }

    
    return (
        <div>
            <Header />
            <h1>Home</h1>
            <div className="col-sm-12">
                <Table>
                    
                    {
                        data.map((item)=>                           
                            <div className="itemDiv">
                            <div className="card" style={{width:300}}>
                            <img style={{width:300}} src={"http://localhost:8000/"+item.file_path}></img>
                            <div class="card-body">
                            <h5 class="card-title">Price : ${item.price}</h5>
                            <h5 class="card-title">Product : {item.name}</h5>
                            <p class="card-text"> Description : {item.description}</p>
                            <a href="#" class="btn btn-primary">Go Detail</a>
                            </div>
                            </div>
                            </div>
                        )
                    }
                </Table>
            </div>
        </div>
    )    
}

export default Home;