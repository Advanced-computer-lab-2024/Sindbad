import React, {useState} from "react";
import { Accessibility, MapPin, Star, EarOff, EyeOff, Speech, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function getRandomRating(){
    {/*return (Math.floor(Math.random() * 6));*/}
    return (Math.round(Math.random() * 10) / 2).toFixed(1);

}

function getRandomReviews(){
    return Math.floor(Math.random()* 1000) + 1;
}


const reviews = (getRandomReviews());
const rating = Math.floor(getRandomRating());
const fullStars = rating;
const emptyStar = 5 - fullStars;

const accessibilityFeatures = [
    { icon: <Accessibility/>, label:"Mobility aid friendly" },
    { icon: <EarOff/>, label:"Hearing impaired support" },
    { icon: <EyeOff/>, label:"Vision impaired support" },
    { icon: <Speech/>, label:"Text-to-speech devices" },
];



function Itinerary(){

        // State to store the current count
    const [adult, setAdult] = useState(0);
    const [child, setChild] = useState(0);
    
    const handleAdultIncrement = () => {
        setAdult(adult + 1);
      };
    
      // Function to handle decrement for adult
      const handleAdultDecrement = () => {
        if (adult > 0) {
          setAdult(adult - 1);
        }
      };
    
      // Function to handle increment for child
      const handleChildIncrement = () => {
        setChild(child + 1);
      };
    
      // Function to handle decrement for child
      const handleChildDecrement = () => {
        if (child > 0) {
          setChild(child - 1);
        }
      };

    // To store which element to border 

    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(0);

    const dates = ["Mon 30 Sept", "Tue 1 Oct", "Wed 3 Oct", "Thu 4 Oct"];
    const times = ["6:30", "8:00", "9:30"];
    const locations = [1,2,3];

    return(
        <div className="min-h-screen flex justify-center items-center bg-primary-950">
            <div className="w-full max-w-7xl px-8 py-8 bg-primary-900 shadow-lg rounded-md">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
                    <div>
                        {/*Title Section*/}
                        <div className="my-4">
                            <h1 className="text-4xl font-bol">Itinerary Name</h1>
                            <p className="text-light text-lg">Provider Name</p>
                        

                            {/*Star Section */}
                            <div className=" relative flex gap-4">
                                <div className=" flex">
                                    
                                    {Array.from({ length: (fullStars)}, (_,index) => (
                                        <Star 
                                        key={index} 
                                        className=" fill-secondary"
                                        strokeWidth={0} />
                                    ))}

                                    {/*hasHalfStar && <StarHalf fill="yellow" strokeWidth={0} />*/}

                                    {Array.from({ length: emptyStar }, (_,index) => (
                                        <Star 
                                        key={fullStars + index}
                                        className="fill-dark"
                                        strokeWidth={0} />
                                    ))}

                                </div>
                                <p className="text-light">{rating}/5 ({reviews})</p>
                            </div>
                        </div>
                        
                        <p className="text-light">
                        This bus tour offers you the chance to explore the city of London at your own pace.
                        You can choose between a 24-hour, 48-hour, or 72-hour pass and visit the top landmarks
                        and tourist sites in the city.
                        </p>

                        {/*Supported Languages*/}
                        <div className="my-6">
                            <h2 className="text-xl font-semibold pb-2">Supported Langauges</h2>
                            <div className="flex flex-wrap gap-2">
                                {["English", "Spanish", "Portuguese", "Arabic", "Chinese","German"].map((lang) => (
                                    <div 
                                    key={lang} 
                                    className="px-3 py-1 bg-primary-950 rounded-full border cursor-default">
                                        {lang}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/*Accessibility Fts*/}
                        {/*TODO: add icons*/}
                        <div className=" flex flex-wrap gap-4">
                            {accessibilityFeatures.map((feature, index) => (
                                <p key={index} className="flex items-center gap-2">
                                    {feature.icon}
                                    {feature.label}
                                </p>
                            ))}
                        </div>
                    </div>
                    
                    {/*TODO: Fix img placeholders + padding*/}
                    <div className="grid grid-cols-2 col-span-2 gap-1
                    ">
                        <div className="bg-light h-full rounded-lg "></div>
                        <div className="">
                            <div className="bg-light h-1/2 rounded-lg mb-px "></div>
                            <div className="bg-light h-1/2 rounded-lg "></div>
                        </div>
                    </div>
                </div>
                
                <div className=" border-y mt-8 mx-4"></div>

                {/*Itinerary + Availbility*/}
                <div className="grid grid-cols-10 grid-rows gap-8 mt-8 p-8">
                    <div className="col-span-2">
                        <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
                        <ul className="">
                            <li>
                                <div className="flex items-start space-x-2">
                                    <div className="mt-1"><MapPin size={40} className="border-2 rounded-full p-1" /></div>
                                    < div>
                                    <p>Starting at, </p>
                                    <p>Location Name</p>
                                    <a href="#" className="text-secondary">See details</a>
                                    </div>
                                </div>
                            </li>
                            <li> <div className="relative border border-light rounded-full w-1 h-1 bg-light left-5 mb-3"> </div> </li>
                            <li> <div className="relative border border-light rounded-full w-1 h-1 bg-light left-5 mb-3"> </div> </li>
                            {locations.map((stop) => (
                                <div>
                                    <li key={stop}>
                                        <div className="flex items-start- space-x-2">
                                            <div className="flex-shrink-0 bg-light text-dark font-semibold w-10 h-10 flex items-center justify-center rounded-full">
                                                {stop}
                                            </div>
                                            <div>
                                                <p>Location {stop}</p>
                                                <p>Stop: X hours</p>
                                                <a href="#" className="text-secondary">See details</a>
                                            </div>
                                        </div>
                                    </li>
                                        <li> <div className="relative border border-light rounded-full w-1 h-1 bg-light left-5 mb-3"> </div> </li>
                                        <li> <div className="relative border border-light rounded-full w-1 h-1 bg-light left-5 mb-3"> </div> </li>
                                </div>
                                
                            ))}
                            <li>
                                <div className="flex items-start space-x-2">
                                    <div className="mt-1"><MapPin size={40} className="border-2 rounded-full p-1" /></div>
                                        < div>
                                            <p>Finishing at, </p>
                                            <p>Location Name</p>
                                        <a href="#" className="text-secondary">See details</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Map Placeholder*/}
                    <div className="col-span-4 bg-light h-full w-full rounded-lg"></div>
                    
                    {/*Availibility Section
                    TODO: add conditional for selected element to have thicker border, seperate day and month to make them appear vertical, lookup map docs*/}
                        <div className="col-span-4 p-4">
                            <h2 className="text-2xl font-semibold mb-4">Search Availability</h2>
                            <div className="grid grid-cols-5 gap-2">
                                {dates.map((date,idx)=>(
                                    <button 
                                        key={idx}
                                        onClick={() => setSelectedDate(idx)}
                                        className={`border py-2 px-4 min-h-20 max-w-24 rounded-lg bg-primary-700 ${
                                            selectedDate=== idx ? 'border-light border-2 border- ' : 'border-transparent'
                                        }`}>
                                        <span className="text-sm text-light">{date.split(" ")[0]}</span><br/> {/* Weekday */}
                                        <span className="text-lg font-bold text-secondary">{date.split(" ")[1]}</span><br/> {/* Day */}
                                        <span className="text-sm text-light ">{date.split(" ")[2]}</span> {/* Month */}
                                    </button>
                                ))}
                                <div className=" relative top-1/3">
                                    <Button 
                                    className="relative w-12 h-12 rounded-full bg-secondary -top-2 -left-4">
                                    <ArrowBigRight
                                    className=" fill-primary-700 text-primary-700 w-10 h-10"/>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 my-4">
                                {times.map((time, idx) => (
                                    <button 
                                    key={idx}
                                    onClick={() => setSelectedTime(idx)} 
                                    className={`border py-2 px-4 rounded-2xl bg-primary-700 ${
                                        selectedTime === idx ? 'border-light border-2 ' : 'border-transparent'
                                    }`}>
                                        {time}
                                    </button>
                                ))}
                            </div>

                            <div className="relative p-6 bg-primary-700 border rounded-md">

                                {/* Top cutout */}
                                <div className="absolute inset-x-0 top-36  -left-5 -right-5 flex justify-between">  
                                        <div className="w-10 h-10 bg-primary-900 border-r-2 border-light rounded-full"></div>
                                        <div className="w-10 h-10 bg-primary-900 border-l-2 border-light rounded-full"></div>
                                </div>


                            <div className="space-y-4 my-5">
                                <div className="flex items-center justify-around">
                                    
                                    <div className="flex space-x-2">
                                        <p className="text-xl">Adult</p> 
                                        <p className=" text-light">(16+)</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-4 ">
                                        {/* Decrement Button */}
                                        <Button
                                            onClick={handleAdultDecrement}
                                            variant="ghost"
                                            className=" w-10 h-10 items-center justify-center text-2xl"v
                                        >
                                            -
                                        </Button>

                                        {/* Count Display */}
                                        <div className=" bg-primary-900 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
                                            {adult}
                                        </div>

                                        {/* Increment Button */}
                                        <Button
                                            onClick={handleAdultIncrement}
                                            variant="ghost"
                                            className=" w-10 h-10 items-center justify-center text-2xl"
                                        >
                                            +
                                        </Button>
                                    </div>             
                                </div>
                                <div className="flex items-center justify-around">
                                    <div className="flex space-x-2">
                                        <p className="text-xl">Child</p> 
                                        <p className=" text-light">(5-15)</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-4">
                                        {/* Decrement Button */}
                                        <Button
                                            onClick={handleChildDecrement}
                                            variant="ghost"
                                            className=" w-10 h-10 items-center justify-center text-2xl"
                                        >
                                            -
                                        </Button>

                                        {/* Count Display */}
                                        <div className=" bg-primary-900 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
                                            {child}
                                        </div>

                                        {/* Increment Button */}
                                        <Button
                                            onClick={handleChildIncrement}
                                            variant="ghost"
                                            className=" w-10 h-10 items-center justify-center text-2xl"
                                        >
                                            +
                                        </Button>
                                    </div>  
                                </div>
                            </div>

                            {/* Total Cost Section */}
                            <div className="border-t border-dashed mt-4 pt-4">
                                <p>Total: <span className="font-semibold text-xl mx-4">{(adult*400+child*200)*1.2}</span>LE</p>
                                <p className="text-sm text-secondary">Includes taxes and charges</p>
                            </div>

                            {/* Book Now Button */}
                            <Button className=" text-center w-full py-3 mt-4 " >
                                <p>Book Now</p>
                            </Button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Itinerary;