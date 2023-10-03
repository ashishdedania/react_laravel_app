import {Navbar,Nav, NavDropdown} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

function Header()
{
    let user = JSON.parse(localStorage.getItem('user-info'))
    const navigate =useNavigate();

    function logOut()
    {
        localStorage.clear();
        navigate("/register")
    }

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto navbar_wrapper">
                    {
                        localStorage.getItem('user-info') ? 
                        <>
                            <Link to="/">Product List</Link>
                            <Link to="/add">Add Product</Link>
                            
                        </>
                        :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Sign Up</Link>
                            <Link to="/home">Home</Link> 
                        </>
                    }              
                </Nav>

                {
                        localStorage.getItem('user-info') ? 
                <Nav>
                    <NavDropdown title= {user && user.data.name}>
                        <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item> 
                    </NavDropdown>
                </Nav>
                :
                null
                }
            </Navbar>
        </div>
    )
}

export default Header