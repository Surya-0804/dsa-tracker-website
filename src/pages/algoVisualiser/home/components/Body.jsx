import React from 'react';
import data from './data';
import Component from './Component';

function Body({ searchQuery }) {
    const filteredData = searchQuery
        ? data.filter(item =>
            Object.keys(item)[0].toLowerCase().startsWith(searchQuery.toLowerCase())
        )
        : data;

    return (
        <div className="body">
            <div className="algos">
                {filteredData.map((item, index) => (
                    <Component key={index} name={Object.keys(item)[0]} image={Object.values(item)[0]} />
                ))}
            </div>
        </div>
    );
}
export default Body;
