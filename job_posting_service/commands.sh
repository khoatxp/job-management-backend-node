GROUP="cmpt470"
SERVICE="job_posting_service"
PORT_DEFINED_IN_INDEXJS="8085"
LOCALHOST_PORT="8085"
PROJECT_ID="cmpt-470-project-production"

build() {
    echo "Building Project..."
    docker build -t $GROUP/$SERVICE .

    # localhost:8085 when accessing locally
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