<span class="mcl-back-button">[[Technology/Toolings/Docker/index|← Docker]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


### Use the following command to get the instance of docker ID

```bash
docker ps
```

### Copy from window to docker tmp file

```sh
docker cp 'C:\Users\path' '{DOCKER_ID}:/tmp'
```

### Connect to Docker DB Bash CLI

```sh
docker exec -it {DOCKER_ID} bash
```


### Run Docker PSQLDB restore CLI

```sh
pg_restore -U postgres -d {db-name} -v {dump_file}
```

