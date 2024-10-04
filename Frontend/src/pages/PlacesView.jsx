import { Star, MapPin } from "lucide-react";


const PlaceType = ["Religious site", "Historic site", "Museum"];

function getRandomRating(){
    {/*return (Math.floor(Math.random() * 6));*/}
    return (Math.round(Math.random() * 10) / 2).toFixed(1);
}

function getRandomReviews(){
    return Math.floor(Math.random()* 1000) + 1;
}

function getRandomPlace(){
    const randomIndex = Math.floor(Math.random() * PlaceType.length);
    return PlaceType[randomIndex];
}

const reviews = (getRandomReviews());
const rating = Math.floor(getRandomRating());
const place = (getRandomPlace());
const fullStars = rating;
const emptyStar = 5 - fullStars;
const isAccessible = true; //open to public

const ticketPrices = [
    { type: "adult", price:120},
    { type: "child", price:60},
    { type: "senior", price:0},
    { currency : "USD"}
];


function Place(){
    return(
    <div className="min-h-screen h-full flex justify-center items-center bg-primary-950">
        <div className="w-full max-w-7xl px-8 py-8 bg-primary-900 shadow-lg rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
                    <div>
                        {/*Title Section*/}
                        <div className="my-4">
                            <h1 className="text-4xl font-bol">Place Name</h1>

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
                                <div className="border-2 h-0 w-0 rounded-full self-center"></div>
                                <p className="text-light text-lg">{place}</p>
                            </div>
                            <p> 11:30am - 5:00 pm</p>
                        </div>
                        
                        <p className="text-light">
                            Nestled atop a rugged hill, this ancient fortress once guarded a thriving medieval town. 
                            Its crumbling stone walls and towering arches whisper stories of battles fought and lives lived centuries ago. 
                            Today, the site offers breathtaking views of the surrounding valley, transporting visitors back in time.
                        </p>

                        {/*preference tags*/}
                        <div className="my-6">
                            <div className="flex flex-wrap gap-2">
                                {["Shopping", "Family-friendly"].map((lang) => (
                                    <div 
                                    key={lang} 
                                    className="px-3 py-1 bg-primary-950 rounded-full border cursor-default">
                                        {lang}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    
                    {/*Picture placeholders*/}
                    <div className="grid grid-cols-2 col-span-2 gap-1">
                        <div className="bg-light h-full rounded-lg "></div>
                        <div className="">
                            <div className="bg-light h-1/2 rounded-lg mb-px "></div>
                            <div className="bg-light h-1/2 rounded-lg "></div>
                        </div>
                    </div>
                </div>
                <div className=" border-y mt-8 mx-8"></div>

                <div className="grid grid-cols-2 grid-rows gap-8 p-8">
                    <div className="">
                        <div className="  bg-light h-64 w-3/4 rounded-lg m-4"></div>
                        <div className="flex flex-rows">
                            <MapPin className="border-2 rounded-full p-1 w-8 h-8 relative mx-2"/>
                            <p className=" text-lg m-2">Detailed Location Description</p>
                        </div>
                    </div>
                    <div className=" bg-primary-700 rounded-lg">
                        {isAccessible? (
                            <div>
                                { ticketPrices.length ==2? (
                                    <div className="w-full h-full">
                                        <div className="flex justify-between bg-primary-900 border rounded-lg m-4 mx-8 p-4">
                                            <p className="text-xl font-semibold">Basic ticket</p>
                                            <div className=" text-end">
                                                <span className="text-xl px-1 font-semibold">{ticketPrices[0].price}</span>
                                                <span className="text-sm">{ticketPrices[ticketPrices.length-1].currency}</span>
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <div className="w-full h-full justify-around">
                                        {ticketPrices
                                            .filter(ticket => ticket.type && ticket.price !== undefined) // Filter out non-ticket objects
                                            .map((ticket, index) => (
                                            <div key={index} className="flex flex-col justify-between bg-primary-900 border rounded-lg p-4 m-4">
                                                <p className="text-xl font-semibold">{ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)} ticket</p>
                                                <div className="text-end">
                                                {ticket.price === 0 ? (
                                                    <span className="text-xl px-1 font-semibold">Free</span>
                                                ) : (
                                                    <>
                                                    <span className="text-xl px-1 font-semibold">{ticket.price}</span>
                                                    <span className="text-sm">{ticketPrices[ticketPrices.length - 1].currency}</span> {/* Currency from the last object */}
                                                    </>
                                                )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ):(
                            <div className=" flex justify-center items-center h-full w-ful rounded-lg">
                                <p className=" text-2xl self-center">No available bookings</p>
                            </div>
                        )}
                    </div>
                </div>
        </div>
        
    </div>
    )
}export default Place;