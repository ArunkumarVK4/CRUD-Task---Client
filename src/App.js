import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState([]);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [editedRowIndex, setEditedRowIndex] = useState(null)

  const [userAdd, setUserAdd] = useState({
    name: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const res = await axios.get("http://localhost:8080");
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsersList();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserAdd({
      ...userAdd,
      [name]: value,
    });
  };

  const submitHandler = () => {
    const submit = async () => {
      if (!userAdd.name || !userAdd.role || !userAdd.email) {
        alert("All inputs Needed");
      } else {
        await axios.post("http://localhost:8080/add", userAdd);
        setUserAdd({name:"",email:"", role:""})
        setCreate(false)
       const res = await axios.get("http://localhost:8080/")
        setUser(res.data)
      }
    };
    submit();
  };

  const handleDelete = (e) => {
    const deleteUser = async () => {
      await axios.delete(`http://localhost:8080/delete/${e._id}`);
      const res = await axios.get("http://localhost:8080");
      setUser(res.data);
    };
    deleteUser();
  };

  const saveUpdate = (e)=>{
    const updateUser = async () => {
      await axios.put(`http://localhost:8080/delete/${e._id}`);
      const res = await axios.get("http://localhost:8080");
      setUser(res.data);
      alert("updated Successfully")
    };
    updateUser();
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setCreate(true)}
      >
        Create
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>
                {edit   ? (
                  <input value={e.name} name="name" onChange={handleChange} />
                ) : (
                  <p>{e.name}</p>
                )}
              </td>
              <td>
                {edit ? (
                  <input value={e.role} name="role" onChange={handleChange} />
                ) : (
                  <p>{e.role}</p>
                )}
              </td>
              <td>
                {edit ? (
                  <input value={e.email} name="email" onChange={handleChange} />
                ) : (
                  <p>{e.email}</p>
                )}
              </td>
              <td>
                {edit ? (
                  <button
                    type="button"
                    classNameName="btn btn-primary"
                    onClick={()=>saveUpdate(e)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    
                    onClick={() => {
                      setEdit(true);
                      setCancel(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td>
                {cancel ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setCancel(false);
                      setEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(e)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}

          {create ? (
            <tr>
              <th scope="row">{}</th>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={userAdd.name}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="role"
                  value={userAdd.role}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="email"
                  value={userAdd.email}
                ></input>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitHandler}
                >
                  Add
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setCreate(false)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
    </>
  );
};

export default App;
