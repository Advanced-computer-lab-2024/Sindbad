import { Star, MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, act } from "react";
import { getTag } from "@/services/TagApiHandler";
import axios from "axios";

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
  
  const activity = {
    _id: "66f7049e75a75a8aefc8ccc1",
    name: "Yoga Class",
    dateTime: new Date("2024-09-30T10:00:00.000Z"), // Date and time for the activity
    location: "Community Center", // Location of the activity
    price: { 
      min: 10, 
      max: 20 // Price range for the activity
    },
    category: "66f6b76979faeed4f154facb", // Category reference (ObjectId)
    tags: [
      "66faa4f7e6afc4ffe0dcdef6",  // Tags (Array of ObjectIds)
    ],
    discounts: 15, // Discount on the activity
    isBookingOpen: true, // Is booking open for the activity
    creatorId: "66f823447b0fe45d3c6d3768", // Creator (ObjectId)
    headCount: 0, // Current headcount
    __v: 0 // Mongoose version key
  };

function Activity(){

    const [fetchedTags, setFetchedTags] = useState([]);
    
  
    const getTagById = async (tag) => {
        const response = await getTag(tag);

        if (response.error) {
            console.error(response.message);
        } else {
            return response
        }
    };
    useEffect(() => {
        const fetchTags = async () => {
            if (activity.tags && activity.tags.length !== 0) {
                // Use Promise.all to wait for all fetches to complete
                const tagPromises = activity.tags.map(tag => getTagById(tag));
                
                const resolvedTags = await Promise.all(tagPromises);
                // Filter out any null values (from errors) and set state
                setFetchedTags(resolvedTags.filter(tag => tag !== null));
            }
        };
        fetchTags();
    }, []);
    
    return(
        <div className="min-h-screen flex justify-center items-center bg-primary-950">
            <div className="w-full max-w-7xl px-8 py-8 bg-primary-900 shadow-lg rounded-md">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
                    <div>
                        {/*Title Section*/}
                        <div className="my-4">
                            <h1 className="text-4xl font-bol">{activity.name}</h1>
                            <p className="text-light text-lg">{activity.category}</p>
                        

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
                            <div className="border w-full my-4"></div>
                        </div>
                        {/*description*/}
                        <div className= "text-light">
                            <p>
                                With the history going back to 420 B.C., this tour includes sights throughout history. From the local alley drug dealer to the Queen's castle.
                            </p>
                        </div>
                        {/*Tags*/}
                        <div className="my-6">
                            <div className="flex flex-wrap gap-2">
                                {fetchedTags.map((tags) => (
                                    <div 
                                    key={tags._id} 
                                    className="px-3 py-1 bg-primary-950 rounded-full border cursor-default text-light">
                                        {tags.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    
                    {/*right section*/}
                    <div className="grid grid-cols-2 col-span-2 gap-1 bg-primary-700 rounded-md h-96 p-6">
                        <div className=" m-2">
                            <div className="bg-light h-2/3 rounded-lg m-2"></div>
                            <div className="flex flex-row my-4">
                                <MapPin className=" w-6 h-6 mx-2 fill-primary-900 text-light stroke-1" />
                                <span className="text-lg font-light">{activity.location}</span>
                            </div>
                            <div className="flex flex-row my-4">
                                <CalendarDays className=" w-6 h-6 mx-2 fill-primary-900 text-light stroke-1" />
                                <span className="text-lg font-light"> {new Date(activity.dateTime).toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <div className=" m-4 text-end">
                            {typeof activity.price === 'object' ? (
                                <p className="text-3xl font-semibold ">
                                {activity.price.min}
                                <span className="text-xl font-medium p-2">L.E.</span>
                                <span className=" p-2">-</span> 
                                {activity.price.max}
                                <span className="text-xl font-medium p-2">L.E.</span>
                                </p>
                            ) : (
                                // If it's a single price (number)
                                <p className="text-3xl font-semibold">
                                ~{activity.price}
                                <span className="text-xl font-medium p-2">L.E.</span>
                                </p>
                            )}

                            <p className="text-md">
                                <span className="text-secondary p-1 font-semibold">{activity.discounts}%</span>
                                 discount available by Sindbad</p>  
                            
                            <div className="border w-full m-4"></div>  
                            <div className="h-full">
                                { activity.isBookingOpen? (
                                    <div className="text-center items-center">
                                        <Button variant="rounded" className=" bg-primary-900  w-full p-6 my-8">View Bookings</Button>
                                        <p>{activity.headCount} users of sindbad have already registerd!</p>
                                    </div>
                                ):(
                                    <div className="text-center align-middle">
                                        <p className="self-center text-2xl font-light relative top-16"> No available bookings</p>
                                    </div>
                                )}
                            </div>

                        </div>
                        

                    </div>
                </div>
                
            </div>
        </div>
    )

}export default Activity;