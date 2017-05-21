sed 's:^export SCALA_HOME=".*$:export SCALA_HOME="/usr/share/java":' -i'' bin/exports.sh
sed 's:^export SCALA_LIBRARY_JAR=".*$:export SCALA_LIBRARY_JAR="$SCALA_HOME/scala-library.jar":' -i'' bin/exports.sh
sed 's:^export JAVA_HOME=".*$:export JAVA_HOME="/usr/share/java":' -i'' bin/exports.sh
./bin/build.sh

