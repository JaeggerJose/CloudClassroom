# Build   
````
go build -o getAvailablePort getAvailablePort.go  
````

# Usage  
Return a ipv4 port that between 10000 and 20000 and not listened.   
````
prxCoder@a100:~$ ./getAvailablePort
10417
````

# For the user of A100 to obtain a port that can be listened by jupyter notebook  
````
sudo cp ./getAvailablePort /usr/local/bin # both in login node and computing node
````
