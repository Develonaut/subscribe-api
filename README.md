# Express & ES6 REST API

Straight forward REST API with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

## Getting Started

# Install dependencies

npm install

# Start development live-reload server

PORT=8080 npm run dev

# Start production server:

PORT=8080 npm start

## Docker Support

# Build your docker

docker build -t es6/api-service .

# ^ ^ ^

# tag tag name Dockerfile location

# run your docker

docker run -p 8080:8080 es6/api-service

# ^ ^

# bind the port container tag

# to your host

# machine port
