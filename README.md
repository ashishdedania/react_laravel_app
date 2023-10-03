## About Laravel REST API

To Setup This REST API and React Follow Below Steps 

(1) extract this zip at root folder of serve. like i am using wamp server and my root path is "D:\wampserver\www"  so in "www" folder i extract zip and there will be folder "api" , "ecom-dashboard" in this way "D:\wampserver\www\api" and "D:\wampserver\www\ecom-dashboard"

(2)create one database name "ecom" in mysql. set your mysql dbname, username,password in ".env" file at "D:\wampserver\www\api\.env".

(3) at command line go to "D:\wampserver\www\api" and run below command
composer install

(3) at command line go to "D:\wampserver\www\api" folder and run below command to make Database migration and seeder
php artisan migrate
php artisan db:seed --class=UserTableSeeder
php artisan db:seed --class=ProductCategoryTableSeeder
php artisan db:seed --class=ProductTableSeeder


(4) at command line go to "D:\wampserver\www\api" folder and run below command (delete "products" folder from storage and public if error comes)
php artisan passport:install
php artisan storage:link


(5) START API SERVER : at command line go to "D:\wampserver\www\api" folder run command "php artisan serve" , then open this url "http://localhost:8000/" in browser. This thing will start our api server.


(6) go to "D:\wampserver\www\ecom-dashboard" and run command "npm install"

(7) START FRONT END SERVER : at command line go to "ecom-dashboard" folder run command "npm start". then open this url "http://localhost:3000/" in browser. This is frontend server.   

(8) frontend for products to display to see in http://localhost:3000/home

(9) backend to create product got to http://localhost:3000/login.  try to login with email=ashish@gmail.com  password=123456
 
(10) to check unit test got to "D:\wampserver\www\api" at command line and type "vendor/bin/phpunit"


(11) if finding any dificulty in setup email me on ashish.dedania@gmail.com , +91-9909529154 

