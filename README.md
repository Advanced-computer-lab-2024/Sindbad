# Sindbad
Sindbad is a comprehensive travel management platform that allows users to plan, book, and manage all aspects of their trips from start to finish.

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


## Tech/Framework Used
This project is developed using the MERN stack, a popular technology stack for building full-stack web applications. The MERN stack includes:

- **MongoDB:** NoSQL database for storing and retrieving data.
- **Express.js:** A web application framework for building our API and handling HTTP requests.
- **React:** A JavaScript library for building UI.
- **Node.js:** A runtime environment for executing JavaScript code on the server.
- **More Frameworks**:
  - **Tailwind.js**
  - **Authentication**: Passport.js
  - **API Integration**: Amadeus API for hotel and flight bookings, Stripe for Payment and cloudinary to store photos externally.
  - **Testing**: Postman.

## Features
- User authentication and authorization
- CRUD operations for activities, itineraries, products, and more
- Integration with Amadeus API for hotel bookings
- Real-time notifications and updates
- Comprehensive admin dashboard
- Data visualization and reporting
- 
### Secure Payment Options
**Credit Card Payments:** Seamless and secure credit card payments for medicines are supported, ensuring a hassle-free transaction experience for patients.

**Wallet Integration:** Patients have the option to pay for medicine using their wallet balance, providing a convenient and quick payment method.

## Code Examples
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
1. Clone the repository: `git clone https://github.com/yourusername/sindbad.git`
2. Navigate to the project directory: `cd sindbad`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file and add necessary configurations
5. Start the development server: `npm run dev`

## API References


###

 >User Routes
- `POST /user/register`: Register a new user
- `POST /user/login`: Login a user
- `GET /user/:id`: Get user details

> Activity Routes
- `POST /activity`: Create a new activity
- `GET /activity/:id`: Get activity details
- `PUT /activity/:id`: Update activity
- `DELETE /activity/:id`: Delete activity

> Itinerary Routes
- `POST /itinerary`: Create a new itinerary
- `GET /itinerary/:id`: Get itinerary details
- `PUT /itinerary/:id`: Update itinerary
- `DELETE /itinerary/:id`: Delete itinerary

> Product Routes
- `POST /product`: Create a new product
- `GET /product/:id`: Get product details
- `PUT /product/:id`: Update product
- `DELETE /product/:id`: Delete product

> Sales Routes
- `GET /sale/my-product-sales/:creatorId`: Get product sales by creator ID
- `GET /sale/my-sales/:creatorId/:type`: Get sales by creator ID and type

## Tests
To run tests using Postman:
1. Import the Postman collection from the `tests` directory.
2. Run the collection to execute the tests.

## How to Use
1. Register or login to the platform.
2. Navigate through the dashboard to manage activities, itineraries, and products.
3. Use the booking features to book hotels and other services.
4. View reports and analytics in the admin dashboard.

## Contribute
Contributions are always welcome!

Guidelines for contributing to the project:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your branch.
4. Create a pull request with a detailed description of your changes.

## Credits
- emad video for authentication
- documentation for every external api

## License
This project is licensed under the Apache 2.0 License.






