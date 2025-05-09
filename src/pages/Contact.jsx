import React from "react";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


// Api URL 
const urlBase = "https://playground.4geeks.com/contact/agendas"

// Funcion para obtener todos los contactos
function Contact() {

const { store, dispatch } = useGlobalReducer()

    const getAllContacts = async () => {
        try {
            const response = await fetch(`${urlBase}/np/contacts`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Error fetching contacts");
            }
            console.log(data);
            dispatch({
                type: "set_contacts",
                payload: data.contacts
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllContacts();
    }, []);

    return (
        <div className="container">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={"/add"} className="btn btn-info me-md-3 mt-4" type="button">Add New Contact</Link>
            </div>
            <div className="container-fluid">

                {store.contacts && store.contacts.length > 0 && store.contacts.map(contact => {
                    return (
                        <div className="col" key={contact.id}>
                            <Card
                                id={contact.id}
                                name={contact.name}
                                address={contact.address}
                                phone={contact.phone}
                                email={contact.email}
                            />
                        </div>
                    )
                })}

            </div>
        </div>
    );
}


export default Contact;