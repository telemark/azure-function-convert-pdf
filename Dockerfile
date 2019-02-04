FROM mcr.microsoft.com/azure-functions/node:latest

RUN apt-get install -y libx11-6 libnss3 libxml2 libxslt1.1 \
      libfontconfig libxext6 libsm6 libxcb-shm0 libxcb-render-util0 \
      libxrender1

ENV AzureWebJobsScriptRoot=/home/site/wwwroot
ENV AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY . /home/site/wwwroot
WORKDIR /home/site/wwwroot
#RUN rm -rf nodes_modules
#RUN npm i --production
