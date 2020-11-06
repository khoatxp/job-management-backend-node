GROUP="cmpt470"
SERVICE="search_service"
PORT_DEFINED_IN_INDEXJS="8080"
LOCALHOST_PORT="8084"
PROJECT_ID="glossy-cipher-294401"

build() {
    echo "Building Project..."
    docker build -t $GROUP/$SERVICE .

    # localhost:8084 when accessing locally
    docker run -p $LOCALHOST_PORT:$PORT_DEFINED_IN_INDEXJS -d $GROUP/$SERVICE
}

deploy() {
    echo "Deploying Project..."
    gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE
    gcloud run deploy --image gcr.io/$PROJECT_ID/$SERVICE --platform managed
}

kill() {
    echo "Turning off local container..."
    CONTAINER_ID=$(docker ps | grep 'cmpt470/user_service' | awk '{ print $1 }')
    docker kill $CONTAINER_ID
    echo "Killed..."
}
TYPE=$1
if [ $TYPE = "--build/run" ]
then
    build
elif [ $TYPE = "--deploy" ]
then
    deploy
elif [ $TYPE = "--kill" ]
then
    kill
fi