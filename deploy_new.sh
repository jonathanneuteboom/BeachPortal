# build angular application
cd angular-app
npm i
npm run build
cd ..

# remove all python cache
find . | grep -E "(/__pycache__$|\.pyc$|\.pyo$)" | xargs rm -rf

# tar all files into 1 file
cd angular-app/dist && tar -cf ../../deployment.tar * && cd -
tar --append -f deployment.tar backend-api/BeachPortal backend-api/BeachPortalApi backend-api/manage.py backend-api/requirements.txt

# remove anything on server, except for configuration folder
ssh -T deb105013n2@skcvolleybal.nl -i /c/Users/jonat/.ssh/antagonist-ssh <<- 'END'
shopt -s extglob
rm -R !("deb105013n2_beach_portal.cnf"|"deb105013n2_beach_portal.cnf")
shopt -u extglob
END

# copy files to server
scp -i /c/Users/jonat/.ssh/antagonist-ssh deployment.tar deb105013n2@skcvolleybal.nl:/home/deb105013n2/beach-portal

# Extract tar-file (+ remove afterwards) and move Configuration file to correct location
ssh -T deb105013n2@skcvolleybal.nl -i /c/Users/jonat/.ssh/antagonist-ssh <<- 'END'
tar -xf ./deployment.tar

pip install --upgrade pip

pip install -r requirements.txt

python manage.py migrate
python manage.py collectstatic

source /home/deb105013n2/virtualenv/beach-portal/3.8/bin/activate && cd /home/deb105013n2/beach-portal

mv /home/deb105013n2/beach-portal/dist/BeachPortal/* /home/deb105013n2/public_html/beach-portal/
cp /home/deb105013n2/beach-portal/configuration/deb105013n2_beach_portal.cnf /home/deb105013n2/beach-portal/deb105013n2_beach_portal.cnf
cp /home/deb105013n2/beach-portal/configuration/deb105013n2_SKC.cnf /home/deb105013n2/beach-portal/deb105013n2_SKC.cnf
rm ./deployment.tar
END

# remove locally
rm ./deployment.tar