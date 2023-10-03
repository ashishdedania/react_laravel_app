import Header from './Header'
import { useParams,useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'

function UpdateProduct() {
    const [data, setData] = useState([])
    const [dataCat, setDataCat] = useState([])
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const [category, setCategory] = useState();
    const params = useParams();
    const navigate =useNavigate();

    const getWithFetch = async () => {
        const response = await fetch("http://localhost:8000/api/product/" + params.id);
        const jsonData = await response.json();
        setData(jsonData.data);
        setName(jsonData.data.name);
        setPrice(jsonData.data.price);
        setDescription(jsonData.data.description);
        setFile(jsonData.data.file_path);
        setCategory(jsonData.data.category_id);
    };

    useEffect(() => {
        getWithFetch();
    }, [])

    async function save() {
        console.warn(name, file, price, description)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);

        let result = await fetch("http://localhost:8000/api/updateproduct/"+ params.id, {
            method: 'POST',
            body: formData,
        })

        result = await result.json()

        if (result.success == true) {
            alert("Product updated successfully");
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
        }        
    }

    const getWithFetchCatgory = async () => {
        const response = await fetch("http://localhost:8000/api/listcategory");
        const jsonData = await response.json();
        setDataCat(jsonData.data);
        //setCategory(1);
      };

    useEffect(()=>{
        getWithFetchCatgory();
    },[])

    return (
        <>
            <Header />
            <div className="col-sm-4 offset-sm-4">
                <h1>Update Product</h1>
                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" value={name} />
                <br />
                <input type="text" onChange={(e) => setPrice(e.target.value)} className="form-control" value={price} />
                <br />
                <input type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" value={description} />
                <br />
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control"  />
                <br />
                <img style={{ width: 100 }} src={"http://localhost:8000/" + data.file_path}></img>
                <br />
                
                <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
                      {dataCat.map((item, index) => (
                            <option key={index} value={item.id} selected={item.id === category}>
                            {item.name}
                            </option>
                      ))}
                </select>
                <br/>
                <button onClick={save} className="btn btn-primary">Update Product</button>
            </div>
        </>
    )
}

export default UpdateProduct