# Ikas backend case 1:

Steps to run this project:

1. Run `npm i` command
2. Setup database, settings inside `ormconfig.json` file
3. Run `npm start` command
4- http://localhost:4000/graphql . By going to url, you will be able to perform the following operations.
   
# 1- Register User:
mutation{register(user: {
        name:"AA",
        surname:"BB",
        email:"a@gmail.com",
        password:"q1"
      }){id name surname email}
    }

The email field must match the email type and must be unique.
User information is returned as the return value. If there is an error, it will return the error.

After registering, you must log in.

# 2- Login User:
mutation{login(loginUser:{
    email:"a@gmail.com",
    password:"q1"
  })
  {
    accessToken
    refreshToken
  }
}

AccessToken and RefreshToken are returned as return values. AccessToken was created for 10 minutes. RefreshToken was created for 1 day. Its settings can be changed in authenticationUtils.ts.
AccessToken is used after logging into the system. When you expire after 10 minutes, you can get new access tokens by running the refreshToken instead of re-logging in. (RefreshToken will be shown in the future)

The steps after the log are user specific operations. Therefore, accessToken should be used for authorization in all of them.
You must add accessToken to headers like this {"authorization": "Bearer ...ACCESSTOKEN..."}

# 3- AddProduct
mutation{addProduct(product:
    {
      name:"product1",
      price:1,
      barcode:"b1",
      quantity:11
    }
)}

A boolean value is returned as the return value. If there is an error, it returns the error.

# 4- UpdateProduct
mutation{updateProduct(id: 1, input:
  {
  name:"product1 Updated",
  price:1,
  barcode:"b1",
  quantity:11
}{id name quantity barcode price}
)}

You can only update your own product. If you enter a productId that is not yours, you will get an error.

# 5- GetProductDetails
query{getProductDetails(id : 2){
  name
  price
  quantity
}}

User can only see their own products. Therefore, it has to enter the id of one of its products.

# 6- Products
query{products{
  name
  price
  quantity
  barcode
}}

User can only see their own products.

# 7- DeleteProduct
mutation{deleteProduct(id :22)}

# 8- RefreshToken
mutation{refreshToken(
  refreshToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYxMDg3OTUzNSwiZXhwIjoxNjEwOTY1OTM1fQ.QtEXdyqSfAhIvmr8KQKd5catxHNthTqnIwpRdNYJ8Es"
)
    {accessToken}
}

You can create a new access token by giving the refresh token given in login as input.
Thus, you will not need to login again. However, you will need to update the access token in your headers.