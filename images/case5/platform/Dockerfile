FROM golang:1.19-alpine AS builder

WORKDIR /app

COPY ../src/main.go .

RUN GO111MODULE=off CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o my-app .

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/my-app .

EXPOSE 8080

CMD ["./my-app"]