# Ldap Search

Searching local ldap all data using admin(user) and under tree *dc=ccllab,dc=edu,dc=tw*

`ldapsearch -xD cn=admin,dc=ccllab,dc=edu,dc=tw -W -b dc=ccllab,dc=edu,dc=tw`

## It's better to add data and search data in online database, because if you use LDAP Admin, you can directly see data added from Server. What more it's easier to backup and restore."

e.g.

`ldapsearch -xD -h 120.126.17.200:3899 cn=admin,dc=ccllab,dc=edu,dc=tw -W -b dc=ccllab,dc=edu,dc=tw`

`ldapadd -x -h ldap://120.126.17 -D "cn=admin,dc=ccllab,dc=edu,dc=tw" -f create_group.ldif -w "password"`
