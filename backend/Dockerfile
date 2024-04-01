FROM openjdk:17
WORKDIR /usr/src/app
COPY ./build/libs/ZipJoong-0.0.1-SNAPSHOT.jar .
EXPOSE 8081

# Python 설치
RUN apt-get update \
    && apt-get install -y python3-pip python3-dev \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && ln -s /usr/bin/pip3 /usr/bin/pip \
    && pip install --upgrade pip

ENTRYPOINT ["java","-jar", "ZipJoong-0.0.1-SNAPSHOT.jar"]