import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import { listUsers, deleteUser } from '../../redux/reducers/user/user.actions';
import Swal from 'sweetalert2';
import Pdf from "react-to-pdf";

const UsersListPage = ({ history }) => {
  const dispatch = useDispatch();

  const ref = React.createRef();

  const options = {

    orientation: "potrait",
  
    unit: "in",
  
    format: [20, 10],
  
  };

  const [search, setSearch] = React.useState("");

  

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure to delete this User?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));

        Swal.fire('Deleted!', 'Your user has been deleted.', 'success');
      }
    });
  };
  return (
    <>
    <input className='form-control' type='search' placeholder='Search' name='searchPlant' value={search}
            onChange={(event) => setSearch(event.target.value)}></input>
    <div ref={ref} id={'body'}>
      <h1 style={{marginLeft:'10px'}}>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {users.filter((user) => {
              if(search === "") {
                return user;
              } 
              else if(user.name.toLowerCase().includes(search.toLowerCase())) {
                return user;
              }
              else
              return null;
            }).map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }} />
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash' style={{color:"red"}}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </div>
      <Pdf targetRef={ref} filename="All Users.pdf" options={options}>
        {({ toPdf }) => <Button onClick={toPdf} variant='primary'>Save As PDF</Button>}
      </Pdf>
    </>
  );
};

export default UsersListPage;
