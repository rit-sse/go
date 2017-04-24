FROM scratch

COPY ./go /go

EXPOSE 8000
CMD ["/go"]
