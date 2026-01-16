#!/bin/bash
export NVM_DIR=/home/ubuntu/.nvm
source /home/ubuntu/.nvm/nvm.sh
node -v
npm -v

echo 'Changing to deployment directory'
cd /home/ubuntu/app
pwd

echo 'Extracting deployment package'
rm -rf .next

echo 'Extracting deployment package'
tar -xzf deploy.tar.gz --overwrite

echo 'Installing packages'
pnpm install

echo 'Running database migrations'
pnpm prisma:migrate:deploy

echo 'Generating Prisma Client'
pnpm prisma:generate

echo 'Deleting the archive'
rm -rf deploy.tar.gz

chmod +x ./node_modules/.bin/next

echo 'Restarting application'
pm2 stop all
pm2 start pnpm --  start
pm2 save
echo 'Deployment completed!'
