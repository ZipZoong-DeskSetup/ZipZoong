FROM openjdk:17
WORKDIR /usr/src/app
COPY ./build/libs/ZipJoong-0.0.1-SNAPSHOT.jar .
EXPOSE 8081

# Python 설치
RUN microdnf update \
        && microdnf install -y python3 python3-pip python3-devel \
        && ln -s /usr/bin/python3 /usr/bin/python \
        && ln -s /usr/bin/pip3 /usr/bin/pip \
        && pip3 install --upgrade pip \
        && pip3 install mysql-connector-python pandas numpy scikit-learn argparse

ENTRYPOINT ["java","-jar", "ZipJoong-0.0.1-SNAPSHOT.jar"]