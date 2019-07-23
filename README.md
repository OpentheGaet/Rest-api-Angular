# Rest-api-Angular
This project is composed of API Plateform which is a bundle of Symfony for the back-end,
and Angular for the front-end.

# Back-end
So for the back-end, I use Symfony with the API Plateform which offer the way to share the data with
the front-end application. It consists of a back-end application that is specially designed for restful api in terms
of security and maintenance.  Futhermore, the framework is easily parametrable by versus the context of the
application.

# Front-end
For the front-end side, I use angular, because it allows to build complexe applications using javascript after
compilation of typescript language, which allows to write some clean and maintenable code. It also offers some
functionnality (guards, observalble, forms) for building the application that are very pratical.

For uploading files, a bit of node js code allows the uploading in the asset folder of Angular.

# Principles of the application
The project is about a blog that displays albums on wich visitors can let a comment for an album
on the album's page, and an admin section where the application's administrator can manage the blog.

So a user can be registered on the register page, therefore users can be connected to this blog and let
some comment about an album.

The admin can log on the admin part, after being identified by the application, he can manage the application
while creating, updating or deleting (CRUD) albums, styles, artists...

The system is protected via the guard system wich allows the visitors to be identified as users or as an 
administrator, if the visitors is not identified, they can not access to the protected part (Admin) as a user 
or can not let a comment.

Furthermore, a token is necessary to be connected to the application and for managing the appliacation
or symply for leting a comment.  That token changes at all reloading of pages or, after five minutes thanks to 
an observable, if the token is absent or bad, users or visitors can not executing CRUD.

Lastly, the system is protected with cors exchange using the nelmio bundle, so that to restrict 
the requests only for the application's URL.

# Contact

If you have any notice, or you want to share something, do not hesitate to get me in touch :-)
