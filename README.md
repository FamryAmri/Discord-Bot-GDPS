<h1 align="center">Discord Bot GDPS </h1>
A Discord Bot GDPS for your geometry dash private server

# How to Setup Your Bot
Download this Repository. And then Extract the Files Zip.
After you Extract the zip files. Upload the bot folder/directory into your database geometry dash private
server to read files by the bot. Before you upload the bot folder please setup botConfig.php for emoji set
<br>

# Make Bot Discord 
First, we need to create a new application on the discord development portal.
We can do so by visiting the portal and clicking on new application.
<br><br>
![...](http://famrygd.5v.pl/totur/image1.png)
<br><br>

Make your own bot name. For example:
<br><br>
![...](http://famrygd.5v.pl/totur/image2.png)
<br><br>

Goto Bots Tab at the left option.
<br><br>
![...](http://famrygd.5v.pl/totur/image3.png)
<br><br>

Copy your token bot and set bot permission to admin
<br><br>
![...](http://famrygd.5v.pl/totur/image4.png)
<br><br>

After that, You must edit setup.json at folder botfiles and put your token. Make your prefix at the setup.json. And also put your host of gdps must be included with database folder. Like this <b>[ Not need slash at behind url ]</b>

<br><br>
<b>http://www.boomlings.com/database </b>
<br><br>

# For Hosting the bot using two devices

For run/host the bot using android..
<br><br>
Please download termux at Google Play Store
After you downloaded, Open the app and type..
<br><br>

<code>pkg install nodejs </code>

<br><br>
where did you put the botfiles is your path storage..
<br><br>

<code>cd /sdcard/your-path-folder/botfiles </code>
<br><br>
And then install all the dependecies using this code

<br><br>
<code>npm start</code>
<br><br>


