import Header from './Header'
import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function ProductList()
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
            <h1>Product List</h1>
            <div className="col-sm-6 offset-sm-3">
                <Table>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Action</td>
                    </tr>
                    {
                        data.map((item)=>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img style={{width:100}} src={"http://localhost:8000/"+item.file_path}></img></td>
                                <td><span onClick={() => deleteOperation(item.id)} className="deleteBtn">Delete</span></td>
                                <td></td>
                                <td>
                                    <Link to={"update/"+item.id}>
                                        <span className="updateBtn">Update</span>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </Table>
            </div>
        </div>
    )    
}

export default ProductList;