Go in Go
========

Building with docker
```bash
docker build -t go .
docker run \
  -e API=<node-api> \
  -p 8000:8000 \
  go
```

Building with go "natively" (Like docker isn't or something)
```bash
# install deps like a pleb
go get .\...

export API=<node-api>
# run
go run go.go

# build if you want to
go build go.go
```

The docker file uses the go onbuild base image, which will automaticly install godeps.

### Future work
- [ ] Stats collections
- [ ] Aggrigating those stats into Grafana (at ssedev.site)
- [ ] Extend go to be a omni bar search engine replacement (like I type vans and it search google still, but I type go status and I get sent to the sse.rit.edu/go/status redirect)
