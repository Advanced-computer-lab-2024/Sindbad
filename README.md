# Sindbad
Sindbad is a comprehensive travel management platform that allows users to plan, book, and manage all aspects of their trips from start to finish.


- [Motivation](#motivation)
- [Build Status](#build-status)
- [Code Style](#code-style)
- [Screenshots](#screenshots)
- [Tech/Framework Used](#tech/framework-used)
- [Features](#features)
- [Code Examples](#code-examples)
- [Installation](#installation)
- [API Refrences](#API-refrences)
- [Tests](#tests)
- [How to Use](#how-to-use)
- [Contribute](#contribute)
- [Credits](#credits)
- [License](#license)



## Motivation
Sindbad is designed to provide a comprehensive platform for managing and booking all travel-related services, including activities, itineraries, products, and more—all in one place. The motivation behind Sindbad is to create a seamless, efficient experience by offering everything you need for your trip, from start to finish, on a single platform. Whether you're planning, booking, or managing your travels, Sindbad aims to streamline the entire process for both users and service providers.

## Build Status
- Project is in development stage
- The current build status of the project is stable. 
- More automated tests should be added in the future.


## Code Style

**Indentation:** Our code is indented with spaces 2.

**Naming Conventions:** 
- Variables and functions follow camelCase naming convention
- React components follow PascalCase naming convention 
- mongoDB collections use the plural nouns namins convention

**Comments:** Use meaningful comments sparingly to explain complex logic or important details.

**Variable Declaration:** Only use let or const to declare variables.

**Design Pattern:**
The project follows the MVC design pattern that divide the related program logic into three interconnected elements. The Files in the backend was divided into the M (models) where the schema of the models exist which represent the core of the database , the C (controller) where the functions needed for the routes exists and the V (views) the view in MERN stack is represented by the react frontend server.

## Screenshots
![Screenshot 2024-12-06 003547](https://github.com/user-attachments/assets/4a1eb43d-c37c-4147-8908-dc13ab169a38)


## Tech/Framework Used
This project is developed using the MERN stack, a popular technology stack for building full-stack web applications. The MERN stack includes:

- **MongoDB:** NoSQL database for storing and retrieving data.
- **Express.js:** A web application framework for building our API and handling HTTP requests.
- **React:** A JavaScript library for building UI.
- **Node.js:** A runtime environment for executing JavaScript code on the server.
- **More Frameworks**:
  - **Tailwind.js**
  - **Authentication**: Passport.js
  - **API Integration**: Amadeus API for hotel and flight bookings, nodemailer for sending emails,Stripe for Payment and cloudinary to store photos externally.
  - **Testing**: Postman.

## Features
- **User authentication and authorization**: To ensure secure access to the system.
- **Trip Management**: Users can manage their entire trip from start till end including accomodation, transportation and booking of activities and itineraries.
- **Product and Services Management:** Provide an easy-to-use interface for managing product and service listings, including the ability to create, read, update, and delete offerings. This includes features tailored for sellers to manage product availability and for tour guides and advertisers to schedule services, ensuring streamlined operations.
- **Verified Historical Sites and Museums:** To ensure authenticity and credibility, our platform allows only Tourism Governors to add historical sites and museums. This feature guarantees that all listed locations are Verified by authorized personnel and that only genuine historical and cultural landmarks are included.

- **Rating system:** Our platform includes a comprehensive Rating System to enhance transparency and ensure quality. Users can:
Rate Events, Products or Tour Guides to Share feedback on events to help others choose the best experiences and make informed decisions which fosters a community of trust and quality.

- **Loyalty Points System:** Our website features an integrated Loyalty Points System designed to reward tourists for their participation by earning loyalty points each time they pay for an event or itinerary through our platform and then  the accumulated points can be redeemed for cash, which is added directly to their wallet for future use.
- **Notifications**: Users Receive Real-time notifications and updates on the app and on email for future booked events, for any changes to their posts.
- **Admin dashboard**: Comprehensive admin dashboard to maintain the integrity and features of the website, manage user accounts, products and services.
- **Data Visualization and Reporting:** Access comprehensive sales reports with detailed revenue insights.


- **Payment Options**
  - **Credit Card Payments:** Seamless and secure credit card payments for users to book services or pay for products are supported, ensuring a hassle-free transaction experience for users.
  - **Cash on Delivery Payments** 
  - **Wallet Integration:** users have the option to pay for their booked services or products using their wallet balance, providing a convenient and quick payment method.


## Code Examples
### Starting the server
```javascript
const express = require("express");
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    })
);

// Connect to MongoDB, and prevent connecting to the database during testing
if (process.env.NODE_ENV !== "test") {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Database connection error:", err);
        });
}
// Start the server
let PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === "test") {
    PORT = 0; // Finds first available port, to prevent conflicts when running test suites in parallel
}
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```
### Example of a Route Definition
```javascript
app.post(
    "/seller/upload/:id",
    upload.fields([
        { name: "idCardImage", maxCount: 1 },
        { name: "taxationRegistryCardImage", maxCount: 1 },
    ]),
    SellerController.addSellerDocuments
);
```

### Example of a React Component
```jsx
function TotalRevenue({ data }) {
  const currency = useCurrency();
  let chartData = data?.map((item) => ({
    date: new Date(item.createdAt).getTime(),
    revenue: item.revenue,
  }));
  let totalSum = calculateTotalSum(chartData);
  let trend = calculateRevenueTrend(chartData);
  chartData = groupByDay(chartData);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" scale="time" type="number" />
            <YAxis />
            <Area dataKey="revenue" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

## Installation
Steps to install the project:
1. Clone the repository: 
``` bash 
git clone https://github.com/Advanced-computer-lab-2024/Sindbad.git
```
2. Navigate to the project directory: 
``` bash 
cd sindbad
```

3. Install dependencies: 
- **For the backend**
``` bash 
cd Backend
npm install
```

- **For the frontend**

To first navigate back to the sindbad folder
``` bash 
cd ..
```
Then to install frontend dependencies
``` bash 
cd Frontend
npm install
```

4. Set up environment variables: 

To run this project, you will need to add the following
>create the following accounts
- create a mongoDB account and create a cluster
- create an amadeus account and create a new self service app
- For the website's gmail account, enable 2 Factor Authentication and create a new App password
- create a cloudinary account?
- create a stripe account?
- authentication stuff?

>Adding the .env files to the project
- Create a `.env` file in the **backend** folder and add the following necessary configurations
```bash
MONGO_URI='mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority' //Mongo URI of your cluster

AMADEUS_CLIENT_ID='yourAPIKey' //API key of the self service app
AMADEUS_CLIENT_SECRET='yourAPISecret' //API secret of the self service app

CLOUDINARY_CLOUD_NAME='yourCloudinaryName'
CLOUDINARY_API_KEY='yourCloudinaryAPIKey'
CLOUDINARY_API_SECRET='yourAPISecret'

GMAIL='email@gmail.com' //the gmail to send email notifications from
GMAILPASSWORD='AppPassword' //the gmail app password

STRIPE_SECRET_KEY='yourStripeSecretKey'
FRONTEND_DOMAIN='http://localhost:5173'
BACKEND_DOMAIN='http://localhost:3000'
STRIPE_ENDPOINT_SECRET='yourStripeEndpointSecret'

ACCESS_TOKEN_SECRET='a6a0a0b7136d22e0dbfaf29369a23d6a7ae33aa1c369b000e1e51d8f441e198bd6d902a079dd774dcebfbe0230fb0d956526ceb2ef4360b8f0b0f0817fcd7673'
REFRESH_TOKEN_SECRET='a402bf504889fc2f10f451ebb8369719defe02c6c2c8e4d10a3a14d56e4dadf14f869d75d6502b5d14032d87acd9e3cd0b14dceb9ec8a911aa2221ee9cccd27a'
```
- Create a `.env` file in the **Frontend** folder and add the following necessary configurations
``` bash
VITE_BASE_URL='http://localhost:3000'
VITE_GOOGLE_MAPS_API_KEY='apikey'          //add your google maps API key
VITE_AMADEUS_CLIENT_ID='yourAPIKey'        //API key of the self service app
VITE_AMADEUS_CLIENT_SECRET='yourAPISecret' //API secret of the self service app
```

5. Start the development server: 

Open a new terminal
``` bash 
nodemon app.js
``` 
In another terminal
``` bash 
npm run dev
```

## API References
Can view the APIs in the following link
 [API documentation](https://github.com/Advanced-computer-lab-2024/Sindbad/blob/develop/API.md)


## Tests
Testing is done using postman, you can check the tests in the following link
 [API documentation](https://github.com/Advanced-computer-lab-2024/Sindbad/blob/develop/API.md)

## How to Use
Since there are different types of users that can use the website,we have curated the platform to provide a tailored experience for each user type:

**As a Tourist**
1. Register or login to the platform.
2. Navigate through the dashboard to view available activities, itineraries, products, sites, hotel, flight and transportation bookings
3. Use the booking features to book hotels and other services.
4. Navigate to the wishlist to view the saved products.
5. Navigate to the cart to checkout the products in it.
6. Navigate to the profile to view all the personal information, wallet, Loyalty Points, booked services, bookmarked events, event history and to also report an issue.

**As a TourGuide/Tourism Governer**
1. Register or login to the platform.
2. Navigate through the dashboard to view available activities, itineraries and sites.
3. Navigate to the revenue to access comprehensive sales reports with detailed revenue insights.
4. Navigate to the profile to view all the personal information. For the TourGuide can also view ratings and manage itineraries and for the tourism governer can manage sites and add tags.

**As a Advertiser**
1. Register or login to the platform.
2. Navigate through the dashboard to view available activities, itineraries, sites and transportation.
3. Navigate to the revenue to access comprehensive sales reports with detailed revenue insights.
4. Navigate to the profile to view all the personal information and manage activities.

**As a Admin**
1. Register or login to the platform.
2. Navigate through the dashboard to view available activities, itineraries, products, sites, transportation.
3. Navigate to the revenue management to manage users, complaints, tags, categories and promocodes.
4. Navigate to the revenue to to access comprehensive sales reports with detailed revenue insights.
5. Navigate to the profile to view all all the personal information and manage products.

**As a Seller**
1. Register or login to the platform.
2. Navigate through the dashboard to view available activities, itineraries, products and sites.
3. Navigate to the revenue to to access comprehensive sales reports with detailed revenue insights.
4. Navigate to the profile to view all all the personal information and manage products.

## Contribute
Contributions for bug fixes or suggesting enhancements are always welcome!

Guidelines for contributing to the project:
1. **Fork the repository:** This creates your own copy of the project where you can make your changes.
2. **Clone your fork:** This downloads the repository to your local machine for editing. The command is 
```bash
git clone https://github.com/your-username/repository-name.git
```
3. Create a new branch for your feature or bugfix.
```bash
 git checkout -b branch-name.
 ```
3. Commit your changes and push to your branch.
```bash
git add .
git commit -m "Commit message"
git push origin branch-name
```
4. Create a pull request with a detailed description of your changes, include as much details as possible.

## Credits
- [README template](https://www.mygreatlearning.com/blog/readme-file/)
- [Sending Emails in Node.js](https://youtu.be/klDTBiW6iiM?si=u-gJWy1LuoR7Mvab)
- [Login Authentication](https://www.youtube.com/watch?v=PDJm1Hwx0oo&ab_channel=DaveGray)
- [REST API](https://youtu.be/fgTGADljAeg?si=_8386HwIs8WPIA7C)
- [Amadeus Flight Booking Documentation](https://developers.amadeus.com/self-service/category/flights/api-doc/flight-offers-search)
- [Amadeus Hotel Booking Documentation](https://developers.amadeus.com/blog/react-hotel-booking-app-part1)
- [Stripe Documentation](https://docs.stripe.com/api)
- [Cloudinary Documentation](https://cloudinary.com/documentation/image_upload_api_reference)
- [shadcn Documentation](https://ui.shadcn.com/docs)
- [zod Documentation](https://zod.dev/)
- [react-hook-form Documentation](https://react-hook-form.com/docs)
- [tanstack Documentation](https://tanstack.com/table/latest)
## License
This project is licensed under the Apache 2.0 License.






