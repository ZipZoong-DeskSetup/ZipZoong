FROM openjdk:17
WORKDIR /usr/src/app
COPY ./build/libs/ZipJoong-0.0.1-SNAPSHOT.jar .
EXPOSE 8081

ENTRYPOINT ["java","-jar", "ZipJoong-0.0.1-SNAPSHOT.jar"]