FROM frolvlad/alpine-python2

# for rpi
#FROM armhf/alpine

#RUN apk add --no-cache python && \
#    python -m ensurepip && \
#    rm -r /usr/lib/python*/ensurepip && \
#    pip install --upgrade pip setuptools && \
#    rm -r /root/.cache


RUN pip install --upgrade pip
RUN pip install ws4py
RUN pip install iofog-container-sdk
RUN pip install jsonpath-rw

COPY . /src
RUN cd /src;

CMD ["python", "/src/main.py", "--log", "DEBUG"]