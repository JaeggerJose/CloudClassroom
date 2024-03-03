# test connection to remote server

import paramiko
import os, json


class SSHConnect:
    
    def test_connect(host, port, username, password):
        # Create a new SSH client
        client = paramiko.SSHClient()
        # Set the policy to use when connecting to servers without a known host key
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        # Connect to the server
        try:
            client.connect(hostname=host, port=port, username=username, password=password)
            print('Connect to', host, 'successfully')
            client.close()
            return True
        except Exception as e:
            print('Connect to', host, 'failed:', e)
            client.close()
            return False

    def ssh_connect():
        # get information from json file
        with open(os.path.join(os.path.dirname(__file__), 'server.json')) as f:
            data = json.load(f)
        serverlist = []    
        for i in data:
            
            host = i['server']
            port = i['port']
            username = i['username']
            password = i['password']
            
            isConnect = test_connect(host, port, username, password)
            
            serverlist.append({'host': isConnect})
        
        return serverlist
        

    