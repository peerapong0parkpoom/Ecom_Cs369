**สมาชิกภายในกลุ่ม**
1. นาย พีรพงศ์ ภาคภูมิ 6309680038 (peerapong0parkpoom)
2. นางสาว ณัฐชยา ภวพงศ์สุภัทร 6309681457 (NatchayaF)
3. นางสาว ณิชารีย์ เชื้อชาติ 6309681648 (eerahcin, NichareeC)
   
หมายเหตุ branch ที่ใช้ในการ deploy และ เป็นเวอร์ชันที่เสร็จสิ้นคือ front-recheck

**script ที่ใช้ในการ deploy**   

```#!/bin/bash

# Update the instance
sudo yum update -y || sudo apt-get update -y

# Install Git
sudo yum install -y git || sudo apt-get install -y git

# Install Node.js and npm for Amazon Linux 2
sudo yum install -y nodejs npm || {
    # For Ubuntu-based instances
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
}

sudo npm install -g npm@6

# Install pm2 globally using npm
sudo npm install pm2 -g

# Go to the home directory of the current user
cd /home/ec2-user

# Clone the repository
git clone -b front-recheck https://github.com/peerapong0parkpoom/Ecom_Cs369.git

# Navigate to the project directory
cd Ecom_Cs369/backend
sudo npm i

# Start the server application using pm2
sudo pm2 start ./app.js

# Save the current pm2 processes
sudo pm2 save

# Ensure pm2 starts on boot
sudo pm2 startup

# 
sudo pm2 list

cd ../frontend

sudo npm i
sudo npm run build

sudo pm2 start npm --name "client" -- start -- -p 3000

# Save the current pm2 processes
sudo pm2 save

# Ensure pm2 starts on boot
sudo pm2 startup

# Install Nginx
sudo yum install -y nginx || sudo apt-get install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Adjust permissions
sudo chmod 755 /home/ec2-user
sudo chmod -R 755 /home/ec2-user
sudo setsebool -P httpd_read_user_content 1

# Copy the build files to the Nginx HTML directory
sudo cp -r build/* /usr/share/nginx/html/

# echo to nginx.conf
# Update the Nginx configuration
sudo bash -c 'cat > /etc/nginx/nginx.conf' <<EOF
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 2048;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '\$remote_addr - \$remote_user [\$time_local] "\$request" '
                      '\$status \$body_bytes_sent "\$http_referer" '
                      '"\$http_user_agent" "\$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;

    server {
        listen 80;
        server_name _;

        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files \$uri \$uri/ /index.html;
        }

        location /api/ {
            proxy_pass http://localhost:4000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;
        }

        error_page 404 /404.html;
        location = /404.html {
            internal;
        }
    }
}
EOF


# Restart Nginx to reflect the changes
sudo systemctl restart nginx```
