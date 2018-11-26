FROM bamos/openface

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs

WORKDIR /root
RUN git clone https://github.com/rhdtl78/apex-openface-server.git

WORKDIR /root/apex-openface-server/
RUN rm -r openface
RUN cp -r /root/openface ./openface

RUN npm install

EXPOSE 8000 9000 3000

CMD /bin/bash -l -c 'npm start'
