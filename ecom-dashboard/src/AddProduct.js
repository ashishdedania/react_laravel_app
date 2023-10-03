import Header from './Header'
import {useNavigate} from 'react-router-dom'
import React, {useState,useEffect} from "react"

function AddProduct() {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const [category, setCategory] = useState();
    const navigate =useNavigate();
    
    async function save() {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);

        let result = await fetch("http://localhost:8000/api/addproduct", {
            method: 'POST',
            body: formData,
        })

        result = await result.json()

        if (result.success == true) {
            alert("Product created successfully");
            navigate("/")
        }
        else {            
            if(result.data.name)
            {                
                alert(result.data.name[0]);
            }
            
            if(result.data.price)
            {                
                alert(result.data.price[0]);
            }
            
            if(result.data.description)
            {                
                alert(result.data.description[0]);
            }

            if(result.data.file)
            {                
                alert(result.data.file[0]);
            } 
        }        
    }

    const [data,setData]=useState([]);

    const getWithFetch = async () => {
        const response = await fetch("http://localhost:8000/api/listcategory");
        const jsonData = await response.json();
        setData(jsonData.data);
        setCategory(1);
      };

    useEffect(()=>{
        getWithFetch();
    },[])

    return (
        <>
            <Header />

            <div className="col-sm-4 offset-sm-4">

                <h1>Add Product</h1>

                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" />
                <br />
                <input type="text" onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Price" />
                <br />
                <input type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" />
                <br />
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" placeholder="File" />
                <br />
                <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
                      {data.map((item, index) => (
                            <option key={index} value={item.id}>
                            {item.name}
                            </option>
                      ))}
                </select>
                <br/>
                <button onClick={save} className="btn btn-primary">Add Product</button>
            </div>
        </>
    )
}

export default AddProduct