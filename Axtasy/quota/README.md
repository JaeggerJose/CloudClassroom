# quota restriction
[quota 教學](https://david50.pixnet.net/blog/post/45238215-%5B%E7%AD%86%E8%A8%98%5Dquota%E7%A3%81%E7%A2%9F%E9%85%8D%E9%A1%8D)
[quota 鳥哥](https://linux.vbird.org/linux_basic/centos7/0420quota.php)

## 修改/etc/fstab檔
```bash
ubuntu@ubuntu:/home$ sudo vim /etc/fstab
LABEL=cloudimg-rootfs   /home    ext4   defaults,usrquota,grpquota      0 0  #在要啟用quota之分割區(/home)第4個欄位最後(defaults後)加入usrquota,grpquota
/swapfile               swap     swap   defualts                        0 0
# 存檔後離開
```
## 重新掛載分額區
```bash
ubuntu@ubuntu:/home$ sudo mount -o remount /home   #重新掛載要啟用quota之分割區
```

## 查看/etc/mtab檔
```bash
ubuntu@ubuntu:/$ cat /etc/mtab 
/dev/sda1 / ext4 rw,usrquota,grpquota 0 0       #usrquota,grpquota已被加入mtab中
```
## 掃描磁碟產生配額設定檔：quotacheck
```bash
ubuntu@ubuntu:/home$ sudo quotacheck -ugvmca  #經測試加-a即可產生設定檔!
# 此時在要啟用quota之磁區中會多了2個檔案
ubuntu@ubuntu:/home$ ls -al /home
drwxr-xr-x 23 root root      4096 May 10 14:58 .
drwxr-xr-x 23 root root      4096 May 10 14:58 ..
-rw-------  1 root root      7168 May 10 15:45 aquota.group
-rw-------  1 root root      7168 May 10 15:45 aquota.user
```
**quotacheck參數說明**
```
參數	說明
-a	掃描/etc/fstab檔案裡有加入quota設定的分割區
-c	不讀取已存在的quota資料庫,重新掃描硬碟並儲存
-d	顯示執行過程比-v來的詳細
-g	掃描/etc/mtab檔中有啟用群組磁碟配額的掛載點，計算群組所占用的目錄跟檔案數目,並建立quota.group
-m	強制執行
-u	掃描/etc/mtab檔中有啟用使用者磁碟配額的掛載點，計算使用者所占用的目錄跟檔案數目,並建立quota.usser
-v	執行過程中，顯示進度與資訊
```
## 啟用/停用磁碟配額：quotaon, quotaoff
```bash
ubuntu@ubuntu: sudo /home$ quotaon -a
# 執行後可利用-p參數查詢磁碟配額啟用狀態
ubuntu@ubuntu:/home$ sudo quotaon -ap
group quota on / (/dev/sda1) is on     #group quota已啟用
user quota on / (/dev/sda1) is on      #user quota已啟用
#若要關閉磁碟配額可使用quotaoff
ubuntu@ubuntu:/home$ sudo quotaoff -a  #停用quota
ubuntu@ubuntu:/home$ sudo quotaoff -ap  #再查詢一次quota狀態
group quota on / (/dev/sda1) is off     #group quota已停用
user quota on / (/dev/sda1) is off      #user quota已停用
```

## 設定使用者磁碟配額：edquota, setquota
Linux磁碟配額的設定有兩種，一種是磁碟空間(blocks)，另一種是檔案數(inodes)，在設定時使用容量時有兩個設定值一個是soft limit，另一個是hard limit，若使用超過soft limit所設定之值時，系統會顯示警告訊息，仍可繼續寫入檔案，但當所使用的容量或檔案數到達hard limit所設定之值時，即無法再寫入。

```bash
ubuntu@ubuntu:/home$ sudo edquota -u quotatest1    #使用edquota設定quotatest1使用者之磁碟配額
Disk quotas for user quotatest1 (uid 1002):
  Filesystem                   blocks       soft       hard     inodes     soft     hard
  /dev/sda1                        52      10000      12000          3        0        0      #將soft limit設為10M，hard limit設為12M
# 存檔後離開
ubuntu@ubuntu:/home$ sudo quota -u quotatest1 #查看quotatest1使用者之磁碟配額
Disk quotas for user quotatest1 (uid 1002): 
     Filesystem  blocks   quota   limit   grace   files   quota   limit   grace
      /dev/sda1      52   10000   12000               3       0       0                       #設定完成
```

**setquota的設定方式是在命令列即可完成，不像edquota會進入編輯模式。**
語法：`setquota -u 帳號 block soft limit block hard limit inode soft limit inode hard limit 目錄`

```bash
ubuntu@ubuntu:/home$ sudo setquota -u quotatest2 8000 10000 0 0 /home   #使用setquota將quotatest2磁碟配額soft limit設為8M，hard limit設為10M
ubuntu@ubuntu:/home$ sudo quota -u quotatest2 #查看quotatest2使用者之磁碟配額
Disk quotas for user quotatest1 (uid 1003): 
     Filesystem  blocks   quota   limit   grace   files   quota   limit   grace
      /dev/sda1      52    8000   10000           3       0       0              #設定完成
```

## 測試與驗證
```bash
ubuntu@ubuntu:/home$ su - quotatest1                #切換至quotatest1使用者
Password:                                           #輸入密碼
$ dd if=/dev/zero of=test bs=1M count=13            #使用dd建立一個13M的空檔案
dd: error writing ‘test’: Disk quota exceeded       #因超過設定的12M而出現了錯誤訊息
12+0 records in
11+0 records out
12279808 bytes (12 MB) copied, 0.0153828 s, 798 MB/s
$ ls -alh                                            #查看test檔案大小
total 12M
drwxr-xr-x 2 quotatest1 quotatest1 4.0K May 10 13:33 .
drwxr-xr-x 6 root       root       4.0K May 10 15:09 ..
-rw-rw-r-- 1 quotatest1 quotatest1  12M May 10 15:56 test #test檔案大小12M
```

## 複製磁碟配額設定：edquota -p
語法：`edquota -p 來源帳號 目標帳號`
如果有很多個帳號需要設定磁碟額時，每個帳號都要各別設定的話，對管理人員來說就太耗時了，這時可以使用edquota -p這個參數將帳號quota設定複製到另一個帳號即可。
```bash
ubuntu@ubuntu:/home$ sudo edquota -p quotatest1  quotatest2  #將quotatest1帳號的配額複製到quotatest2帳號
ubuntu@ubuntu:/home$ sudo quota -u quotatest2                #查看quotatest2使用者之磁碟配額
Disk quotas for user quotatest2 (uid 1003): 
     Filesystem  blocks   quota   limit   grace   files   quota   limit   grace
      /dev/sda1      52   10000   12000               3       0       0          #quotatest2的設定和quotatest1一樣了
```

## 寬限期 grace
當使用者使用的空間大於soft limit時，需在一定期限內將使用量降至soft limit值以下，此期限就稱寬限期，寬限期使用的單位有日(days)、小時(hours)、分鐘(minutes)及秒(seconds)，我們可以使用edquota -t參數設定寬限期
```bash
ubuntu@ubuntu:/home$ sudo edquota -t                     #設定寬限期
Grace period before enforcing soft limits for users:
Time units may be: days, hours, minutes, or seconds
  Filesystem             Block grace period     Inode grace period
  /dev/sda1                  1minutes                  7days      #將寬限期由原本的7天改為1分鐘
# 存檔後離開
ubuntu@ubuntu:/home$ su - quotatest2                      #切換至quotatest2使用者
Password:                                                 #輸入密碼
$ dd if=/dev/zero of=test bs=1M count=11                  #使用dd建立一個11M的空檔案
11+0 records in
11+0 records out
11534336 bytes (12 MB) copied, 0.0148181 s, 778 MB/s
$ ls -alh                                                 #查看test檔案大小
total 12M
drwxr-xr-x 2 quotatest2 quotatest2 4.0K May 10 13:33 .
drwxr-xr-x 6 root       root       4.0K May 10 15:09 ..
-rw-rw-r-- 1 quotatest2 quotatest2  11M May 10 16:03 test #test檔案大小11M
# 一分鐘過後再查看quotatest2之磁碟配額
$ quota
Disk quotas for user quotatest2 (uid 1003): 
     Filesystem  blocks   quota   limit   grace   files   quota   limit   grace
      /dev/sda1   11272*  10000   12000    none       3       0       0         #blocks欄位加了*號，grace欄位變為none了
```

## 磁碟配額報表 repquota
repquota可產生磁碟配額的使用狀況報表，清楚得知每個帳號和群組的使用量。

```bash
repquota參數說明
參數	說明
-a	對所有已掛載的檔案系統進行統計
-v	對所有檔案系統配額情況產生報表包含未掛載的系統檔案
-g	產生群組(group)的配額報表
-u	產生使用者(user)的配額報表
-s	包含完整的統計資訊
```

```bash
ubuntu@ubuntu:/home$ sudo repquota -avus                   #列出使用者配額報表
*** Report for user quotas on device /dev/sda1
Block grace time: 00:01; Inode grace time: 24:00
                        Space limits                File limits
User            used    soft    hard  grace    used  soft  hard  grace
----------------------------------------------------------------------
root      --   2532M      0K      0K          73657     0     0       
daemon    --     64K      0K      0K              4     0     0       
quotatest1 +-  12000K  10000K  12000K   none      3     0     0       
quotatest2 --      8K  10000K  12000K             2     0     0       

Statistics:
Total blocks: 7
Data blocks: 1
Entries: 14
Used average: 14.000000
ubuntu@ubuntu:/home$ sudo repquota -avgs                  #列出群組配額報表
*** Report for group quotas on device /dev/sda1
Block grace time: 7days; Inode grace time: 7days
                        Space limits                File limits
Group           used    soft    hard  grace    used  soft  hard  grace
----------------------------------------------------------------------
root      --   2530M      0K      0K          73738     0     0       
quotatest1 --  12000K     0K      0K              3     0     0       
quotatest2 --  10008K     0K      0K              4     0     0       

Statistics:
Total blocks: 9
Data blocks: 2
Entries: 26
Used average: 13.000000
```