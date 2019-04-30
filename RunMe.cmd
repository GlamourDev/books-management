@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Need to compile? (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END
echo COMPILING PROJECT...

start compile.bat
exit
:END
@echo STARTING PROJECT...
start cmd /k java -jar target\books-management-0.0.1-SNAPSHOT.jar 
timeout /t 2
start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:8080"
@echo ALL DONE
@echo Close shell in order to exit program
endlocal
