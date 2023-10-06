import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState({});
  const [create, setCreate] = useState(false);
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
      await axios.post("http://localhost:8080/add", userAdd);
    };
    console.log(userAdd);
    submit();
  };

  const deleteData = () => {
    console.log("user");
  };
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => setCreate(true)}
      >
        Create
      </button>
      <table class="table">
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
            <tr key={e.i}>
              <th scope="row">{i + 1}</th>
              <td>{e.name}</td>
              <td>{e.role}</td>
              <td>{e.email}</td>
              <td>
                <button type="button" class="btn btn-primary">
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onclick={deleteData}
                >
                  Delete
                </button>
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
                  class="btn btn-primary"
                  onClick={submitHandler}
                >
                  Add
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onclick={()=>setCreate(false)}
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
