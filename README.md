# azure-function-convert-pdf

Azure function for converting file to pdf

## Development

Install all tools needed for [local development](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local).

Clone the repo. Install dependencies.

Start server

```
$ func start
```

POST testdata

```
$ curl http://localhost:7071/api/ConvertToPdf -d $(base64 test/data/test.docx)
```

# License

[MIT](LICENSE)
