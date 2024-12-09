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
**The Landing/Login Page:**
![Screenshot 2024-12-09 021621](https://github.com/user-attachments/assets/aa167622-fa0a-44fc-8644-40dfdd5ccbf7)

**Profile:**
![Screenshot 2024-12-09 022959](https://github.com/user-attachments/assets/a7c9e4e5-218a-4a14-9751-7ed5b80d83cb)

**Cart:**
![Screenshot 2024-12-09 022517](https://github.com/user-attachments/assets/dd278112-515c-4334-addf-ad7b852ef3dc)

**Site:**
![Screenshot 2024-12-09 021823](https://github.com/user-attachments/assets/d6ddef3a-3444-4284-b4bf-3da1d315be8e)

**Revenue:**
![Screenshot 2024-12-09 022018](https://github.com/user-attachments/assets/8c9da030-e708-481f-b9e1-9b323aeed3a4)






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
- create a cloudinary account
- create a stripe account

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



## API References
Can view the APIs in the following link
 [API documentation](https://github.com/Advanced-computer-lab-2024/Sindbad/blob/develop/API.md)


## Tests
Testing is done using postman, you can check the tests in the following link
 [API documentation](https://github.com/Advanced-computer-lab-2024/Sindbad/blob/develop/API.md)

## How to Use
1. Start the development server: 

Open a new terminal
``` bash 
nodemon app.js
``` 
In another terminal
``` bash 
npm run dev
```

Now, both the frontend and backend servers should be running. You can access the application in your browser at
In another terminal
``` bash  
http://localhost:5173/
```

2. Navigate According to the user type

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

<p align="center"> Apache License</p>
<p align="center">Version 2.0, January 2004</p>

<p align="center">http://www.apache.org/licenses/ </p>

<p align="center">TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION </p>

1.**Definitions**

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

2.**Grant of Copyright License.** 
Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3.**Grant of Patent License.** 
Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

4.**Redistribution.** 
You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:

a. You must give any other recipients of the Work or Derivative Works a copy of this License; and

b. You must cause any modified files to carry prominent notices stating that You changed the files; and

c. You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and

d. If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.

You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.

5.**Submission of Contributions.** Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

6.**Trademarks.** This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

7.**Disclaimer of Warranty.** Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

8.**Limitation of Liability.** In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

9.**Accepting Warranty or Additional Liability.** While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.


END OF TERMS AND CONDITIONS

```bash
        Copyright 2024 Sindbad

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
## Contributers






