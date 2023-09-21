async function handleRequest(DynamoDB, dynamoDbDocClient, IOT, payload) {

    try {
        var clientList = await queryTableForAllItems(dynamoDbDocClient, 'TOILETS_CLIENT_DATA_TABLE_CLIENTWISE', 'GSCDCL');
        console.log('upiProfile.length', clientList.length);
        for (let index = 0; index < clientList.length; index++) {
            const element = clientList[index];
            console.log('element', element)

            // await updateItem(DynamoDB, 'TOILETS_CLIENT_DATA_TABLE_CLIENTWISE', 'GSCDCL', clientList);
        }
        return "cabinList";
    } catch (error) {
        console.error('Error in lambda function:', error);
        throw error;
    }
}

async function queryTableForAllItems(dynamoDbDocClient, table, CLIENT) {
    var queryParams = {
        TableName: table,
        KeyConditionExpression: "CLIENT = :CLIENT",
        ExpressionAttributeValues: { ":CLIENT": CLIENT },
        ScanIndexForward: false
    };


    var lastEvaluatedKey = null;
    var pageCount = 1;
    let itemList = [];

    do {
        try {
            queryParams.ExclusiveStartKey = lastEvaluatedKey;
            let promise = dynamoDbDocClient.query(queryParams).promise();
            let result = await promise;
            lastEvaluatedKey = result.LastEvaluatedKey;

            result.Items.forEach(function (item) {
                itemList.push(item);
            });


        } catch (error) {
            console.log("_query", error);
        }

        pageCount++;

    } while (lastEvaluatedKey)

    return itemList;
}

async function updateItem(dynamoDb, table, thingName, dateIndex) {
    const params = {
        TableName: table,
        Key: {
            'THING_NAME': { S: thingName },
            'DATE_INDEX': { N: '' + dateIndex }
        },
        UpdateExpression: 'SET usageCount = :newusageCount',
        ExpressionAttributeValues: {
            ':newusageCount': { S: getRandomUsageCount().toString() },
        },
        ReturnValues: 'ALL_NEW'
    };
    console.log(' params-:👉', params)

    dynamoDb.updateItem(params, (err, data) => {
        if (err) {
            console.log('Error', err);
        } else {
            console.log('Success', data);
        }
    });
}

function getRandomUsageCount() {
    const randomNumber = Math.random();
    return Math.floor(randomNumber * 11) + 5; // Generate numbers between 5 and 15
}

module.exports = {
    handleRequest
};