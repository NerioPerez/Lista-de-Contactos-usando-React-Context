import { useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";


function Card(props) {
    const urlBase = "https://playground.4geeks.com/contact/agendas";
    // Funcion para modifcar un contacto por id
    const { store, dispatch } = useGlobalReducer()
    // Funcion para eliminar un contacto por id
    const deleteContact = async () => {
        try {
            const response = await fetch(`${urlBase}/np/contacts/${props.id}`,
                {
                    method: "DELETE",
                })
            if (response.ok) {
                const updatedContacts = store.contacts.filter(contact => contact.id != props.id)
                dispatch({
                    type: "set_contacts",
                    payload: updatedContacts
                })
                alert("Contact deleted successfully!");                
            } else {
                alert("Failed to delete contact.");
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    return (
        <div className="container">
            <div className="card mb-3 container-fluid">
                <div className="container d-flex">
                    <div className="col-2 align-self-center">
                        <img src="https://wallpapers.com/images/featured/fotos-de-perfil-xj8jigxkai9jag4g.jpg" className="img-fluid rounded-circle " style={{ width: "150px", height: "150px" }} alt="..." />
                    </div>
                    <div className="col d-flex align-self-center">
                        <div className="card-body p-2 w-100">
                            <h5 className="card-title">{props.name}</h5>
                            <p className="card-text"><FontAwesomeIcon icon={faLocationDot} />{props.address}.</p>
                            <p className="card-text"><FontAwesomeIcon icon={faPhoneVolume} />{props.phone}.</p>
                            <p className="card-text"><FontAwesomeIcon icon={faEnvelope} />{props.email}.</p>
                        </div>
                        <div className="p-2 d-flex flex-shrink-1">
                            <div className="p-2 flex-shrink-1">
                                <Link to={"/edit/" + props.id} type="button" className="btn btn-warning">
                                    <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                                </Link>
                            </div>
                            <div className="p-2 w-100">
                                <button type="button" className="btn btn-danger" onClick={deleteContact}>
                                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Card;