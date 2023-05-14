# Blog Full Stack Project

## Project - Blog Application

## technology - Node | Express | SQL | MySQL

### Project Link ==> https://threedshopmernproject.onrender.com

### Overview - Simple blog app, where user can write,edit,delete blog

## FEATURE I - User

### Models

- User Model

```yaml
{
  username: { string, mandatory },
  email: { string, mandatory, valid email, unique },
  password: { string, mandatory, valid password },
  createdAt: { timestamp },
  updatedAt: { timestamp },
}
```

## User APIs

### POST /register

- Create a user document from request body.
- Save password in encrypted format. (use bcrypt-js)
- **Response format**

```yaml
{
  "message": "User registration successfull",
  "data":
    {
      "name": "bruce",
      "email": "ash@gmail.com",
      "role": "user",
      "_id": "643c2495e44153efbabecb8f",
      "createdAt": "2023-04-16T16:38:45.110Z",
      "updatedAt": "2023-04-16T16:38:45.110Z",
    },
}
```

### POST /login

- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
  > **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.
- **Response format**

```yaml
{
  "message": "Login Success",
  "data":
    {
      "_id": "6433e4e016a27dfe09b9337f",
      "name": "po",
      "email": "po@gmail.com",
      "createdAt": "2023-04-10T10:28:48.448Z",
      "updatedAt": "2023-04-11T13:15:56.868Z",
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMzZTRlMDE2YTI3ZGZlMDliOTMzN2YiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODE1Mzk3NjYsImV4cCI6MTY4MTYyNjE2Nn0.6y9aKeZMKtRrsqLW9v-1T6IlkcDMaybTC3D-fXgyj5M",
}
```

## FEATTURE II - Files

### Models

- Posts Model

```yaml
{
  {
    title: { type: String, require: true, lowercase: true },
    description: { type: String, require: true },
    img: { type: String, require: true },
    cat: { type: Number, require: true, default: 0 },
    uid: { type: String, require: true },
  },
  { timestamps: true },
}
```

## Posts API (authentication required / only login user can create, update and delete file)

### POST

- Create a post document from request body.
- Upload file image to S3 bucket and save image public url in document.
- **Response format**

```yaml
{
  "message": "file Created successfully",
  "data":
    {
      "title": "post",
      "description": "lorem",

      "img": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
    },
}
```

### GET /

- Returns all posts in the collection.

  - **Filters**
    - Size (The key for this filter will be 'category')

- **Response format**

```yaml

{
    "data": [
        {
            "_id": "1",
            "title": "post",
            "description": "lorem",
            "img": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",

        },



}

```

### GET /:Id

- Returns post details by id
- **Response format**

  ```yaml
  {
    "data":
      {
        "_id": "1",
        "title": "post",
        "description": "lorem",
        "img": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
      },
  }
  ```

### PUT /:Id

- Updates a file by changing at least one or all fields
- Check if the fileId exists.
- **Response format**

```yaml
{
  "message": "file Updated successfully",
  "data":
    {
      "title": "post1",
      "description": "lorem1",
      "img": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
    },
}
```

### DELETE /:Id

- Deletes a post by file id if it's not already deleted
- **Response format**

```yaml
{ "message": "file Deleted successfully" }
```
