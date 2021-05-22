import React from 'react'
import personService from '../services/PersonService.js'

const AddPersonForm = (props) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };

    const handleNameChange = (event) => {
        props.setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        props.setNewNumber(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: props.newName,
            number: props.newNumber
        };
        if (props.persons.some(person => person.name.toLowerCase() === props.newName.toLowerCase())) { //updating existing person
            if (window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)) {
                const personId = props.persons.filter(p => {
                    return p.name.toLowerCase() === props.newName.toLowerCase();
                })[0].id;
                personService.update(personId, personObject).then(response => {
                    props.setPersons(props.persons.filter(p => {
                        return p.id !== personId;
                    }).concat(response));
                    props.setMessageStyle(successStyle);
                    props.setMessage(`${props.newName} number changed`);
                    setTimeout(() => {
                        props.setMessage(null);
                    }, 3500);
                }).catch(error => {
                    props.setMessageStyle(errorStyle);
                    props.setMessage(`Information of ${props.newName} has already been removed from server`);
                    setTimeout(() => {
                        props.setMessage(null);
                    }, 3500);
                    props.setPersons(props.persons.filter(person => person.id !== personId));
                });
                props.setNewName('');
                props.setNewNumber('');
            } else {
                props.setNewName('');
                props.setNewNumber('');
            }
        } else { //new person
            props.setMessageStyle(successStyle);
            props.setMessage(`Added ${props.newName}`);
            setTimeout(() => {
                props.setMessage(null);
            }, 3500);
            personService
                .create(personObject)
                .then(response => {
                    props.setPersons(props.persons.concat(response))
                });
            props.setNewName('');
            props.setNewNumber('');
        }
    };

    return (
        <div id='add-person-form'>
            <form onSubmit={addPerson}>
                <div id='name-input'>
                    Name: <input value={props.newName} onChange={handleNameChange} />
                </div>
                <div id='number-input'>
                    Number: <input value={props.newNumber} onChange={handleNumberChange} />
                </div>
                <div id='submit-button'>
                    <button type='submit'>add</button>
                </div>
            </form>
        </div>
    );
};

export default AddPersonForm;