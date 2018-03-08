# readme

## 1.安装依赖包

    npm i
    或
    yarn
    
## 2.开发环境运行

    npm run dev:vue
    
## 3.打包  
  
    npm run build:vue
    
    编译到 ==> public/dist
    
    本地运行编译后的内容：node app.js
    
## 5.生产环境运行
   
    npm i -g pm2
    
    pm2 startOrRestart pm2.json
    
    环境变量设置和端口在pm2.json中设置
