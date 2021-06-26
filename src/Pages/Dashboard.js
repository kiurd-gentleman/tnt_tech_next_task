import React, { useState, useEffect } from 'react'
// import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import { Link } from "react-router-dom";



export const AllPost = () => {
    let allUser = '';
    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [post, setPost] = useState([]);
    const [visible, setVisible] = useState(1);
    const getAllNotes = () => {
        axios.get(`http://127.0.0.1:8000/api/user-post`,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
            .then(res => {
                const persons = res.data;
                allUser = persons.result;
                setPost(allUser )
            })

    }

    // const [pageNumber, setPageNumber] = useState(0);
    // const postPerPage = 10;
    // const pagesVisited = pageNumber * postPerPage;
    // const pageCount = Math.ceil(post.length / postPerPage);
    // const post_view = id =>{
    //
    //     console.log(id)
    // }
    // const history = useHistory();
    const displayUsers = post.slice(0,visible).map((post) => {

        return (
            <div key={post.id}>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>
                                <div className="ms-2 me-auto">
                                    <span className="fw-bold">{post.title} . </span><span><sub>Author {post.author_id} .  posted in {post.created_at} </sub></span>
                                    <div>{(post.description.length >200) ? post.description.substring(0,200):post.description}</div>
                                </div>
                            </td>
                            <td>
                                <ButtonGroup aria-label="Basic example">
                                <Link className="btn btn-sm btn-info" to={`/post-details/${post.author_id}`} >View</Link>
                                <Link className="btn btn-sm btn-warning" to={`/post-edit/${post.author_id}`} >Edit</Link>
                                <Link className="btn btn-sm btn-danger" to={`/post-delete/${post.author_id}`} >Delete</Link>
                                </ButtonGroup>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {/*<span className="btn btn-sm  btn-primary rounded-pill" onClick={() => { console.log(3);history.push('/details') }}>View Post</span>*/}
                </li>
            </div>
        );
    });

    // function Details() {
    //     return <h2>Home</h2>;
    // }


    const loadDate = ({ selected }) => {
        setVisible((prevValue)=>prevValue + 1);
    };




    return (
        <div >
            <h3> My all post</h3>
            <Link className="btn btn-sm btn-success"  to="/post-create" >Create</Link>
            <ol className = "list-group list-group-numbered mt-5" > { displayUsers } </ol>
            <div className="mt-3 w-100 d-flex justify-content-center">
                <Button className="btn btn-sm btn-info" onClick={loadDate}>Load More</Button>
            </div>



            {/*<ReactPaginate previousLabel = { "Previous" }
        nextLabel = { "Next" }
        pageCount = { pageCount }
        onPageChange = { changePage }
        containerClassName = { "paginationBttns" }
        previousLinkClassName = { "previousBttn" }
        nextLinkClassName = { "nextBttn" }
        disabledClassName = { "paginationDisabled" }
        activeClassName = { "paginationActive" }/>*/}
        </div >
    )
}

export default AllPost;
