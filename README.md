# azure-function-convert-pdf

Azure function for converting file to pdf

## Development

Install all tools needed for [local development](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local).

Clone the repo. Install dependencies.

Run in docker

```
docker build -t azure-function-convert-pdf .
docker run -it  -p 8080:80 azure-function-convert-pdf
```

Start server

```
$ func start
```

POST testdata (osx)

```
$ curl http://localhost:7071/api/ConvertToPdf -d $(base64 test/data/test.docx)
```

POST testdata (linux)


```
$ curl http://localhost:7071/api/ConvertToPdf -d $(base64 -w0 test/data/test.docx)
```

# License

[MIT](LICENSE)
