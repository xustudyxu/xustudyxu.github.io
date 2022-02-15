# deploy demo
npm run docs:build
cd docs/.vuepress/dist
git init
git remote add origin https://github.com/openHacking/VuePressPluginQRCodeDemo.git
git add .
git commit -m 'deploy'
git push -f origin master:gh-pages




