# Real-time Wait Time Monitor for College Campus Services using Cloud-powered NoSQL Database
##### *CS 4440 final project by Jie Lyu and Junyan Mao*

### Database Setup



### Web App Setup
1. Open a command line window and cd into the QueueCheckWeb folder from the root folder
```bash
cd QueueCheckWeb
```

2. Install dependencies through npm
```bash
npm install
```

3. Create a .env file in the project folder
```bash
touch .env
```

4. Open the .env file with your favorite editor (in this case VSCode)
```bash
code .env
```

5. Added your AWS credentials to the .env file and save it
```
AWS_ACCESS_KEY_ID=YOUR_AWS_KEY_ID_HERE
AWS_SECRET_ACCESS_KEY=YOUR_AWS_ACCESS_KEY_HERE
```

6. Run the Web App
```bash
npm run devStart
```
4. Open a web browser and navigate to
```web
localhost:3000
```

### Programming Languages and Libraries
- Node.js: "v13.5.0" (for the Web App)
  - @aws-sdk/client-dynamodb": "^3.13.1"
  - aws-sdk: "^2.897.0"
  - express: "^4.17.1"
  - pug: "^3.0.2"
  - dotenv: "^8.2.0"
  - nodemon: "^2.0.7"
  - md5: "^2.3.0"
  - microtime: "^3.0.0"

### Files Created by Us
```bash
/demo
/lambda
/QueueCheck/QueueCheck.xcworkspace
/QueueCheckWeb/
```