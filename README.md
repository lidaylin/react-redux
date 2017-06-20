## 开发关注
1. 安装最新版nodejs（7.0以上版本）和npm
// 切换淘宝源加快速度
  npm i nrm
 nrm use taobao

2. 切换到到代码目录，安装依赖 ： npm i
3. 打包依赖： npm run lib 
ps: 第一次需要运行，以及在前端代码依赖包更新的情况下（一般这种时候直接运行4会报错），需要重新走2-3步，npm i ＋ 重新运行此指令。 
一般情况下，直接走4即可。

4. 运行代码： npm run start
5. 浏览器访问 http://localhost:8080/
后端联调：
1. 修改 config/index.js, dev里的mock: true； true为前端mock，false为联结后端；proxyTable中修改为后端ip和端口。


##构建关注
1. 代码根目录 npm i
2. npm run build
3. 产出在./dist, 讲这个目录copy到nginx指定的文件夹即可
4. 配置nginx，使得通过域名直接可以访问index.html，配置类似：
server {
    listen 80;
    server_name manpan.haofang.com;
    index  index.html;
    root /Volumes/www/manpan-web/;
    location / {
        try_files $uri $uri/ /index.html;
    }
}

，如果需要nginx来转发请求，加入类似配置
   location ^~ /api/ {
    proxy_pass         http://192.168.0.193:8080/api/;
    proxy_set_header   Host             $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }