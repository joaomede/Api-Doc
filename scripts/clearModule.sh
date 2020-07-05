cd api-doc-js-sdk
yarn build
cd ..
sudo rm -r api/node_modules/api-doc-js-sdk
sudo cp -r api-doc-js-sdk api/node_modules/api-doc-js-sdk