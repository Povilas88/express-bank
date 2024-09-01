# EXPRESS-BANK

_express js project_

<br>

## 🌟 About

This project is for educational purposes only.

Site published at: https://github.com/Povilas88/express-bank

## 🎯 Project features/goals

-   Backend
-   Express js

## 🧰 Getting Started

### 💻 Prerequisites

Node.js - _download and install_

```
https://nodejs.org
```

Git - _download and install_

```
https://git-scm.com
```

### 🏃 Run locally

Would like to run this project locally? Open terminal and follow these steps:

1. Clone the repo
    ```sh
    git clone https://github.com/Povilas88/express-bank .
    ```
2. Install NPM packages
    ```sh
    npm i
    ```
    or
    ```sh
    npm install
    ```
3. Run the server
    ```sh
    npm run dev
    ```
4. Download and install
    ```sh
    https://insomnia.rest/download
    ```

## 🧾 Instructions

1. Download and Install Insomnia: [link](https://insomnia.rest/download).

2. Create a New Request: Open Insomnia and click on the "New Request" button. <br>
   You can name your request and select the HTTP method (GET, POST, PUT, DELETE, etc.) based on your API requirements.

3. Enter the API Endpoint: In the request URL field, input the endpoint you wish to test.<br>
   Ensure that the URL is correct and includes any necessary parameters.

4. Send the Request: Click the "Send" button to execute the request. <br>
   Insomnia will display the response, including status codes, headers, and body content, <br> allowing you to analyze the results.

5. Don't forget to use JSON if required to send body requests. <br> Select Body -> JSON. Ex. {"key": "value"}

## 🗄 Working API endpoints

-   /api/account

    -   POST
        {
        "name": "Name",
        "surname": "Surname",
        "birthDate": "YYYY-MM-DD"
        }
    -   PUT /api/account/name-surname
        {
        "newName": "Name",
        "newSurname": "Surname",
        "newBirthDate": "YYYY-MM-DD"
        }
    -   GET /api/account/name-surname
    -   DELETE /api/account/name-surname

-   /api/account/name-surname/name (Ex. /api/account/john-doe/name)

    -   GET
    -   PUT
        {
        "newName": "Name"
        }

-   /api/account/name-surname/surname (Ex. /api/account/john-doe/surname)
    -   GET
    -   PUT
        {
        "newSurname": "Surname"
        }
-   /api/account/name-surname/dob (Ex. /api/account/john-doe/dob)

    -   GET
    -   PUT
        {
        "newBirthDate": "YYYY-MM-DD"
        }

-   /api/deposit/name-surname (Ex. /api/deposit/john-doe)
    -   POST
        {
        "amount": 800
        }
-   /api/withdrawal/name-surname (Ex. /api/withdrawal/john-doe)
    -   POST
        {
        "amount": 500
        }
-   /api/transfer/name-surname/name-surname (Ex. /api/transfer/john-doe/bill-wall) <br>
    (From: name-surname / To: name-surname)
    -   POST
        {
        "amount": 500.70
        }

## 🎅 Authors

Povilas: [Github](https://github.com/Povilas88)
