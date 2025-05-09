import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

// Api URL
const urlBase = "https://playground.4geeks.com/contact/agendas";

function AddContact() {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const { id } = useParams(); // Hook para obtener parámetros de la URL
  const { store, dispatch } = useGlobalReducer(); // Hook para acceder al estado global
  // Estado para almacenar los datos del nuevo contacto
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  // Estado para manejar el estado de carga
  const [isLoadingAddUserInfo, setIsLoadingAddUserInfo] = useState(false);
  // Estado para manejar la visibilidad del toast
  const [showToast, setShowToast] = useState(false);

  // Esta funcion se ejecuta para limpiar el formulario
  function clearForm() {
    setUserData({
      name: "",
      address: "",
      phone: "",
      email: "",
    });
  }

  // Esta funcion se ejecuta para manejar el evento de cambio en los inputs y actualiza el estado de userData
  const handleChange = (e) => {     
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Esta funcion se ejecuta para enviar los datos del nuevo contacto a la API
  const postUserData = async () => {
    setIsLoadingAddUserInfo(true); // Activa el estado de carga
    try {
      const response = await fetch(`${urlBase}/np/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Error adding contact");
      }
      clearForm();
      setShowToast(true);
      dispatch({
        type: "set_contacts",
        payload: [...store.contacts, data], // Actualiza el estado global con el nuevo contacto
      });
      navigate("/"); // Redirige a la página de contactos después de agregar el nuevo contacto
    } catch (error) {
      console.error(error);
      alert("Error adding contact.");
    } finally {
      setIsLoadingAddUserInfo(false); // Desactiva el estado de carga
    }
  };

  const putContact = async () => {
        try {
            const response = await fetch(`${urlBase}/np/contacts/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                })
            if (response.ok) {
                const updatedContact = await response.json();
                const updatedContacts = store.contacts.map((contact) =>
                    contact.id === id ? updatedContact : contact
                );
                dispatch({
                    type: "set_contacts",
                    payload: updatedContacts
                });
                alert("Contact updated successfully!");
                navigate("/"); // Redirige a la página de contactos después de actualizar el contacto
            } else {
                alert("Failed to update contact.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      if (id) {
        if (store.contacts) {
          if (store.contacts.length > 0) {
            const contact = store.contacts.find((contact) => contact.id == id);
            if (contact) {
              setUserData({
                name: contact.name,
                address: contact.address,
                phone: contact.phone,
                email: contact.email,
              });
            }
          }
        }
      }
    }
  , [id, store.contacts]); // Dependencias para el useEffect

  const handleSubmit = () => {
    if (id) {
      putContact();
    } else {
      postUserData();
    }
  }
  return (
    <div className="container fs-3">
      <p className="text-center fs-2">Contact-List React RouterDom.</p>
      <p className="text-center fs-2">Add New Contact</p>
      <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div className="mb-3">
          <label htmlFor="formGroupExampleInputName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="formGroupExampleInputName"
            placeholder="Enter Full Name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="formGroupExampleInputEmail"
            placeholder="Enter Email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInputPhone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            className="form-control"
            id="formGroupExampleInputPhone"
            placeholder="Enter Phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            name="address"
            className="form-control"
            id="formGroupExampleInputAddress"
            placeholder="Enter Address"
            value={userData.address}
            onChange={handleChange}
          />
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            disabled={isLoadingAddUserInfo} // Deshabilita el botón si está cargando
            onClick={handleSubmit} // Llama a la función para agregar el contacto
          >
            {isLoadingAddUserInfo ? "loading..." : "Save"} {/* Cambia el texto según el estado */}
          </button>
        </div>
        {showToast && (
          <div className="toast align-items-center show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">
                Contact added successfully!
              </div>
              <button
                type="button"
                className="btn-close me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setShowToast(false)} // Oculta el toast al hacer clic
              ></button>
            </div>
          </div>
        )}
        <p>
          <Link className="link-offset-3" to="/">
            Back to Contacts
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AddContact;