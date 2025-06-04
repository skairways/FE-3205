## Features

- **URL-Shortener**: Returns 6 char shortened version of provided URL.
- **Short-URL-info**: Returns shortURL click count, created time and original URL.

## Tech Stack

- React, Typescript, Docker

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd FE-3205
   ```

2. **Install**

   ```bash
   npm install
   ```

   ```bash
   docker build -t fe-3205 .
   ```

3. **Run the app**

   ```bash
   npm run start
   http://localhost:5173/
   ```

   ```bash
   docker run -p 8080:80 fe-3205
   http://localhost:8080/
   ```
