# remove all python cache
find . | grep -E "(/__pycache__$|\.pyc$|\.pyo$)" | xargs rm -rf

# build angular application
cd angular-app
npm i
npm run build
cd ..


# remove folders on server
ssh -T deb105013n2@skcvolleybal.nl -i /c/Users/jonat/.ssh/antagonist-ssh <<- 'END'
rm -rf /home/deb105013n2/public_html/beach-portal/*

rm -rf /home/deb105013n2/beach-portal/BeachPortal
rm -rf /home/deb105013n2/beach-portal/BeachPortalApi
rm -rf /home/deb105013n2/beach-portal/__pycache__
END

# copy files to server
scp -i /c/Users/jonat/.ssh/antagonist-ssh angular-app/dist/BeachPortal/* deb105013n2@skcvolleybal.nl:/home/deb105013n2/public_html/beach-portal/

scp -r -i /c/Users/jonat/.ssh/antagonist-ssh backend-api/BeachPortal deb105013n2@skcvolleybal.nl:/home/deb105013n2/beach-portal/
scp -r -i /c/Users/jonat/.ssh/antagonist-ssh backend-api/BeachPortalApi deb105013n2@skcvolleybal.nl:/home/deb105013n2/beach-portal/

# Install django application
ssh -T deb105013n2@skcvolleybal.nl -i /c/Users/jonat/.ssh/antagonist-ssh <<- 'END'
source /home/deb105013n2/virtualenv/beach-portal/3.8/bin/activate && cd /home/deb105013n2/beach-portal

pip install --upgrade pip
pip install -r requirements.txt

python manage.py migrate
python manage.py collectstatic

cp /home/deb105013n2/beach-portal/settings.py /home/deb105013n2/beach-portal/BeachPortal/settings.py
END