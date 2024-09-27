import React, {useState, useEffect} from "react";
import { Accessibility, MapPin, Star } from "lucide-react";

function getRandomRating(){
    return(Math.random()* 5).toFixed(1);
}

function getRandomReviews(){
    return Math.floor(Math.random()* 1000) + 1;
}

function Itinerary(){
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(0);

    useEffect(()=> {
        setRating(getRandomRating());
        setReviews(getRandomReviews());
    }, []);

    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-7xl px-8 py-8 bg-slate-800 shadow-lg rounded-md">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                        {/*Title Section*/}
                        <h1 className="text-4xl font-bol">Itinerary Name</h1>
                        <p className="text-gray-500 text-lg">Provider Name</p>

                        {/*Star Section
                        TODO: replace stars + make them full/empty */}
                        <div className=" flex items-center space-x-2 my-4">
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((star, index) => (
                                    <svg
                                        key ={index}
                                        className={'h-6 w-6 ${index <Math.floor(rating) ? "fill-current" : "text-gray-300"'}
                                        xmlns="https://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        >
                                             <path d="M12 .587l3.668 7.476 8.164 1.191-5.92 5.769 1.398 8.152L12 18.896l-7.31 3.849 1.398-8.152-5.92-5.769 8.164-1.191L12 .587z" />
                                        </svg>
                                ))}
                            </div>
                            <p className="text-gray-400">{rating}/5 ({reviews})</p>
                        </div>

                        <p className="text-gray-500">
                        This bus tour offers you the chance to explore the city of London at your own pace.
                        You can choose between a 24-hour, 48-hour, or 72-hour pass and visit the top landmarks
                        and tourist sites in the city.
                        </p>

                        {/*Supported Languages*/}
                        <div className="my-4">
                            <h2 className="text-xl font-semibold pb-2">Supported Langauges</h2>
                            <div className="flex flex-wrap gap-2">
                                {["English", "Spanish", "Portuguese", "Arabic", "Chinese","German"].map((lang) => (
                                    <button key={lang} className="px-3 py-1 bg-slate-800 rounded-full border">
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/*Accessibility Fts*/}
                        {/*TODO: add icons*/}
                        <div className=" flex flex-wrap gap-4">
                            {["Mobility aid friendly", "Hearing impaired support", "Vision impared support", "Text-to-speech devices"].map((ft)=>(
                               <p className="flex ">
                                 <Accessibility/>
                                 {ft} 
                                </p>
                            ))}
                        </div>
                    </div>
                    
                    {/*TODO: Fix img placeholders + padding*/}
                    <div className="grid grid-cols-2 col-span-2">
                        <div className="bg-gray-300 h-full rounded-lg "></div>
                        <div className="">
                            <div className="bg-gray-300 h-1/2 rounded-lg "></div>
                            <div className="bg-gray-300 h-1/2 rounded-lg "></div>
                        </div>
                    </div>
                </div>

                {/*Itinerary + Availbility*/}
                <div className="grid grid-cols-3 gap-8 mt-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
                        <ul className="space-y-4">
                            <li>
                                <div className="flex items-start space-x-2">
                                    <div className="mt-1"><MapPin size={40} className="border-2 rounded-full p-1" /></div>
                                    < div>
                                    <p>Starting at, </p>
                                    <p>Location Name</p>
                                    <a href="#" className="text-amber-400">See details</a>
                                    </div>
                                </div>
                            </li>
                            {[1, 2, 3].map((stop) => (
                                <li key={stop}>
                                    <div className="flex items-start- space-x-2">
                                        <div className="flex-shrink-0 bg-white text-black font-semibold w-10 h-10 flex items-center justify-center rounded-full">
                                            {stop}
                                        </div>
                                        <div>
                                            <p>Location {stop}</p>
                                            <p>Stop: X hours</p>
                                            <a href="#" className="text-amber-400">See details</a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="flex items-start space-x-2">
                                    <div className="mt-1"><MapPin size={40} className="border-2 rounded-full p-1" /></div>
                                        < div>
                                            <p>Finishing at, </p>
                                            <p>Location Name</p>
                                        <a href="#" className="text-amber-400">See details</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Map Placeholder*/}
                    <div className="bg-gray-300 h-full w-full rounded-lg"></div>
                    
                    {/*Availibility Section
                    TODO: add conditional for selected element to have thicker border, seperate day and month to make them appear vertical, lookup map docs*/}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Search Availability</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {["30 Sept", "1 Oct", "3 Oct"].map((date,idx)=>(
                                <button key={idx} className=" border py-2 px-4 rounded-md bg-slate-700 ">
                                    {date}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2 my-4">
                            {["6:30", "8:00", "9:30"].map((time, idx) => (
                                <button key={idx} className="border py-2 px-4 rounded-xl bg-slate-700">
                                    {time}
                                </button>
                            ))}
                        </div>

                        <div className="pace-y-4">
                            <div className="flex items-center">
                                
                                <div className="flex space-x-2">
                                <p>Adult</p> 
                                <p className=" text-slate-500">(16+)</p>
                                </div>
                                <input type="number" min="0" className="border w-16 px-2 py-1 rounded" placeholder="How many Adults..." />
                            </div>
                            <div className="flex items-center">
                                <div className="flex space-x-2">
                                <p>Child</p> 
                                <p className=" text-slate-500">(5-15)</p>
                                </div>
                                <input type="number" min="0" className="border w-16 px-2 py-1 rounded" placeholder="How many Children..." />
                            </div>
                        </div>

                        {/* Total Cost Section */}
                        <div className="border-t mt-4 pt-4">
                            <p>Total: <span className="font-semibold">2100.05 LE</span></p>
                            <p className="text-sm text-gray-500">Includes taxes and charges</p>
                        </div>

                        {/* Book Now Button */}
                        <button className="bg-blue-500 text-white w-full py-3 mt-4 rounded">
                            Book Now
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Itinerary;