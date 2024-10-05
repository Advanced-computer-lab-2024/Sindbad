import { Star, MapPin, CalendarDays } from "lucide-react";
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

const activity = {
    name: "Historical City Tour",
    dateTime: new Date("2024-10-15T09:00:00"), // Example date and time
    location: "Old Town Square, City Center",
    price: { min: 50, max: 100 }, // Example price range (could also be a single number like 75)
    category: "City day tour", // Example ObjectId for Category
    tags: [
      "Sight-seeing", // Example ObjectId for Tag 1
      "Family-friendly",
      "Food-included" // Example ObjectId for Tag 2
    ],
    discounts: 20, // 20% discount
    isBookingOpen: true,
    creatorId: "652a86b0b06d9c3240a1d30e", // Example ObjectId for Advertiser
    headCount: 35, // 35 people booked
    rating: 4.5, // Example rating
  };
  

function Activity(){
    
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

                        {/*Supported Languages*/}
                        <div className="my-6">
                            <div className="flex flex-wrap gap-2">
                                {activity.tags.map((lang) => (
                                    <div 
                                    key={lang} 
                                    className="px-3 py-1 bg-primary-950 rounded-full border cursor-default">
                                        {lang}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/**/}
                        <div className=" flex flex-wrap gap-4">
                            
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