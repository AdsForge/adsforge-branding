export NVM_DIR=/home/ubuntu/.nvm
source /home/ubuntu/.nvm/nvm.sh
node -v
npm -v

echo 'Changing to deployment directory'
cd /var/www/example

echo 'Extracting deployment package'
rm -rf .next

echo 'Extracting deployment package'
tar -xzf deploy.tar.gz --overwrite

echo 'Installing packages'
npm install

echo 'Deleting the archive'
rm -rf deploy.tar.gz

chmod +x ./node_modules/.bin/next

pm2 stop all
pm2 start npm --  start
pm2 save
echo 'Deployment completed!'