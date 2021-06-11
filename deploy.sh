# build angular application
cd angular-app
npm i
npm run build
cd ..

# build php code
cd php
composer install
composer dumpautoload
cd ..

# tar all files into 1 file
cd angular-app/dist/BeachPortal && tar -cf ../../../deployment.tar * && cd -
tar --append -f deployment.tar php

# remove anything on server, except for Configuration.php
ssh -T deb105013n2@skcvolleybal.nl -i /c/Users/jonat/.ssh/antagonist-ssh <<- 'END'
cd /home/deb105013n2/public_html/beach/beach-portal
shopt -s extglob
rm -R !("configuration.php"|".htaccess")
shopt -u extglob
END

# copy files to server
scp -i /c/Users/jonat/.ssh/antagonist-ssh deployment.tar deb105013n2@skcvolleybal.nl:~/public_html/beach/beach-portal

# Extract tar-file (+ remove afterwards) and move Configuration file to correct location
ssh -T deb105013n2@skcvolleybal.nl -i /c/Users/jonat/.ssh/antagonist-ssh <<- 'END'
cd /home/deb105013n2/public_html/beach/beach-portal
tar -xf ./deployment.tar
cp /home/deb105013n2/public_html/beach/beach-portal/configuration.php /home/deb105013n2/public_html/beach/beach-portal/php/configuration.php
rm ./deployment.tar
END

# remove locally
rm ./deployment.tar