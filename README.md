# SDC-Products-API

**Overview**
The SDC Products API project involved setting up an Express server to connect to a PostgreSQL database. The Sequelize ORM was used to connect and query the server. Specifically, this project involved providing data regarding Atelier apparel products. Different databases were considered for the project, including MongoDB, mySQL, and PostgreSQL. PostgreSQL is the working database for the current project. The goal of the project is to optimize queries to handle large throughput while maintaining low latency and error rates.

### **Table of Contents**
- [Setup](#setup)
- [Description](#description)
  - [Overview](#overview)
  - [Related Products](#related-products)
  - [Questions and Answers](#questions-and-answers)
  - [Ratings and Reviews](#ratings-and-reviews)

### **Setup**
- In order to setup the repo, first use your terminal navigate to the directory you will clone this repo in.
- Run the following command in your terminal
-- `git clone "URL-of-this-repo"`
-- You can get the URL of this repo by clicking on the green "< > Code" button above and copying the HTTPS url.
- Navigate into the cloned directory from within the terminal
- Make sure you have npm and/or Node.js installed before moving forward
- Run this command
-- `npm install`

- In order to start the server, run the following commands
-- `npm run server-dev`

- To connect the server to your local PostgreSQL database, you'll need to create a .env file with the following filled out

```
DB_HOST=(PUT HOST NAME HERE AS A STRING)
SQLPORT = (PUT PORT FOR POSTGRESQL HERE)
SQLUSERNAME = (PUT USERNAME FOR POSTGRESQL HERE AS A STRING)
SQLPASSWORD = (PUT PASSWORD FOR POSTGRESQL HERE AS A STRING)
DATABASE = (PUT DATABASE NAME HERE AS A STRING)
```

### **Description**


![](./previews/c.gif)

Project Creators - Xinhuang Liu, Sean Jung, John Novakowski