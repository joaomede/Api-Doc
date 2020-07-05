
pathToDist=view/dist/cordova/android/apk/release/app-release-unsigned.apk
pathToKey=view/apidockey.keystore
pathToFinalApk=view/dist/cordova/android/apk/release/ApiDoc.apk
PathDoZipaLign=/home/joao/Android/Sdk/build-tools/29.0.3/zipalign

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $pathToKey $pathToDist apidockey
$PathDoZipaLign -v 4 $pathToDist $pathToFinalApk