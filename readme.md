# MST Online Academy
## MST Solutions LLC

Virtual online academy for students to register for a course and attend session online scheduled by the mentor. Built on PEAN Stack. (Postgres, ExpressJS, AngularJS and Node.js)

### Deploy

<p align="center">
<a href="https://login.salesforce.com/packaging/installPackage.apexp?p0=04t28000000p97m">
<img src="https://cdn.rawgit.com/apppoccloudteam/mstonlineacademy/master/public/salesforce.svg" alt="Salesforce Intall Package"/>
</a>
<a href="https://heroku.com/deploy">
<img src="https://www.herokucdn.com/deploy/button.svg" alt="Heroku Deploy"/>
</a>
<a href="https://cdn.rawgit.com/apppoccloudteam/mstonlineacademy/master/public/mstonlineacademyPublicSchema.sql"><img src="https://rawgit.com/apppoccloudteam/mstonlineacademy/master/public/postresql.svg" alt="PostgreSQL Config"/>
</a>
<a href="https://cdn.rawgit.com/apppoccloudteam/mstonlineacademy/master/public/mstonlineacademy_heroku_connect_config.json"><img src="https://cdn.rawgit.com/apppoccloudteam/mstonlineacademy/master/public/herokuconnect.svg" alt="Heroku Connect Config"/>
</a>
</p>

##### Steps to follow:

1. Install the **MST Online Academy SF Package** to your Salesforce org.
2. Copy the *Salesforce.com Organization ID* from *Company Information*.
3. Deploy the application to your Heroku account. Enter the Organization ID in *SF_OID* field.
4. Import the PostgreSQL's config file, *mstonlineacademyPublicSchema.sql* to your applications's database.
5. Connect Heroku Connect add-on to your Salesforce org.
6. Import the *mstonlineacademy_heroku_connect_config.json* file.
7. Restart your application's dyno.