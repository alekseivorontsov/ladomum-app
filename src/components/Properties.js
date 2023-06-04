import React from "react";
import property1 from '../images/property1.jpg';
import property2 from '../images/property2.jpg';
import property3 from '../images/property3.jpg';
import {useNavigate} from "react-router-dom";

const propertyObjects = [
    {
        id: 'b6d9b744-c45f-4287-a155-88364d08e96e',
        name: 'Esperanza',
        address: '114 Residencia Punta Ballena Cabo San Lucas, BS N/A Mexico',
        ownership: '1/4 Ownership',
        imageSrc: property3,
        bookingUrl: '/book/esperanza',
    },
    {
        id: 'e8ecadc0-fb56-4bea-bcd3-62d0d7d23a1f',
        name: 'Dahlia Place',
        address: '358 Dahlia Place Corona Del Mar, CA 92625 USA',
        ownership: '1/8 Ownership',
        imageSrc: property2,
        bookingUrl: '/book/dahlia-place',
    },
    {
        id: 'd29390ef-3156-409f-8f3c-85135177d0b3',
        name: 'Desert Ridge',
        address: '123 Main St, City, State, 60003',
        ownership: '1/8 Ownership',
        imageSrc: property1,
        bookingUrl: '/book/desert-ridge',
    }
];

const Properties = () => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
            {propertyObjects.map(property => (
                <div key={property.id} className="bg-white shadow-lg rounded-lg">
                    <img src={property.imageSrc} alt="Property 1"
                         className="w-full h-64 object-cover rounded-t-lg"/>
                    <div className="px-6 py-4">
                        <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
                        <p className="text-gray-600">{property.ownership}</p>
                        <p className="text-gray-600">{property.address}</p>
                    </div>
                    <div className="px-6 pb-4 flex">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => navigate(property.bookingUrl)}>
                            Book
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Properties;