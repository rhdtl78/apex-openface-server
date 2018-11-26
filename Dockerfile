FROM maladaptive/openface-server

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs

WORKDIR /root/apex-openface-server/

RUN npm install

EXPOSE 8000 9000 3000

CMD /bin/bash -l -c 'npm start'
