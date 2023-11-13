import subprocess
#test=subprocess.Popen(f'getAvailablePort',shell=True,stdout=subprocess.PIPE)
#port=test.stdout.read().decode('ascii')[:-1]
#print(port)
#num=1
nodeip="120.126.17.201"
for i in range(1,25):
    test=subprocess.Popen(f'getAvailablePort',shell=True,stdout=subprocess.PIPE)
    port=test.stdout.read().decode('ascii')[:-1]
    print(nodeip+":"+port)
    # docker_name="tbi"+str(i)
    docker_name="slicer-ex-"+str(i)
    create=subprocess.Popen(f'docker run --gpus all -d --name={docker_name} -e XMODIFIERS=@im=fcitx -e GTK_IM_MODULE=fcitx -e QT_IM_MODULE=fcitx -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p {port}:3000 --shm-size="5gb" -v /home/ccllab/task/tbi:/home/tbi lms025187/webtop_image_captioning:slicer5.2.2-fcitx-extension',shell=True,stdout=subprocess.PIPE)
    
    # create=subprocess.Popen(f'docker run -d --name={docker_name} -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p {port}:3000 --shm-size="5gb" 13d73b81b782',shell=True,stdout=subprocess.PIPE)
    #create=subprocess.Popen(f'docker run --gpus all -itd --name={docker_name} -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p {port}:3000 --shm-size="5gb" e529ed17634f /bin/bash -c "su abc && export XMODIFIERS=@im=fcitx && export GTK_IM_MODULE=fcitx && export QT_IM_MODULE=fcitx && /bin/bash"',shell=True,stdout=subprocess.PIPE)
    #create=subprocess.Popen(f'docker run --gpus all -itd --name={docker_name} -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -e XMODIFIERS=@im=fcitx -e GTK_IM_MODULE=fcitx -e QT_IM_MODULE=fcitx -p {port}:3000 --shm-size="5gb" e529ed17634f',shell=True,stdout=subprocess.PIPE)
    container=create.stdout.read().decode('ascii')[:-1]
    #print(container)
#task_create=subprocess.Popen(f'/home/ccllab/task/create.sh {name} {container_name} {image_types} {ntasks_num} {cpus_per_task} {mem_number} {opentimeformat}',shell=True,stdout=subprocess.PIPE)
#port=task_create.stdout.read().decode('ascii')[:-1]
    
#task_active=subprocess.Popen(f'/home/ccllab/task/active.sh {name}',shell=True,stdout=subprocess.PIPE)
