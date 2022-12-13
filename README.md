# Stories with images

## Clone the project
```
    git clone https://github.com/hardikv21/story.git
```
## Setup Database

* Install postgreSQL using its documentation with pgAdmin - https://www.postgresql.org/
* After that create the database with a name "storydb" and password "1234"
* Make sure this database uses "5432" port while running

## Setup backend
* Install JAVA using its documentation - https://www.java.com/en/download/help/windows_manual_download.html
* Open any JAVA IDE (preferably Eclipse)
* Import maven project which is located inside "story" folder - "server"
* Navigate to "src/main/java/com/springboot/storieswithimages"
* Run "StoriesWithImagesApplication.java"
* Your backend server will up on port 9090

## Setup frontned
* Install Node using its documentation - https://nodejs.org/en/download/
* Open IDE (preferably VSCode)
* Open folder which is located inside "story" folder - "frontend"
* Run command in teminal from the root of the folder
```
    npm install
```
* To start the application, run the command
```
    npm start
```
* Your frontend server will up on port 3000
