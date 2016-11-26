FROM alpine:3.4

RUN apk update && apk upgrade && apk --update add \
    ruby ruby-irb ruby-rake ruby-io-console ruby-bigdecimal ruby-json ruby-bundler \
    ruby-dev build-base \
    libstdc++ tzdata bash ca-certificates \
    &&  echo 'gem: --no-document' > /etc/gemrc

RUN mkdir -p /opt/sidensolhverv

WORKDIR /opt/sidensolhverv

RUN gem install --no-doc sinatra sinatra-contrib thin

COPY app /opt/sidensolhverv/app
COPY public /opt/sidensolhverv/public
COPY views/*.erb /opt/sidensolhverv/views/
COPY config.ru /opt/sidensolhverv/

EXPOSE 4567

CMD ["thin", "-R", "config.ru", "-a", "0.0.0.0", "-p", "4567", "start"]
