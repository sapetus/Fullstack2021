import React from 'react'
import personService from '../services/PersonService.js'

const filterPersons = (persons, filter) => {
    return (
        persons.filter(
            person => person.name.toLowerCase().includes(filter.toLowerCase())
        )
    )
};

const Person = ({ person }) => {
    return (
        <p>
            {person.name}: {person.number}
        </p>
    );
};

const Persons = ({ persons, filter, setPersons, setMessage, setMessageStyle }) => {
    const personsToShow = filterPersons(persons, filter);
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };

    const removePerson = (person) => {
        if (window.confirm(`Are you sure you want to remove ${person.name}?`)) {
            setMessageStyle(successStyle);
            setMessage(`${person.name} removed`);
            setTimeout(() => {
                setMessage(null);
            }, 3500);
            personService.remove(person.id);
            setPersons(persons.filter(p => {
                return p.id !== person.id
            }));
        }
    };

    return (
        <div id='persons'>
            {personsToShow.map(person =>
                <div key={person.name} tag='person'>
                    <Person person={person} />
                    <button onClick={() => removePerson(person)}>Remove</button> <br />
                    --------------------------------------------------------
                </div>
            )}
        </div>
    );
};

export default Persons;