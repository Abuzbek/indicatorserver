# Indicator Server | by UMDSOFT

> Backend API for Indicator application, which is a bootcamp directory website

>Test domen http://sdev.uz:5000
>
## Api For Product list
>For user Panel
```
/api/product/all  | GET | Barcha productlar uchun
/api/product/all/:id | GET | ID bo`yicha olish
```

>For admin panel
```
/api/product  | POST | Product qo`shish uchun
/api/product  | GET  | Barcha Productlarni olish uchun
/api/product/:id  | PUT     | Productlarni update uchun
/api/product/:id  | DELETE  | Product delete uchun
```
> POST da talab qilinadi
```
*titleuz    | String
*titleru    | String
*category   | ObjectID
*detailsuz  | String
*detailsru  | String
*inforu     | String
*infouz     | String
*images     | String -> array
*price      | String
*type       | Enum ['old','new'] -> Product yangi yoki BU ekanligi uchun
```

## Api For Order list
 > Order list
 >
 >_For admin panel_

```
/api/order          | GET | Barcha orderlarni olish uchun | Admin , publisher xuquqiga egalar
/api/order/:id      | PUT | Order statusini yangilash uchun | Admin , publisher xuquqiga egalar
/api/order/:id      | PUT | Orderni o\`chirish uchun uchun | Admin xuquqiga egalar
```
>_For user panel_
>
```
/api/order      | POST | Yangi order yaratish uchun | Barcha ro'yhatdan o'tgan foydalanuvchilar uchun
/api/order/my   | GET  | Shu foydalanuvchi o`z orderlarini olishi uchun 
/api/order/my   | DELETE  | Shu foydalanuvchi o`z orderlarini o'chirishi uchun
```
> Yangi order uchun kerak
```
*user    | Header da token jo`natiladi
*product | Productlar va soni massiv shaklida
*address | Foydalanuvchi manzili
```

## Api For Product rating
> **Public Glavnida ishlatish uchun**
>
>_Bitta foydalanuvchi bitta product ga 1 marta reyting qo\`yishi mumkin. Reyting 5 balli tizimda. 5 dan katta son jo`natish mumkinmas_

```
/api/rating   | POST | POST so`rov jo`natiladi
/api/rating   | GET  | Productlarni reyting bahosi bo`yicha olish
```
```
Headerda quyidagi jo`natiladi
*user   | HEADER da token | type: String


Body da quiydagi parametrlar jo`natiladi

*procut | joriy product ID si  | type: String
*cost   | Foydalanuvchi qo`ygan baho | type: Number
```
>

## Api For Filter by Product Price
> Public Glavnida ishlatish uchun

```
/api/filter?price=${num}   | GET | price query jo`natiladi

Masalan: http://{{URL}}/api/filter?price=30000
```

## Api For Category for admin panel
 > Barcha API lar admin panel uchun
 ```
 /api/category        | POST | Category qo`shish
 /api/category        | GET | Barcha category lar
 /api/category/:id    | PUT | Category Update
 /api/category/:id    | DELETE | Category Delete
 ```
 > Category Add Post Metod
 ```
     titleuz: String | required: true | maxlength: 150
     titleru: String | required: true | maxlength: 150
 ```

##

## Api For Auth

```
/api/auth/register  | POST
/api/auth/login     | POST
/api/auth/logout    | GET
/api/auth/forgotpassword    | POST
/api/auth//resetpassword/:resettoken    | PUT

Protected APIs

/api/auth/profile   | GET
/api/auth/updatedetails | PUT
/api/auth/updatepassword    | PUT


```
> Register User
```
* name: String 
* email: String
* password: String
```
> Login User
```
* email, 
* password
```
> Protected API larda HEADER da token jo`natish kerak

```
Authorization: Bearer token
```
