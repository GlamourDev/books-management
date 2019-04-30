@echo on
call mvn clean install
start cmd /k java -jar target\books-management-0.0.1-SNAPSHOT.jar 
timeout /t 2
start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:8080"