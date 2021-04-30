import React from 'react'

const FilterForm = (props) => {
    const handleFilterChange = (event) => {
        props.setNewFilter(event.target.value);
    };

    return (
        <div id='filter-form'>
            Filter with:
            <input value={props.filter} onChange={handleFilterChange} />
        </div>
    );
};

export default FilterForm;