# Rest-api-Angular
This project is composed of API Plateform which is a bundle of Symfony for the back-end,
and Angular for the front-end.

# Back-end
So for the back-end, I use Symfony with the API Plateform which offer the way to share the data with
the front-end application with a back-end application that is specially designed for restful api in terms
of security and maintenance.  Futhermore, the framework is easily parametrable by versus the context of the
application.

# Front-end
For the front-end side, I use angular, because it allows to build complexe applications using javascript after
compilation of typescript language, which allows to write some clean and maintenable code. It also offers some
functionnality (guards, observalble, forms) for building the application that are very pratical.

# Principles of the application
The project is about a blog that displays albums on wich visitors can let a comment for an album
on the album's page, and an admin section where the application's administrator can manage the blog.

So a user can be registered on the register page, therefore users can be connected to this blog and let
some comment about an album.

The admin can log on the admin part, after being identified by the application, he can manage the application
while creating albums, styles, artists...

The system is protected via the guard system wich allows the visitors to be identified as users or an 
administrator, if the visitors is not identified, they can not access to the protected part of the application
or can not let a comment.

Furthermore, a token is necessary to be connected to the application, so that for managing the appliacation
or symply for leting a comment.  That token changes at all reloading of pages or in after five minutes.

Lastly, the system is protected with cors exchange using the nelmio bundle, so that to restrict 
the requests only for the application.
