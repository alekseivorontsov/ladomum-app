import React from "react";
import "./ContactForm.scss";
import 'tailwindcss/tailwind.css';
import {HiMapPin} from "react-icons/hi2";
import property1 from '../images/property1.jpg';
import property2 from '../images/property2.jpg';
import property3 from '../images/property3.jpg';
import moment from "moment";

const staysObjects = [
    {
        id: '57ee42d6-09d3-4c59-ac0a-3f9e4f1c5a2b',
        name: 'Esperanza',
        nights: 13,
        address: '114 Residencia Punta Ballena Cabo San Lucas, BS N/A Mexico',
        from: moment([2023, 9, 18]),
        to: moment([2023, 10, 1]),
        imageSrc: property3,
    },
    {
        id: '672575f5-1d38-493b-aaf3-d978fcd35568',
        name: 'Dahlia Place',
        nights: 14,
        address: '358 Dahlia Place Corona Del Mar, CA 92625 USA',
        from: moment([2023, 5, 3]),
        to: moment([2023, 5, 17]),
        imageSrc: property2,
    },
    {
        id: '14d73571-dd69-4725-b3f7-45af634ec03b',
        name: 'Desert Ridge',
        nights: 12,
        address: '123 Main St, City, State, 60003',
        from: moment([2023, 2, 23]),
        to: moment([2023, 3, 4]),
        imageSrc: property1,
    },
    {
        id: '1c6f133a-55b3-402d-8fe7-e103bbaa870f',
        name: 'Desert Ridge',
        nights: 9,
        address: '123 Main St, City, State, 60003',
        from: moment([2023, 0, 1]),
        to: moment([2023, 0, 10]),
        imageSrc: property1,
    }
];

const renderUpcoming = (staysObjects) => {
    const now = moment();
    const upcomingStays = staysObjects.filter(stay => stay.from.isAfter(now));
    if (!upcomingStays || upcomingStays.length === 0) {
        return;
    }
    return (
        <React.Fragment>
            <h1 className="text-xl font-bold mb-4">Upcoming</h1>
            {upcomingStays.map(upcomingStay => renderStay(upcomingStay))}
        </React.Fragment>
    );
};

const renderActive = (staysObjects) => {
    const now = moment();
    const active = staysObjects.filter(stay => stay.from.isBefore(now) && stay.to.isAfter(now));
    if (!active || active.length === 0) {
        return;
    }
    return (
        <React.Fragment>
            <h1 className="text-xl font-bold mb-4">Active</h1>
            {active.map(upcomingStay => renderStay(upcomingStay, 'bg-green-100'))}
        </React.Fragment>
    );
};

const renderPast = (staysObjects) => {
    const now = moment();
    const active = staysObjects.filter(stay => stay.to.isBefore(now));
    if (!active || active.length === 0) {
        return;
    }
    return (
        <React.Fragment>
            <h1 className="text-xl font-bold mb-4">Past</h1>
            {active.map(upcomingStay => renderStay(upcomingStay))}
        </React.Fragment>
    );
};

const renderStay = (stay, backgroundClass) => {
    return (
        <li key={stay.id} className={`${backgroundClass || 'bg-white'} shadow rounded-lg flex items-center p-4`}>
            <div className="flex-grow">
                <h2 className="text-lg font-semibold">{stay.name}</h2>
                <div className="flex flex-wrap">
                    <p className="w-auto text-gray-600 text-md md:text-lg">{stay.nights} nights |</p>
                    <HiMapPin size={20} className="ml-1 mr-1"/>
                    <p className="text-gray-600 text-sm md:text-lg">{stay.address}</p>
                </div>
                <br/>
                <p className="text-gray-500 text-sm md:text-lg">{stay.from.format('MMM DD, YYYY')} - {stay.to.format('MMM DD, YYYY')}</p>
            </div>
            <img src={stay.imageSrc} alt="Hotel 1" className="w-28 h-28 rounded-lg ml-4"/>
        </li>
    );
};

const Stays = () => {
    return (
        <div className="w-full max-w-2xl mt-2 md:mt-4 mb-4">
            <h1 className="text-3xl font-bold mb-4">Stays</h1>
            <ul className="space-y-4">
                {renderUpcoming(staysObjects)}
                {renderActive(staysObjects)}
                {renderPast(staysObjects)}
            </ul>
        </div>
    );
};

export default Stays;
