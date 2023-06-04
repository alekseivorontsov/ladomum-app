import React from "react";
import "./ContactForm.scss";
import 'tailwindcss/tailwind.css';

const ContactForm = () => {
    return (
        <div className="w-full max-w-2xl mt-2 md:mt-4 mb-4">
            <h1 className="text-3xl font-bold mb-4">Stays</h1>
        </div>
        // <div className="w-full max-w-2xl mt-2 md:mt-4">
        //     <h1 className="text-3xl font-bold mb-4">Reach us out</h1>
        //     <div className="w-full mx-auto p-8 bg-white shadow-lg rounded-lg my-4">
        //         <form className="space-y-4">
        //             <div>
        //                 <label htmlFor="name" className="block mb-2 font-bold">Name</label>
        //                 <input id="name" type="text" className="w-full p-2 border border-gray-300 rounded"
        //                        placeholder="John Doe" required/>
        //             </div>
        //             <div>
        //                 <label htmlFor="email" className="block mb-2 font-bold">Email</label>
        //                 <input id="email" type="email" className="w-full p-2 border border-gray-300 rounded"
        //                        placeholder="example@example.com" required/>
        //             </div>
        //             <div>
        //                 <label htmlFor="message" className="block mb-2 font-bold">Message</label>
        //                 <textarea id="message" className="w-full p-2 border border-gray-300 rounded" rows="4"
        //                           placeholder="Type your message here..." required></textarea>
        //             </div>
        //             <div>
        //                 <button type="submit"
        //                         className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    );
};

export default ContactForm;