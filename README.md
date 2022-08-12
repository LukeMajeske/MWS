# MWS

My Personal Website built with ReactJS and .NET 5, deployed to Heroku.
URL:
https://mws-web-services.herokuapp.com/

Use this test user to login:
Email: testclient@test.com
Password: Pa$$w0rd


A client is able to login and gain access to their profile.

![image](https://user-images.githubusercontent.com/29846872/184381964-d1e19acd-943b-4a0b-85a9-98065dd4466c.png)



From there, if the admin has created a website entity, 
then the client is able to view any progress notes or even create a ticket for their website.

![image](https://user-images.githubusercontent.com/29846872/184382106-7cf79222-14b9-4271-b7a4-f86faae21ef3.png)


A ticket is used to communicate any issues or changes the client has for their website.

![image](https://user-images.githubusercontent.com/29846872/184382568-91f761d7-0bb1-4646-bdeb-05260a230c25.png)


Once a ticket is created, the client should then be able to see the ticket in their progress feed.

![image](https://user-images.githubusercontent.com/29846872/184382666-81980827-0ad0-4e70-a253-f74bc8b9ef35.png)


The admin will be able to see any created tickets when they login and navigate to the "Ticket Dashboard" tab. In this dashboard, 
there is a filter menu on the right. Clicking on any of the options will filter the tickets to the specified parameters. For example, 
clicking on the "I Watching" parameter will show only the tickets that the logged in user is curently watching.

![image](https://user-images.githubusercontent.com/29846872/184382960-0835e220-b8c6-4192-9464-ac343140e233.png)


Users are also able to add comments to a ticket as well.

![image](https://user-images.githubusercontent.com/29846872/184383745-d340a098-884c-4f61-b482-cfb8e02f0607.png)



All users and data are tracked in a postgreSQL database and can be queried with SQL commands within Heroku to generate reports.
