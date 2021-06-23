# Discord Bot GDPS
A Discord Bot GDPS for your geometry dash private server

## How to Setup Your Bot
Download this Repository. And then Extract the Files Zip.
After you Extract the zip files. Upload the bot folder/directory into your database geometry dash private
server to read files by the bot. Before you upload the bot folder please setup <a href="https://github.com/FamryAmri/Discord-Bot-GDPS/blob/master/bot/botConfig.php">botConfig.php</a> for emoji set.
<br>

## Make Bot Discord 
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
After that, You must edit setup.json and .env at folder botfiles. Put your token and also your <a href="https://support.discordapp.com/hc/en-us/articles/360000291932">user id</a>. Make your prefix at the setup.json. And also put your host of gdps must be included with database folder. Like this <b>[ Not need slash at behind url ]</b>
<br>
<b>http://www.boomlings.com/database </b>

## For Hosting the bot using android
Please download termux at Google Play Store
After you downloaded, Open the app and type..
<br>
<code>pkg i nodejs </code>
<br>
where did you put the <a href="https://github.com/FamryAmri/Discord-Bot-GDPS/tree/master/botfiles">botfiles</a> is your path storage..
<br>
<code>cd /sdcard/your-path-folder/botfiles </code>
<br>
And then install all the dependencies in package.json using this code
<br>
<code>npm i</code>
<br>
Last Step to host the bot..
<br>
<code>node index.js </code>

## Using Heroku 
For who want to use heroku.
First, you need register your account github and heroku
<br>
Github - https://github.com/join
<br>
Heroku - https://signup.heroku.com
<br>
After you register two of them
create new repository at github
https://github.com/new

Create your own name repository and then set to private.
And then Tap create repository.
<br><br>
![...](http://famrygd.5v.pl/totur/image5.png)
<br><br>

And then for users PC just tap the import code to upload the <a href="https://github.com/FamryAmri/Discord-Bot-GDPS/tree/master/botfiles">botfiles </a>.
For users Android must be install termux to upload the flies. Don't forget type
<br>
<code>pkg install git </code>
<br>
<code>cd /sdcard/your-path-to-botfiles/botfiles </code>
<br>
Follow this code
<br>
<code>git config --global user.name "your username github" </code>
<br>
<code>git config --global user.email "your email github" </code>
<br>
and follow the code at (..or create new repository ) except echo #repo >> Readme.md
<br><br>
![...](http://famrygd.5v.pl/totur/image6.png)
<br><br>
GoTo <a href="https://dashboard.heroku.com/apps">Heroku Dashboard </a>
<br>
Create new app and then fill your own name app.
<br>
After that, Tap create app <b>[ Not Need Add Pipeline ]</b>
<br><br>
![...](http://famrygd.5v.pl/totur/image7.png)
<br><br>
Connect to Github Account to Cloning your repo to heroku and find your repo you has been created. Don't forget to setup token bot at setup.json and also your host server.
<br><br>
![...](http://famrygd.5v.pl/totur/image8.png)
<br><br>
After you connect and clone your repo. Tap Deploy Branch to cloning and running the bot. After done deploying. Goto more at up site and goto view logs to see the bot is Online or not.
<br><br>
![...](http://famrygd.5v.pl/totur/image9.png)
<br><br>
Last one you must invite your bot. Follow in this image
<br><br>
![...](http://famrygd.5v.pl/totur/image10.png)
<br>

## Update
Now you can host in [glitch](http://glitch.com) and [repl](http://repl.it)
just clone/import this repo to it. (Please UptimeRobot to keep online the bot)

Credits: [Cvolton](http://github.com/cvolton)
