
prefixLinux="ApiDoc"
formatApk=".apk"
pathDistAndroidApk="view/dist/cordova/android/apk/release/"
SCPserver='joaomede@frs.sourceforge.net:/home/frs/project/api-doc'
read -p "Qual é a versão?, ex.: x.y.z: " version
pathNewFile="${pathDistAndroidApk}${prefixLinux}-${version}${formatApk}"
pathOldFile="${pathDistAndroidApk}${prefixLinux}${formatApk}"

cp "${pathOldFile}" "${pathNewFile}"
scp "${pathNewFile}" "${SCPserver}"

queryPut="default=android"
headers="Accept: application/json"
token="api_key="
url="https://sourceforge.net/projects/api-doc/files/ApiDoc-${version}${formatApk}"

curl -H "${headers}" -X PUT -d "${queryPut}" -d "${token}" "${url}"
