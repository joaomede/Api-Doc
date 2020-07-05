
prefixLinux="Api Doc-"
formatLinux=".AppImage"
pathDistElectron="dist/electron/Packaged/"
SCPserver='joaomede@frs.sourceforge.net:/home/frs/project/api-doc'
read -p "Qual é a versão?, ex.: x.y.z: " version
pathNewFile="${pathDistElectron}${prefixLinux}${version}${formatLinux}"
pathOldFile="${pathDistElectron}${prefixLinux}2.1.5${formatLinux}"

sudo rm -r view/dist
cd view
yarn build:electron
mv "${pathOldFile}" "${pathNewFile}"
scp "${pathNewFile}" "${SCPserver}"
rm "${pathNewFile}"


# setting a new release defalt linux
queryPut="default=linux"
headers="Accept: application/json"
token="api_key=6e49c195-52fd-4c35-9c29-074b0395ee2c"
url="https://sourceforge.net/projects/api-doc/files/Api%20Doc-${version}${formatLinux}"

curl -H "${headers}" -X PUT -d "${queryPut}" -d "${token}" "${url}"
