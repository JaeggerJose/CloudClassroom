# DGXA100

System management of DGXA100

## Accounting Doc in Chinese

https://hackmd.io/BjB1EydLRnujatL19iHqYw

# Singularity installation
```bash
# install Go
export VERSION=1.14.12 OS=linux ARCH=amd64 && \
    wget https://dl.google.com/go/go$VERSION.$OS-$ARCH.tar.gz && \
    sudo tar -C /usr/local -xzvf go$VERSION.$OS-$ARCH.tar.gz && \    
    rm go$VERSION.$OS-$ARCH.tar.gz
echo 'export GOPATH=${HOME}/go' >> ~/.bashrc && \   
    echo 'export PATH=/usr/local/go/bin:${PATH}:${GOPATH}/bin' >> ~/.bashrc && \
    source ~/.bashrc
# install singularity
export VERSION=3.8.0 && \
    wget https://github.com/sylabs/singularity/releases/download/v${VERSION}/singularity-ce-${VERSION}.tar.gz && \
    tar -xzf singularity-ce-${VERSION}.tar.gz && \    
    cd singularity-ce-${VERSION} && \
    ./mconfig && make -C ./builddir && sudo make -C ./builddir install
```

# quota restriction
[quota 教學](https://david50.pixnet.net/blog/post/45238215-%5B%E7%AD%86%E8%A8%98%5Dquota%E7%A3%81%E7%A2%9F%E9%85%8D%E9%A1%8D)  
[quota 鳥哥](https://linux.vbird.org/linux_basic/centos7/0420quota.php)

# A100 教學頁面
[A100 教學](https://hackmd.io/@praexisio/BJdzfcEGY/%2FbNHGSFxNS0eWCVEi9Uo9Ww)

# Axtasy installation guild
## slurm installation
### install MUNGE
解決 HPC control node 與 compute node 的 通信認證，常見的認證方式有:
- authd
- munge: 允許 process 對一組具有相同 UID 和 GID 的 機器 對另一個本地或是遠端的 process 進行身分認證。這些機器組成了 共享密碼金鑰的安全領域 (security realm)。此安全領域中的客戶端可以在不使用 root 特權、保留端口 或 特定於平台 的創建和驗證憑據。
簡單說就是通過對數據 (payload) 的加解密，實現數據的安全傳輸。

## singularity installation

[user id mapping](https://docs.sylabs.io/guides/3.5/admin-guide/user_namespace.html) e.g. `sudo singularity config fakeroot --add dave`