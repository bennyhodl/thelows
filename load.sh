#!/bin/bash

# Check for correct number of arguments
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 URL NUM_REQUESTS 'ENDPOINT1,ENDPOINT2,...'"
    exit 1
fi

URL=$1
NUM_REQUESTS=$2
IFS=',' read -r -a ENDPOINTS <<< "$3"

SUCCESS_COUNT=0
ERROR_COUNT=0

echo "Starting API load testing..."

for (( i=0; i<$NUM_REQUESTS; i++ ))
do
    # Choose a random endpoint from the list
    RANDOM_INDEX=$[$RANDOM % ${#ENDPOINTS[@]}]
    RANDOM_ENDPOINT=${ENDPOINTS[$RANDOM_INDEX]}

    if [[ "$RANDOM_ENDPOINT" == "share" ]]; then
        # Use share.json for share endpoint
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -H "Content-Type: application/json" -X POST -d @share.json "${URL}/${RANDOM_ENDPOINT}")
        echo "POST Request to ${URL}/${RANDOM_ENDPOINT} with share.json: $RESPONSE"
    elif [[ "$RANDOM_ENDPOINT" == "submit-list" ]]; then
        # Use submit.json for submit-list endpoint
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -H "Content-Type: application/json" -X POST -d @submit.json "${URL}/${RANDOM_ENDPOINT}")
        echo "POST Request to ${URL}/${RANDOM_ENDPOINT} with submit.json: $RESPONSE"
    else
        # Make a generic GET request for other endpoints
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "${URL}/${RANDOM_ENDPOINT}")
        echo "GET Request to ${URL}/${RANDOM_ENDPOINT}: $RESPONSE"
    fi

    # Random sleep between 1-3 seconds
    SLEEP_TIME=$[$RANDOM % 3 + 1]
    sleep $SLEEP_TIME

    # Count the response codes
    if [[ "$RESPONSE" == "200" || "$RESPONSE" == "202" ]]; then
        SUCCESS_COUNT=$((SUCCESS_COUNT+1))
    elif [ "$RESPONSE" == "500" ]; then
        ERROR_COUNT=$((ERROR_COUNT+1))
    fi
done

echo "Testing complete. Success: $SUCCESS_COUNT, Errors: $ERROR_COUNT"

