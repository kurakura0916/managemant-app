FROM python:3.6.3

RUN apt-get update

RUN DEBIAN_FRONTEND=noninteractive apt-get -y install python-dev

RUN pip3 install --upgrade pip
ADD requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

WORKDIR /app

COPY . .

EXPOSE 5000
